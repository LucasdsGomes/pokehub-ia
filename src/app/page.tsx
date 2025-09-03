"use client"
import React, { useState, useEffect } from 'react';
import { Star, Zap, BarChart3, Gamepad2 } from 'lucide-react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPokemon, setCurrentPokemon] = useState(0);

  const pokemonSilhouettes = [
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"
  ];

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPokemon((prev) => (prev + 1) % pokemonSilhouettes.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const menuOptions = [
    {
      title: "Assistente",
      description: "Seu companheiro Pokémon inteligente",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
      hoverColor: "hover:from-yellow-300 hover:to-orange-400",
      bgAccent: "bg-yellow-100",
      delay: "0ms"
    },
    {
      title: "Dashboard",
      description: "Estatísticas e análises avançadas",
      icon: BarChart3,
      color: "from-blue-500 to-purple-600",
      hoverColor: "hover:from-blue-400 hover:to-purple-500",
      bgAccent: "bg-blue-100",
      delay: "150ms"
    },
    {
      title: "Jogo",
      description: "Aventure-se no mundo Pokémon",
      icon: Gamepad2,
      color: "from-green-400 to-emerald-600",
      hoverColor: "hover:from-green-300 hover:to-emerald-500",
      bgAccent: "bg-green-100",
      delay: "300ms"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Floating Pokéballs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-b from-red-500 to-white border-2 border-gray-800 opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Mouse follower effect */}
      <div
        className="absolute pointer-events-none opacity-20 w-96 h-96 rounded-full bg-gradient-radial from-white to-transparent"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease-out'
        }}
      />

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 shadow-2xl animate-spin-slow">
            <div className="w-20 h-20 bg-gradient-to-b from-red-500 to-red-600 rounded-full relative border-4 border-gray-800">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-2 border-gray-800">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-400 rounded-full" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-400 to-red-500 rounded-t-full" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              PokéHub
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 animate-fade-in-up-delay">
            Seu portal definitivo para o universo Pokémon
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 pb-16">
        {/* Menu Options */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {menuOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.title}
                className={`group relative animate-fade-in-up`}
                style={{ animationDelay: option.delay }}
              >
                <div className={`
                  relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20
                  transform transition-all duration-500 hover:scale-105 hover:-translate-y-2
                  shadow-2xl hover:shadow-3xl cursor-pointer
                  ${option.hoverColor}
                `}>
                  {/* Glow effect */}
                  <div className={`
                    absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                    bg-gradient-to-r ${option.color} blur-xl -z-10
                    transition-opacity duration-500
                  `} />
                  
                  {/* Icon */}
                  <div className={`
                    inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6
                    bg-gradient-to-r ${option.color} shadow-lg
                    group-hover:rotate-12 transition-transform duration-500
                  `}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                    {option.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                    {option.description}
                  </p>
                  
                  {/* Hover arrow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <Zap className="w-6 h-6 text-yellow-400" />
                  </div>
                  
                  {/* Bottom accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${option.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated Pokémon silhouette */}
        <div className="fixed bottom-8 right-8 w-32 h-32 opacity-10 animate-bounce-slow">
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full text-white transform rotate-12"
            style={{ animationDelay: '1s' }}
          >
            <path fill="currentColor" d={pokemonSilhouettes[currentPokemon]} />
          </svg>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up 0.8s ease-out 0.3s both;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}