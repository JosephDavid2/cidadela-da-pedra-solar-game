import React, { useState } from 'react';
import { Player } from '../types.ts';

interface CharacterCreationScreenProps {
  onCharacterCreate: (player: Player) => void;
}

const DieIcon: React.FC<{ value: number | string }> = ({ value }) => (
    <div className="w-12 h-12 bg-gray-200 rounded-md shadow-inner flex items-center justify-center text-2xl font-bold text-stone-800 border-2 border-gray-400">
      {value}
    </div>
);

const CharacterCreationScreen: React.FC<CharacterCreationScreenProps> = ({ onCharacterCreate }) => {
    const [skill, setSkill] = useState<number | null>(null);
    const [energy, setEnergy] = useState<number | null>(null);
    const [luck, setLuck] = useState<number | null>(null);

    const [skillRoll, setSkillRoll] = useState(0);
    const [energyRoll, setEnergyRoll] = useState({d1: 0, d2: 0});
    const [luckRoll, setLuckRoll] = useState(0);

    const roll1d6 = () => Math.floor(Math.random() * 6) + 1;

    const handleRollStats = () => {
        if (skill !== null) return; // Impede a rolagem novamente

        const sRoll = roll1d6();
        setSkillRoll(sRoll);
        setSkill(sRoll + 6);

        const eRoll1 = roll1d6();
        const eRoll2 = roll1d6();
        setEnergyRoll({d1: eRoll1, d2: eRoll2});
        setEnergy(eRoll1 + eRoll2 + 12);

        const lRoll = roll1d6();
        setLuckRoll(lRoll);
        setLuck(lRoll + 6);
    };

    const handleStartGame = () => {
        if (skill === null || energy === null || luck === null) return;
        
        const initialPlayer: Player = {
            skill,
            energy,
            luck,
            initialSkill: skill,
            initialEnergy: energy,
            initialLuck: luck,
            inventory: [
                { id: 'espada', name: 'Espada', description: 'Uma lâmina confiável.', options: { isWeapon: true } },
                { id: 'armadura_couro', name: 'Armadura de Couro', description: 'Oferece proteção básica.' },
                { id: 'mochila', name: 'Mochila', description: 'Para carregar seus tesouros.' },
                { id: 'tocha', name: 'Tocha', description: 'Ilumina lugares escuros.' },
            ],
            provisions: 2,
            attackBonus: 0,
            tempDamageBonus: 0,
            visitedSections: [1],
            isParalyzed: false,
        };
        onCharacterCreate(initialPlayer);
    };

    return (
        <div className="bg-gray-900 min-h-screen bg-cover bg-center text-gray-200 flex items-center justify-center p-4" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-felt.png')" }}>
            <div className="container mx-auto max-w-4xl">
                <div className="bg-gray-800/80 p-6 md:p-10 rounded-lg shadow-lg backdrop-blur-sm border border-gray-600">
                    <header className="text-center mb-6 border-b-4 border-double border-gray-500 pb-4">
                        <h1 className="text-4xl md:text-5xl font-title text-gray-100">A Cidadela da Pedra Solar</h1>
                        <p className="text-lg text-gray-300 mt-2">Criação de Personagem</p>
                    </header>

                    <main className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4 text-lg leading-relaxed text-gray-200">
                            <p className="italic text-center">Antes de começar, você precisa determinar suas forças e fraquezas.</p>
                            
                            <div>
                                <h2 className="text-2xl font-title text-amber-400 mb-2">Seus Atributos</h2>
                                <ul className="list-disc list-inside space-y-2 pl-2">
                                    <li><span className="font-bold">HABILIDADE:</span> Jogue um dado e some 6.</li>
                                    <li><span className="font-bold">ENERGIA:</span> Jogue dois dados e some 12.</li>
                                    <li><span className="font-bold">SORTE:</span> Jogue um dado e some 6.</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-title text-amber-400 mb-2">Equipamento Inicial</h2>
                                <ul className="list-disc list-inside space-y-2 pl-2">
                                    <li>Uma Espada</li>
                                    <li>Armadura de Couro</li>
                                    <li>Uma Mochila e uma Tocha</li>
                                    <li>2 Provisões (cada uma restaura 4 de ENERGIA)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gray-700/60 p-6 rounded-lg border border-gray-600 flex flex-col items-center justify-center space-y-6">
                            <h2 className="text-2xl font-title text-gray-200">Seus Atributos</h2>
                            <div className="w-full space-y-3 text-center">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">HABILIDADE:</span> 
                                    <div className="flex items-center gap-2">
                                        <DieIcon value={skillRoll || '?'} /> <span className="text-xl">+ 6 =</span>
                                    </div>
                                    <span className="text-2xl font-bold">{skill ?? '...'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">ENERGIA:</span> 
                                    <div className="flex items-center gap-2">
                                        <DieIcon value={energyRoll.d1 || '?'} />+<DieIcon value={energyRoll.d2 || '?'} /> <span className="text-xl">+ 12 =</span>
                                    </div>
                                    <span className="text-2xl font-bold">{energy ?? '...'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">SORTE:</span> 
                                    <div className="flex items-center gap-2">
                                        <DieIcon value={luckRoll || '?'} /> <span className="text-xl">+ 6 =</span>
                                    </div>
                                    <span className="text-2xl font-bold">{luck ?? '...'}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleRollStats}
                                disabled={skill !== null}
                                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-800 disabled:cursor-not-allowed"
                            >
                                {skill !== null ? 'Atributos Definidos' : 'Rolar Atributos'}
                            </button>
                        </div>
                    </main>

                    <footer className="mt-8 text-center">
                        <button
                            onClick={handleStartGame}
                            disabled={!skill}
                            className="bg-green-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-800 transition-colors duration-200 shadow-xl text-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Começar Aventura
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default CharacterCreationScreen;
