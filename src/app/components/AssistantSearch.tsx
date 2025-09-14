"use client";
import { useState } from "react";

interface NamePokemon {
  name: string;
  sprites: {
    front_default: string;
    [key: string]: any;
  };
  types: any[];
  stats: any[];
}

export default function AssistantSearch() {
  const [nameResponse, setNameResponse] = useState<NamePokemon[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const typeColors: Record<string, string> = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400",
    psychic: "bg-pink-500",
    ice: "bg-cyan-300",
    dragon: "bg-purple-600",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
  };
  let num = Math.floor(Math.random() * 1025) + 1;

  const randomPokemon = async () => {
    setLoading(true);
    setError(null);
    setNameResponse([]);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${num}`
      );
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
  }

  const fetchName = async () => {
    setLoading(true);
    setError(null);
    setNameResponse([]);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
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

  return (
    <div className="w-full max-w-md text-center mx-auto mt-12">
      <label className="block mb-3 text-left text-base md:text-lg font-bold text-gray-900 dark:text-white">
        Insira o nome do Pokémon ou o seu Nº da Pokedex 
      </label>
      <div className="flex">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Bulbasaur"
        />
        <button
          type="button"
          onClick={fetchName}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mx-3 px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        >
          Buscar
        </button>
        <button
          type="button"
          onClick={randomPokemon}
          className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
        >
          Pokémon Aleatório
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-200">Carregando...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {nameResponse.length > 0 && (
        <div className="flex justify-center mt-6">
          {nameResponse.map((poke) => (
            <div
              key={poke.name}
              className="flex flex-col items-center w-full max-w-sm p-6 rounded-xl shadow-xl transition-transform transform hover:scale-105 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700"
            >
              <img
                src={poke.sprites.front_default || "/pokeball.png"}
                alt={poke.name}
                className="w-32 h-32 mb-4"
              />

              <h3 className="text-2xl font-bold capitalize text-gray-900 dark:text-white mb-2">
                {poke.name}
              </h3>

              <div className="flex space-x-2 mb-4">
                {poke.types.map((t: any) => (
                  <span
                    key={t.type.name}
                    className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                      typeColors[t.type.name] || "bg-gray-400"
                    }`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>

              <div className="w-full space-y-2">
                {poke.stats.map((s: any) => (
                  <div key={s.stat.name}>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {s.stat.name}: {s.base_stat}
                    </p>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        style={{ width: `${(s.base_stat / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
