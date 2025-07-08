import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const imageUrl = 'https://cdn.jsdelivr.net/gh/JosephDavid2/cidadela-da-pedra-solar@main/capa%20do%20livro.png';

  return (
    <div className="bg-gray-900 min-h-screen bg-cover bg-center text-gray-200 flex items-center justify-center p-4" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-felt.png')" }}>
      <div className="container mx-auto max-w-2xl text-center">
        <div className="bg-gray-800/80 p-6 md:p-10 rounded-lg shadow-lg backdrop-blur-sm border border-gray-600">
          <header className="mb-6">
            <h1 className="text-4xl md:text-5xl font-title text-gray-100">A Cidadela da Pedra Solar</h1>
          </header>
          <main className="flex flex-col items-center">
            <img 
              src={imageUrl} 
              alt="Capa de A Cidadela da Pedra Solar" 
              className="rounded-lg shadow-md mx-auto border-4 border-gray-600 max-h-[60vh] mb-8" 
            />
            <button
              onClick={onStart}
              className="bg-amber-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-900 transition-colors duration-200 shadow-xl text-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
            >
              Iniciar a Aventura
            </button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
