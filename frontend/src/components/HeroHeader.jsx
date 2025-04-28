import React from 'react';

const HeroHeader = () => {
  return (
    <header className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B192C] to-[#000000] text-white text-center px-5">
      <div className="absolute w-full h-full flex items-center justify-center">
        <img 
          src="/logo.png" 
          alt="FlickPick Logo" 
          className="opacity-15 w-screen h-auto object-contain"
        />
      </div>
      
      <div className="relative z-10 max-w-[800px]">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 drop-shadow-lg">
          Welcome to FlickPick
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 tracking-wider">
          Your ultimate movie discovery platform
        </p>
        <button className="bg-[#FF6500] text-white py-4 px-10 rounded-full text-lg font-semibold uppercase tracking-wider transition-all hover:bg-[#ffb583] hover:-translate-y-1 hover:shadow-lg">
          Explore Movies
        </button>
      </div>
    </header>
  );
};

export default HeroHeader;