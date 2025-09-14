"use client";
import { useState, useEffect } from "react";
import { TrendingUp, Trophy, BarChart3, Star, Zap, Shield } from "lucide-react";
import StrongestByGen from "../components/StrongestByGen";
import LegendsRank from "../components/LegendsRank";
import StatsByType from "../components/StatsByType";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

   useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) {
      router.push("/login");
    } else {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [router]);

  const cardData = [
    {
      title: "Ranking de Lendários",
      icon: Trophy,
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      description: "Lendários mais poderosos"
    },
    {
      title: "Mais Fortes por Geração",
      icon: TrendingUp,
      color: "from-blue-400 to-purple-500",
      bgColor: "from-blue-50 to-purple-50",
      description: "Os campeões de cada geração"
    },
    {
      title: "Média de Stats por Tipo",
      icon: BarChart3,
      color: "from-green-400 to-teal-500",
      bgColor: "from-green-50 to-teal-50",
      description: "Análise estatística por tipos"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full mb-8 shadow-2xl animate-spin mx-auto">
            <div className="w-20 h-20 rounded-full relative border-4 border-gray-900 overflow-hidden shadow-lg m-2">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-500 to-red-700" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-gray-200" />
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-3 bg-gray-900 shadow-md" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-gray-900 shadow-lg">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full shadow-inner" />
              </div>
            </div>
          </div>
          <p className="text-white text-xl font-mono">Carregando PokéHub...</p>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <header className="relative z-10 pt-12 pb-8">
        <button type="button" onClick={() => router.push("/")} className="mx-12 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Voltar</button>
        <div className="container mx-auto px-6 text-center">
          <div className="group cursor-pointer inline-block mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 via-white to-red-500 rounded-full shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 border-4 border-white/20">
              <div className="w-20 h-20 rounded-full relative border-4 border-gray-900 overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-500 to-red-700" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-100 to-white" />
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-3 bg-gray-900 shadow-lg" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-gradient-to-br from-white to-gray-100 rounded-full border-4 border-gray-900 shadow-lg">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-inner animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold animate-fade-in-up">
              <span className="bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500 bg-clip-text text-transparent font-black tracking-wider drop-shadow-lg">
                PokéHub
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 animate-fade-in-up font-light tracking-wide">
              Seu portal definitivo para o universo Pokémon
            </p>

            <div className="inline-block">
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-mono tracking-widest animate-pulse">
                DASHBOARD
              </h2>
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${card.color} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt`}></div>
              
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 transition-all duration-300 group-hover:scale-105 border border-white/20">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-6 group-hover:text-gray-700 transition-colors">
                    {card.description}
                  </p>

                  <div className="min-h-[200px]">
                    {index === 0 && <LegendsRank />}
                    
                    {index === 1 && <StrongestByGen />}
                    
                    {index === 2 && <StatsByType />}
                      
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats rápidas */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Total Pokémon", value: "1010+", icon: Star },
            { label: "Gerações", value: "9", icon: TrendingUp },
            { label: "Tipos", value: "18", icon: Shield },
            { label: "Lendários", value: "70+", icon: Zap }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-yellow-400 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}