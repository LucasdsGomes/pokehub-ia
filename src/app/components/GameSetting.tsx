"use client";
import { useEffect, useState } from "react";

interface NamePokemon {
  name: string;
  sprites: {
    front_default: string;
    [key: string]: any;
  };
  types: any[];
  stats: any[];
}

export default function GameSetting() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameResponse, setNameResponse] = useState<NamePokemon[]>([]);
  const [started, setStarted] = useState(false);
  const [points, setPoints] = useState(0);
  const [errors, setErrors] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const randomPokemon = async () => {
    setLoading(true);
    setError(null);
    setNameResponse([]);
    setName("");
    setRevealed(false);
    try {
      const num = Math.floor(Math.random() * 1025) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
      if (!response.ok) throw new Error("Pokémon não encontrado");
      const data = await response.json();
      setNameResponse([
        {
          name: data.name,
          sprites: data.sprites,
          types: data.types,
          stats: data.stats,
        },
      ]);
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyPokemon = () => {
    if (nameResponse.length === 0) {
      setError("Nenhum Pokémon para verificar");
      return;
    }
    if (name.trim().toLowerCase() === nameResponse[0].name.toLowerCase()) {
      setPoints(points + 1);
      setRevealed(true);
      setName("");
    } else {
      alert("Incorreto!");
      setName("");
      setErrors(errors + 1);
    }
  };

  const getHint = () => {
    const types = nameResponse[0].types.map((t) => t.type.name).join(", ");
    const letterNames = nameResponse[0].name.length;
    const hints = [
      `Dica: Este Pokémon é do(s) tipo(s): ${types}`,
      `Dica: O nome deste Pokémon tem ${letterNames} letras.`,
      `Dica: A primeira letra do nome é "${nameResponse[0].name
        .charAt(0)
        .toUpperCase()}" e a última letra é "${nameResponse[0].name
        .charAt(nameResponse[0].name.length - 1)
        .toUpperCase()}".`,
    ];
    if (nameResponse.length === 0) {
      setError("Nenhum Pokémon para dar dica");
      return;
    }
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    alert(randomHint);
    setName("");
  };

  const startGame = () => {
    setStarted(true);
    randomPokemon();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      {!started ? (
        <main className="container mx-auto px-6 py-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-3 flex justify-center">
              <button
                type="button"
                onClick={startGame}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 
            font-medium rounded-lg text-lg px-8 py-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Começar
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main className="container mx-auto px-6 py-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-3 flex justify-center">
              <div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg 
            rounded-3xl border border-white/20 shadow-2xl p-8 max-w-md w-full transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Quem é este Pokémon?
                  </h3>

                  <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-6 mb-6 border border-blue-400/20 shadow-inner">
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br rounded-xl flex items-center justify-center shadow-2xl border border-yellow-400/30">
                      {nameResponse[0]?.sprites?.front_default ? (
                        <img
                          src={nameResponse[0].sprites.front_default}
                          alt={nameResponse[0].name}
                          className="w-50 h-50 mx-auto"
                          style={{ filter: revealed ? "brightness(1)" : "brightness(0)", }}
                        />
                      ) : (
                        <div className="text-8xl">?</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Digite o nome do Pokémon..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={verifyPokemon}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
                    text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        Verificar
                      </button>
                      <button
                        onClick={getHint}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 
                    text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        Dica
                      </button>
                    </div>

                    <button
                      onClick={randomPokemon}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 
                  text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Próximo Pokémon
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl border border-yellow-400/30">
                    <p className="text-yellow-100 font-semibold">
                      🏆Melhor Pontuação: {points}
                    </p>
                    <p className="text-yellow-200 text-sm mt-1">
                      Acertos: {points} | Erros: {errors}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
