"use client";
import React, { useState, useEffect } from "react";
import { Star, Zap, BarChart3, Gamepad2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUserEmail(storedUser);
    }
  }, [router]);

  const leftAccount = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-x-hidden">

      {userEmail && (
        <div className="absolute top-4 right-4 bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-sm shadow-md text-sm flex flex-col md:flex-row items-center gap-2 z-20">
          <span>Bem-vindo(a), {userEmail}!</span>
          <button
            type="button"
            onClick={leftAccount}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs md:text-sm px-3 py-1 md:px-4 md:py-2"
          >
            Sair
          </button>
        </div>
      )}

      <div
        className="absolute pointer-events-none opacity-20 w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-radial from-white to-transparent"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
          transition: "all 0.3s ease-out",
        }}
      />

      {/* Header */}
      <header className="relative z-10 pt-8 pb-6 md:pb-8 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="inline-flex items-center justify-center w-24 md:w-32 h-24 md:h-32 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full mb-4 md:mb-6 shadow-2xl animate-spin-slow">
            <div className="w-20 md:w-28 h-20 md:h-28 rounded-full relative border-4 border-gray-900 overflow-hidden shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-500 to-red-700" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-gray-200" />
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-3 bg-gray-900 shadow-md" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 md:w-10 h-8 md:h-10 bg-white rounded-full border-4 border-gray-900 shadow-lg">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 md:w-4 h-3 md:h-4 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full shadow-inner" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-2 md:mb-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-mono">
              PokéHub
            </span>
          </h1>

          <p className="text-md sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-12 animate-fade-in-up-delay font-mono">
            Seu portal definitivo para o universo Pokémon
          </p>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 md:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {menuOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.title}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: option.delay }}
                onClick={() => router.push(option.path)}
              >
                <div
                  className={`
                    relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20
                    transform transition-all duration-500 hover:scale-105 hover:-translate-y-2
                    shadow-2xl hover:shadow-3xl cursor-pointer ${option.hoverColor}
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
                      inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl mb-4 sm:mb-6
                      bg-gradient-to-r ${option.color} shadow-lg
                      group-hover:rotate-12 transition-transform duration-500
                    `}
                  >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                    {option.title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {option.description}
                  </p>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                    <Zap className="w-4 sm:w-6 h-4 sm:h-6 text-yellow-400" />
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
