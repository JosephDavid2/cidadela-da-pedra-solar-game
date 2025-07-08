import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Player, DiceRoll, GameState, Choice, CombatState } from './types.ts';
import { STORY, ENEMIES, ITEMS } from './constants.ts';
import StoryPanel from './components/StoryPanel.tsx';
import StatusPanel from './components/StatusPanel.tsx';
import CharacterCreationScreen from './components/RulesScreen.tsx';
import IntroScreen from './components/IntroScreen.tsx';
// import DevNavPanel from './components/DevNavPanel.tsx';

// Icons for mute button
const VolumeUpIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);

const VolumeOffIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2" />
    </svg>
);


function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentSectionId, setCurrentSectionId] = useState<number>(1);
  const [gameState, setGameState] = useState<GameState>('creating');
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [dice, setDice] = useState<DiceRoll>({ die1: 1, die2: 1, total: 2 });
  const [combatState, setCombatState] = useState<CombatState | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const logRef = useRef<HTMLDivElement>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [gameLog]);

  useEffect(() => {
    if (backgroundMusicRef.current) {
        backgroundMusicRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const addLog = useCallback((message: string) => {
    setGameLog(prevLog => [...prevLog, message]);
  }, []);

  const roll1d6 = () => Math.floor(Math.random() * 6) + 1;

  const roll2d6 = (): DiceRoll => {
    const die1 = roll1d6();
    const die2 = roll1d6();
    const roll = { die1, die2, total: die1 + die2 };
    setDice(roll);
    return roll;
  };
  
  const handleChoice = useCallback((choice: Choice) => {
    if (!player) return;

    const { action } = choice;

    // Item requirement checks
    if (choice.requiresItem && !player.inventory.find(i => i.id === choice.requiresItem)) {
      addLog("Você precisa de um item específico para fazer essa escolha.");
      return;
    }
    if (choice.requiresNoItem && player.inventory.find(i => i.id === choice.requiresNoItem)) {
      addLog("Você não pode fazer essa escolha porque possui um item que a impede.");
      return;
    }

    // Handle item loss on choice
    if (choice.requiresItem && (action.type === 'GOTO' || action.type === 'LOSE_ENERGY')) {
      if (['chifre_ouro_anao', 'gemas_anas'].includes(choice.requiresItem)) {
        setPlayer(p => {
          if(!p) return null;
          addLog(`Você usou: ${ITEMS[choice.requiresItem!].name}.`);
          return {...p, inventory: p.inventory.filter(i => i.id !== choice.requiresItem)};
        })
      }
    }


    switch (action.type) {
      case 'GOTO':
        // Handle soft-lock at section 71 gate
        if (currentSectionId === 71 && action.sectionId === 75) {
            const hasKey = player.inventory.some(i => i.id === 'chave_cristal');
            // If the player tries to search but doesn't have the key, they are stuck.
            if (!hasKey) {
                const newSectionId = 75.1;
                addLog("Você procura uma alternativa, mas percebe que lhe falta o item certo para prosseguir.");
                setCurrentSectionId(newSectionId);
                setPlayer(p => p ? { ...p, visitedSections: [...p.visitedSections, newSectionId] } : null);
                break;
            }
        }
      
        // Special logic for looting goblins in section 5
        if (currentSectionId === 5 && action.sectionId === 6) {
          const foughtGoblins = player.visitedSections.includes(3);
          if (foughtGoblins) {
            // Goblins were fought, proceed to loot
            addLog("Você vasculha os corpos dos goblins derrotados.");
            setCurrentSectionId(action.sectionId);
            setPlayer(p => p ? { ...p, visitedSections: [...p.visitedSections, action.sectionId] } : null);
          } else {
            // Goblins were sneaked past, trigger the fight
            addLog("Você se aproxima da área da fogueira, mas os goblins notam sua presença! Eles atacam!");
            setCurrentSectionId(3); // Go to the start of the fight sequence
            setPlayer(p => p ? { ...p, visitedSections: [...p.visitedSections, 3] } : null);
          }
        } else {
            // Default GOTO behavior
            if (STORY[action.sectionId]) {
              setCurrentSectionId(action.sectionId);
              setPlayer(p => p ? { ...p, visitedSections: [...p.visitedSections, action.sectionId] } : null);
            } else {
              addLog(`Erro: Seção ${action.sectionId} não encontrada.`);
            }
        }
        break;
      
      case 'END_GAME':
        if (action.outcome === 'victory') setGameState('victory');
        else if (action.outcome === 'partial_success') setGameState('partial_victory');
        else setGameState('game_over');
        break;

      case 'TAKE_ITEM': {
        const item = ITEMS[action.itemId];
        if (item) {
            setPlayer(p => {
                if (!p) return null;
                
                const hasItemAlready = p.inventory.some(i => i.id === item.id);
                let newPlayerState = { ...p, inventory: [...p.inventory, item] };
                addLog(`Você obteve: ${item.name}.`);
                
                // Only apply stat bonuses if it's the first time getting the item
                if (!hasItemAlready) {
                    if (item.options?.stat === 'skill') {
                        newPlayerState.skill += item.options.bonus || 0;
                        addLog(`Sua HABILIDADE aumentou em ${item.options.bonus}!`);
                    }
                    if (item.options?.stat === 'attackBonus') {
                        newPlayerState.attackBonus += item.options.bonus || 0;
                        addLog(`Sua Força de Ataque aumentou em ${item.options.bonus}!`);
                    }
                }
                
                if (item.id === 'pedra_amolar') {
                  newPlayerState.tempDamageBonus = 1;
                  addLog('Sua arma está afiada para o próximo combate (+1 de dano).');
                }

                // Handle swapping weapons
                if(item.options?.isWeapon && item.id !== 'espada' && newPlayerState.inventory.some(i => i.id === 'espada')) {
                    newPlayerState.inventory = newPlayerState.inventory.filter(i => i.id !== 'espada');
                    addLog('Você trocou sua espada pela nova arma.');
                }

                return newPlayerState;
            });
        }
        setCurrentSectionId(action.nextSectionId);
        break;
    }

      case 'FIGHT':
        const enemy = { ...ENEMIES[action.enemyId] };
        if (enemy) {
          setGameState('fighting');
          setCombatState({
            enemy,
            winSectionId: action.winSectionId,
            loseSectionId: action.loseSectionId,
          });
          addLog(`Você entrou em combate com ${enemy.name}!`);
        }
        break;
      
      case 'TEST_LUCK':
      case 'TEST_SKILL':
      case 'TEST_INITIAL_SKILL':
        {
          const isLuckTest = action.type === 'TEST_LUCK';
          const isInitialSkillTest = action.type === 'TEST_INITIAL_SKILL';
          const attributeValue = isLuckTest ? player.luck : (isInitialSkillTest ? player.initialSkill : player.skill);
          const attributeName = isLuckTest ? 'SORTE' : 'HABILIDADE';

          addLog(`Você decide testar sua ${attributeName}...`);
          
          if (isLuckTest && attributeValue <= 0) {
              addLog(`Você não tem mais pontos de SORTE! O teste falha automaticamente.`);
              if (player.luck > 0) setPlayer(p => ({ ...p!, luck: 0 }));
              setCurrentSectionId(action.failureSectionId);
              return;
          }

          const roll = roll2d6();
          addLog(`Você rolou ${roll.total}. Seu atributo de ${attributeName} é ${attributeValue}.`);
          if (isLuckTest) {
              setPlayer(p => ({ ...p!, luck: p!.luck - 1 }));
              addLog('Você perde 1 ponto de SORTE.');
          }

          if (roll.total <= attributeValue) {
            addLog(`Você tem ${isLuckTest ? 'Sorte' : 'sucesso'}! O teste foi bem-sucedido.`);
            setCurrentSectionId(action.successSectionId);
          } else {
            addLog(`Você ${isLuckTest ? 'não tem Sorte' : 'falhou'}! O teste falhou.`);
            setCurrentSectionId(action.failureSectionId);
          }
        }
        break;
      
      case 'LOSE_ENERGY': {
        addLog(`Você perdeu ${action.amount} de ENERGIA.`);
        const newEnergy = player.energy - action.amount;
        let newPlayerState = { ...player, energy: newEnergy };

        if (currentSectionId === 33.1) {
            addLog('Você perdeu 1 ponto de SORTE permanentemente.');
            newPlayerState.luck -= 1;
            newPlayerState.initialLuck -= 1;
        }

        if (newEnergy <= 0) {
            newPlayerState.energy = 0;
            setPlayer(newPlayerState);
            setCurrentSectionId(999);
            setGameState('game_over');
        } else {
            setPlayer(newPlayerState);
            setCurrentSectionId(action.nextSectionId);
        }
        break;
      }

      case 'RESTORE_LUCK':
        addLog('Sua SORTE foi completamente restaurada!');
        setPlayer(p => ({ ...p!, luck: p!.initialLuck }));
        setCurrentSectionId(action.nextSectionId);
        break;
    }
  }, [player, addLog, currentSectionId]);


  const resolveCombatRound = useCallback(() => {
    if (!combatState || !player) return;

    let { enemy, winSectionId, loseSectionId } = combatState;
    let newPlayer = { ...player };

    addLog('--- Rodada de Combate ---');

    if(newPlayer.isParalyzed) {
      addLog('Você está paralisado e perde seu ataque!');
      newPlayer.isParalyzed = false;
    } else {
      const playerRoll = roll2d6().total;
      const playerAttack = playerRoll + newPlayer.skill + newPlayer.attackBonus;
      addLog(`Sua força de ataque: ${playerAttack} (Rolagem ${playerRoll} + Hab ${newPlayer.skill} + Bônus ${newPlayer.attackBonus})`);

      const enemyRoll = roll2d6().total;
      const enemyAttack = enemyRoll + enemy.skill;
      addLog(`Força de ataque de ${enemy.name}: ${enemyAttack} (Rolagem ${enemyRoll} + Hab ${enemy.skill})`);

      if (playerAttack > enemyAttack) {
        const damage = 2 + newPlayer.tempDamageBonus;
        const newEnemyEnergy = enemy.energy - damage;
        addLog(`Você atingiu o ${enemy.name}! Ele perde ${damage} de ENERGIA.`);
        if (newPlayer.tempDamageBonus > 0) {
          addLog('O bônus de dano da sua Pedra de Amolar foi usado.');
          newPlayer.tempDamageBonus = 0;
        }
        enemy = { ...enemy, energy: newEnemyEnergy };
        setCombatState({ ...combatState, enemy });
      } else if (enemyAttack > playerAttack) {
        newPlayer.energy -= 2;
        addLog(`O ${enemy.name} atingiu você! Você perde 2 de ENERGIA.`);
        
        if (enemy.special === 'paralyze_on_win') {
          const paralysisRoll = roll1d6();
          addLog(`O ${enemy.name} tenta paralisá-lo... você rolou um ${paralysisRoll}.`);
          if (paralysisRoll <= 2) {
            addLog('Você foi paralisado! Você perderá seu próximo ataque.');
            newPlayer.isParalyzed = true;
          }
        }
      } else {
        addLog('Seus ataques se chocam sem efeito!');
      }
    }
    
    setPlayer(newPlayer);

    if (enemy.energy <= 0) {
      addLog(`Você derrotou o ${enemy.name}!`);
      setGameState('reading');
      setCurrentSectionId(winSectionId);
      setCombatState(null);
      setPlayer(p => p ? {...p, isParalyzed: false} : null);
    } else if (newPlayer.energy <= 0) {
      addLog('Você foi derrotado...');
      setPlayer(p => ({ ...p!, energy: 0 }));
      setGameState('game_over');
      setCurrentSectionId(loseSectionId);
      setCombatState(null);
    }
  }, [combatState, player, addLog]);
  
  const handleEatProvision = useCallback(() => {
    if (!player) return;
    if (gameState === 'fighting') {
        addLog("Você não pode comer durante um combate!");
        return;
    }
    if (player.provisions <= 0) {
        addLog("Você não tem mais provisões.");
        return;
    }
    if (player.energy >= player.initialEnergy) {
        addLog("Sua ENERGIA já está no máximo!");
        return;
    }

    setPlayer(p => {
      if (!p) return null;
      const energyRestored = Math.min(4, p.initialEnergy - p.energy);
      const newEnergy = p.energy + energyRestored;

      addLog(`Você come uma provisão e recupera ${energyRestored} ponto(s) de ENERGIA.`);
      return {
        ...p,
        provisions: p.provisions - 1,
        energy: newEnergy,
      };
    });
  }, [player, gameState, addLog]);

  const handleUseLuckPotion = useCallback(() => {
    if (!player) return;

    const potion = player.inventory.find(i => i.id === 'pocao_sorte');
    if (!potion) {
        addLog("Você não tem uma Poção de Sorte para usar.");
        return;
    }

    if (player.luck >= player.initialLuck) {
        addLog("Sua SORTE já está no máximo. Você guarda a poção.");
        return;
    }

    setPlayer(p => {
        if (!p) return null;
        addLog("Você bebe a Poção de Sorte! Sua SORTE foi restaurada ao valor inicial.");
        return {
            ...p,
            luck: p.initialLuck,
            inventory: p.inventory.filter(i => i.id !== 'pocao_sorte')
        };
    });
  }, [player, addLog]);

  const restartGame = () => {
    setPlayer(null);
    setCurrentSectionId(1);
    setGameState('creating');
    setGameLog([]);
    setCombatState(null);
    if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
    }
  };

  const handleCharacterCreate = (createdPlayer: Player) => {
    setPlayer(createdPlayer);
    setGameState('intro');
  };

  const handleStartAdventure = () => {
    setGameState('reading');
    setGameLog(['Sua aventura começa...']);
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = 0.3;
      backgroundMusicRef.current.play().catch(e => console.error("Erro ao tocar música de fundo:", e));
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  }

  const jumpToSection = useCallback((sectionId: number) => {
    if (STORY[sectionId] && player) {
      addLog(`[DEV] Pulando para a seção ${sectionId}.`);
      setCurrentSectionId(sectionId);
      if (!player.visitedSections.includes(sectionId)) {
        setPlayer(p => p ? { ...p, visitedSections: [...p.visitedSections, sectionId] } : null);
      }
      if (gameState === 'fighting') {
        setGameState('reading');
        setCombatState(null);
        addLog(`[DEV] Saindo do modo de combate.`);
      }
    } else if (!player) {
      addLog(`[DEV] Crie um personagem antes de navegar.`);
    } else {
      addLog(`[DEV] Seção ${sectionId} não encontrada.`);
    }
  }, [player, addLog, gameState]);

  if (gameState === 'creating' || !player) {
    return <CharacterCreationScreen onCharacterCreate={handleCharacterCreate} />;
  }

  if (gameState === 'intro') {
    return <IntroScreen onStart={handleStartAdventure} />;
  }

  const currentSection = STORY[currentSectionId];
  if (!currentSection) {
    return <div>Erro: Seção da história não encontrada! (ID: {currentSectionId})</div>;
  }
  
  return (
    <div className="bg-gray-900 min-h-screen bg-cover bg-center text-gray-200" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-felt.png')" }}>
      <audio ref={backgroundMusicRef} src="https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/Ruins.mp3" loop preload="auto" />
      {/* <DevNavPanel onNavigate={jumpToSection} currentSectionId={currentSectionId} /> */}
      <div className="">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
          <header className="relative text-center mb-8 border-b-4 border-double border-gray-600 pb-4">
            <h1 className="text-4xl md:text-6xl font-title text-gray-100">A Cidadela da Pedra Solar</h1>
            <button 
                onClick={toggleMute}
                className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors"
                aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
                title={isMuted ? 'Ativar som' : 'Desativar som'}
            >
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </button>
          </header>
          <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <StoryPanel
                section={currentSection}
                gameState={gameState}
                onChoice={handleChoice}
                onCombatAction={resolveCombatRound}
                gameLog={gameLog}
                logRef={logRef}
                onRestart={restartGame}
                player={player}
              />
            </div>
            <div className="md:col-span-1">
              <StatusPanel 
                player={player} 
                lastRoll={dice}
                currentEnemy={combatState ? combatState.enemy : null} 
                onEatProvision={handleEatProvision}
                onUseLuckPotion={handleUseLuckPotion}
                gameState={gameState}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
