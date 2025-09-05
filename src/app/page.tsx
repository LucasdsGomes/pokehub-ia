"use client";
import React, { useState, useEffect } from "react";
import { Star, Zap, BarChart3, Gamepad2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPokemon, setCurrentPokemon] = useState(0);

  const menuOptions = [
    {
      title: "Assistente",
      description: "Seu companheiro Pokémon inteligente",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
      hoverColor: "hover:from-yellow-300 hover:to-orange-400",
      bgAccent: "bg-yellow-100",
      delay: "0ms",
      path: "/assistant",
    },
    {
      title: "Dashboard",
      description: "Estatísticas e análises avançadas gerais",
      icon: BarChart3,
      color: "from-blue-500 to-purple-600",
      hoverColor: "hover:from-blue-400 hover:to-purple-500",
      bgAccent: "bg-blue-100",
      delay: "150ms",
      path: "/dashboard",
    },
    {
      title: "Jogo",
      description: "Aventure-se no mundo Pokémon Guesser",
      icon: Gamepad2,
      color: "from-green-400 to-emerald-600",
      hoverColor: "hover:from-green-300 hover:to-emerald-500",
      bgAccent: "bg-green-100",
      delay: "300ms",
      path: "/game",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-b from-red-500 to-white border-2 border-gray-800 opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute pointer-events-none opacity-20 w-96 h-96 rounded-full bg-gradient-radial from-white to-transparent"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
          transition: "all 0.3s ease-out",
        }}
      />

      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full mb-6 shadow-2xl animate-spin-slow">
            <div className="w-28 h-28 rounded-full relative border-4 border-gray-900 overflow-hidden shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-500 to-red-700" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-gray-200" />
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-4 bg-gray-900 shadow-md" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border-4 border-gray-900 shadow-lg">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full shadow-inner" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-mono">
              PokéHub
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 animate-fade-in-up-delay font-mono">
            Seu portal definitivo para o universo Pokémon
          </p>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {menuOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.title}
                className={`group relative animate-fade-in-up`}
                style={{ animationDelay: option.delay }}
                onClick={() => router.push(option.path)}
              >
                <div
                  className={`
                  relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20
                  transform transition-all duration-500 hover:scale-105 hover:-translate-y-2
                  shadow-2xl hover:shadow-3xl cursor-pointer
                  ${option.hoverColor}
                `}
                >
                  <div
                    className={`
                    absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                    bg-gradient-to-r ${option.color} blur-xl -z-10
                    transition-opacity duration-500
                  `}
                  />

                  <div
                    className={`
                    inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6
                    bg-gradient-to-r ${option.color} shadow-lg
                    group-hover:rotate-12 transition-transform duration-500
                  `}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                    {option.title}
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                    {option.description}
                  </p>

                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <Zap className="w-6 h-6 text-yellow-400" />
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${option.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
