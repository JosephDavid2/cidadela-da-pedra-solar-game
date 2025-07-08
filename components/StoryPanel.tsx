import React, { useState, useEffect, useRef } from 'react';
import { StorySection, GameState, Choice, Player } from '../types.ts';

interface StoryPanelProps {
  section: StorySection;
  gameState: GameState;
  onChoice: (choice: Choice) => void;
  onCombatAction: () => void;
  gameLog: string[];
  logRef: React.RefObject<HTMLDivElement>;
  onRestart: () => void;
  player: Player;
}

const PlayIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PauseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StoryPanel: React.FC<StoryPanelProps> = ({ section, gameState, onChoice, onCombatAction, gameLog, logRef, onRestart, player }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef(false); // Track if user manually paused in the current section.

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
    setIsPlaying(false);
    setIsAudioReady(false);
    userPausedRef.current = false; // Reset pause state on new section
    setIsImageZoomed(false); // Reset zoom on section change
  }, [section]);

  const toggleNarration = () => {
    const audioElement = audioRef.current;
    if (!audioElement || !section.audioUrl || !isAudioReady) return;

    if (isPlaying) {
        audioElement.pause();
        userPausedRef.current = true; // User manually paused
    } else {
        audioElement.play().catch(e => {
            console.error("Erro ao tocar áudio:", e);
            setIsPlaying(false); // Garante que o estado seja revertido em caso de falha.
        });
        userPausedRef.current = false; // User manually (re)started play
    }
  };

  const handleCanPlay = () => {
    setIsAudioReady(true);
    const audioElement = audioRef.current;
    // Autoplay logic
    if (audioElement && section.audioUrl && !userPausedRef.current) {
        audioElement.play().catch(e => {
            console.error("Autoplay failed:", e);
            // If autoplay fails, we just don't play. User can still click the play button.
            setIsPlaying(false);
        });
    }
  };

  const getFinalMessage = () => {
    switch(gameState) {
      case 'game_over':
        return <h3 className="text-2xl font-bold text-red-500 text-center">FIM DE JOGO</h3>;
      case 'victory':
        return <h3 className="text-2xl font-bold text-green-500 text-center">VITÓRIA!</h3>;
      case 'partial_victory':
        return <h3 className="text-2xl font-bold text-yellow-500 text-center">SUCESSO PARCIAL</h3>
      default:
        return <h3 className="text-xl font-title text-gray-200 mb-3">O que você faz?</h3>;
    }
  }

  const isChoiceDisabled = (choice: Choice): boolean => {
    if (choice.disabled) return true;
    if (choice.requiresItem && !player.inventory.some(item => item.id === choice.requiresItem)) return true;
    if (choice.requiresNoItem && player.inventory.some(item => item.id === choice.requiresNoItem)) return true;
    if (choice.disabledIfVisited && player.visitedSections.includes(choice.disabledIfVisited)) return true;
    return false;
  };

  return (
    <>
      <div className="bg-gray-800/70 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700 h-full flex flex-col">
        <audio
          ref={audioRef}
          src={section.audioUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onCanPlay={handleCanPlay}
          preload="auto"
        />
        {/* Header - Stays fixed at the top */}
        <div className="flex items-center justify-between border-b border-gray-600 pb-2 mb-4 flex-shrink-0">
          <h2 className="text-2xl font-title text-gray-200">A História Até Agora</h2>
          <button
              onClick={toggleNarration}
              disabled={!section.audioUrl || !isAudioReady}
              className="text-amber-400 hover:text-amber-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full disabled:text-gray-500 disabled:cursor-not-allowed"
              aria-label={isPlaying ? "Pausar narração" : "Ouvir narração"}
              title={!section.audioUrl ? "Narração indisponível" : !isAudioReady ? "Carregando narração..." : isPlaying ? "Pausar narração" : "Ouvir narração"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {section.imageUrl && (
            <div className="my-4">
              <img 
                src={section.imageUrl} 
                alt="Ilustração da cena" 
                className="rounded-lg shadow-md mx-auto border-4 border-gray-600 max-h-80 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                onClick={() => setIsImageZoomed(true)}
              />
            </div>
          )}
          <p className="text-lg leading-relaxed whitespace-pre-wrap mb-4">{section.text}</p>
          
          {/* Action Area (Log and Choices) */}
          <div className="pt-4">
            <div className="bg-gray-900/80 p-4 rounded-md border border-gray-700 mb-4 h-48 overflow-y-auto" ref={logRef}>
              <h3 className="font-bold font-title text-gray-300 mb-2">Diário de Aventura</h3>
              {gameLog.map((entry, index) => (
                <p key={index} className="text-sm text-gray-400">&gt; {entry}</p>
              ))}
            </div>

            <div>
              {getFinalMessage()}
              <div className="flex flex-col space-y-3 mt-3">
                {gameState === 'reading' && section.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => onChoice(choice)}
                    disabled={isChoiceDisabled(choice)}
                    className="w-full text-left bg-amber-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-inner"
                  >
                    {choice.text}
                  </button>
                ))}
                {gameState === 'fighting' && (
                  <button
                    onClick={onCombatAction}
                    className="w-full bg-red-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-800 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                  >
                    Atacar!
                  </button>
                )}
                {(gameState === 'game_over' || gameState === 'victory' || gameState === 'partial_victory') && (
                  <button
                    onClick={onRestart}
                    className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Jogar Novamente
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isImageZoomed && section.imageUrl && (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-pointer"
            onClick={() => setIsImageZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Imagem ampliada"
        >
            <img
                src={section.imageUrl}
                alt="Ilustração da cena ampliada"
                className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
            />
        </div>
      )}
    </>
  );
};

export default StoryPanel;
