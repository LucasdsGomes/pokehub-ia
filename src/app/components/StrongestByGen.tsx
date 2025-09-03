"use client";
import { useEffect, useState } from "react";

interface PokemonSpecies {
  name: string;
  url: string;
}

interface GenerationResponse {
  pokemon_species: PokemonSpecies[];
}

export default function StrongestByGen() {
  const [pokemonList, setPokemonList] = useState<PokemonSpecies[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resStrongPoke = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://pokeapi.co/api/v2/generation/1/");
        if (!response.ok) throw new Error("Erro na resposta da API");

        const data: GenerationResponse = await response.json();
        setPokemonList(data.pokemon_species);
      } catch (err) {
        console.error(err);
        setError("Falha ao verificar ou receber status da API");
      } finally {
        setLoading(false);
      }
    };

    resStrongPoke();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Pokémons da Geração 1</h2>
      <ul className="list-disc pl-5 space-y-1">
        {pokemonList.slice(0, 10).map((poke) => (
          <li key={poke.name} className="capitalize">
            {poke.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
