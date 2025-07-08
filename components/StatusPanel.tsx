import React from 'react';
import { Player, DiceRoll, Enemy, GameState } from '../types.ts';
import { ENEMIES } from '../constants.ts';

interface StatusPanelProps {
  player: Player;
  lastRoll: DiceRoll;
  currentEnemy: Enemy | null;
  onEatProvision: () => void;
  onUseLuckPotion: () => void;
  gameState: GameState;
}

const StatBar: React.FC<{ value: number; maxValue: number; label: string; color: string }> = ({ value, maxValue, label, color }) => {
    const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
    return (
        <div>
            <div className="flex justify-between items-center mb-1 text-gray-300">
                <span className="font-bold">{label}</span>
                <span className="text-sm font-semibold">{value} / {maxValue}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 border border-gray-600">
                <div className={`${color} h-4 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

const Dice: React.FC<{ value: number | string }> = ({ value }) => (
  <div className="w-16 h-16 bg-gray-200 rounded-lg shadow-inner flex items-center justify-center text-3xl font-bold text-stone-800 border-2 border-gray-400">
    {value}
  </div>
);

const StatusPanel: React.FC<StatusPanelProps> = ({ player, lastRoll, currentEnemy, onEatProvision, onUseLuckPotion, gameState }) => {
  const initialEnemyStats = currentEnemy ? ENEMIES[currentEnemy.id] : null;
  const isGameFinished = gameState === 'game_over' || gameState === 'victory' || gameState === 'partial_victory';

  const luckPotion = player.inventory.find(item => item.id === 'pocao_sorte');
  const otherItems = player.inventory.filter(item => item.id !== 'pocao_sorte');

  const getEatButtonTitle = () => {
    if (isGameFinished) return 'O jogo terminou';
    if (gameState === 'fighting') return 'Não pode ser usado em combate';
    if (player.provisions <= 0) return 'Sem provisões';
    if (player.energy >= player.initialEnergy) return 'Energia já está no máximo';
    return 'Comer Provisão (Restaura 4 ENERGIA)';
  };

  const getLuckPotionButtonTitle = () => {
    if (isGameFinished) return 'O jogo terminou';
    if (player.luck >= player.initialLuck) return 'Sorte já está no máximo';
    return 'Restaurar SORTE ao valor inicial';
  }


  return (
    <div className="bg-gray-800/70 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700 space-y-6">
      <div>
        <h2 className="text-2xl font-title text-gray-200 border-b border-gray-600 pb-2 mb-4">Ficha do Aventureiro</h2>
        <div className="space-y-4">
            <StatBar value={player.skill} maxValue={player.initialSkill} label="HABILIDADE" color="bg-blue-500" />
            <StatBar value={player.energy} maxValue={player.initialEnergy} label="ENERGIA" color="bg-red-500" />
            <StatBar value={player.luck} maxValue={player.initialLuck} label="SORTE" color="bg-yellow-500" />
        </div>
      </div>
      
      {currentEnemy && initialEnemyStats && (
         <div>
            <h3 className="text-xl font-title text-gray-200 border-b border-gray-600 pb-2 mb-3">Oponente Atual</h3>
            <div className="bg-gray-900/80 p-4 rounded-md border border-gray-700 space-y-3">
               <h4 className="text-lg font-bold text-center text-red-400">{currentEnemy.name}</h4>
               <div className="flex justify-between items-center px-1">
                  <span className="font-bold text-gray-300">HABILIDADE:</span>
                  <span className="text-xl font-bold">{currentEnemy.skill}</span>
               </div>
               <StatBar value={currentEnemy.energy} maxValue={initialEnemyStats.energy} label="ENERGIA" color="bg-green-500" />
            </div>
          </div>
      )}

      <div>
        <h3 className="text-xl font-title text-gray-200 border-b border-gray-600 pb-2 mb-3">Inventário</h3>
        <div className="bg-gray-900/80 p-3 rounded-md min-h-[80px] border border-gray-700">
            {(player.provisions > 0 || luckPotion) && (
              <div className="space-y-2 pb-2 mb-2 border-b border-gray-700">
                {player.provisions > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-semibold">Provisões ({player.provisions})</span>
                    <button
                      onClick={onEatProvision}
                      disabled={isGameFinished || gameState === 'fighting' || player.energy >= player.initialEnergy || player.provisions <= 0}
                      className="text-xs bg-green-600 text-white font-semibold py-1 px-2 rounded hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                      title={getEatButtonTitle()}
                    >
                      Comer
                    </button>
                  </div>
                )}
                 {luckPotion && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-semibold" title={luckPotion.description}>{luckPotion.name}</span>
                      <button
                        onClick={onUseLuckPotion}
                        disabled={isGameFinished || player.luck >= player.initialLuck}
                        className="text-xs bg-yellow-600 text-white font-semibold py-1 px-2 rounded hover:bg-yellow-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                        title={getLuckPotionButtonTitle()}
                      >
                        Usar
                      </button>
                    </div>
                  )}
              </div>
            )}
          {otherItems.length > 0 ? (
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {otherItems.map((item, index) => (
                <li key={`${item.id}-${index}`} title={item.description}>{item.name}</li>
              ))}
            </ul>
          ) : (
            player.provisions <= 0 && !luckPotion && <p className="text-gray-500 italic text-sm">Sua mochila está vazia.</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-title text-gray-200 border-b border-gray-600 pb-2 mb-3">Última Rolagem</h3>
        <div className="flex flex-col items-center space-y-4 pt-2">
            <div className="flex space-x-4">
                <Dice value={lastRoll.die1} />
                <Dice value={lastRoll.die2} />
            </div>
            <p className="font-bold text-lg">Total: {lastRoll.total}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
