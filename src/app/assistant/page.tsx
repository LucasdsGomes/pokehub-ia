"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AssistantSearch from "../components/AssistantSearch";

export default function Assistant() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

      <header className="relative pt-12 pb-8">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mx-12 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Voltar
        </button>
        <div className="container mx-auto px-6 text-center">
          <div className="group cursor-pointer inline-block mb-2">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 via-white to-red-500 rounded-full shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 border-4 border-white/20">
              <div className="w-15 h-15 rounded-full relative border-4 border-gray-900 overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-500 to-red-700" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-100 to-white" />
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-3 bg-gray-900 shadow-lg" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-gradient-to-br from-white to-gray-100 rounded-full border-4 border-gray-900 shadow-lg">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-inner animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
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
                ASSISTENTE INTELIGENTE
              </h2>
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 relative z-10 flex items-center justify-center">
        <AssistantSearch />
      </main>
    </div>
  );
}
