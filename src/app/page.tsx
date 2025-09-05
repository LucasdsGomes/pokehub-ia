"use client";
import { Star, BarChart3, Gamepad2 } from "lucide-react";
import MenuOptionCard from "./components/MenuOptionCard"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const menuOptions = [
    {
      title: "Assistente",
      description: "Seu companheiro Pokémon inteligente",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
      hoverColor: "hover:from-yellow-300 hover:to-orange-400",
      bgAccent: "bg-yellow-100",
      delay: "0ms",
      path: "/assistant"
    },
    {
      title: "Dashboard",
      description: "Estatísticas e análises avançadas gerais",
      icon: BarChart3,
      color: "from-blue-500 to-purple-600",
      hoverColor: "hover:from-blue-400 hover:to-purple-500",
      bgAccent: "bg-blue-100",
      delay: "150ms",
      path: "/dashboard"
    },
    {
      title: "Jogo",
      description: "Aventure-se no mundo Pokémon Guesser",
      icon: Gamepad2,
      color: "from-green-400 to-emerald-600",
      hoverColor: "hover:from-green-300 hover:to-emerald-500",
      bgAccent: "bg-green-100",
      delay: "300ms",
      path: "/game"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      <div className="absolute inset-0">
      </div>

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
          {menuOptions.map((option) => (
            <div
              key={option.title}
              onClick={() => router.push(option.path)}
              className="cursor-pointer"
            >
              <MenuOptionCard {...option} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
