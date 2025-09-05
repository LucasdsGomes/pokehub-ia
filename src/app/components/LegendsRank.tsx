"use client";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface LegendaryPoke {
  name: string;
  is_legendary: boolean;
  is_mythical: boolean;
  base_stat: number;
}

// Neste código foi utilizado batchSize que consiste basicamente no sobrecarregamento de informações vindas da API
// Neste contexto, mais de 1000 pokémons seriam recebidos da API e retornados na interface, porém optei por exemplo na web que tratassem desses erros e não tratasse de um overload.

export default function LegendsRank() {
  const [legend, setLegend] = useState<LegendaryPoke[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const allSpecies = 1025;

  useEffect(() => {
    const fetchLegends = async () => {
      try {
        setLoading(true);
        const results: LegendaryPoke[] = [];

        const batchSize = 50;
        for (let start = 1; start <= allSpecies; start += batchSize) {
          const promises = Array.from({ length: batchSize }, async (_, j) => {
            const id = start + j;
            if (id > allSpecies) return null;

            const resSpecies = await fetch(
              `https://pokeapi.co/api/v2/pokemon-species/${id}/`
            );
            if (!resSpecies.ok) return null;

            if (
              !resSpecies.headers
                .get("content-type")
                ?.includes("application/json")
            ) {
              console.warn(
                "Resposta species não-JSON",
                await resSpecies.text()
              );
              return null;
            }
            const speciesData = await resSpecies.json();

            if (speciesData.is_legendary || speciesData.is_mythical) {
              const resPokemon = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${id}/`
              );
              if (!resPokemon.ok) return null;

              if (
                !resPokemon.headers
                  .get("content-type")
                  ?.includes("application/json")
              ) {
                console.warn(
                  "Resposta pokemon não-JSON",
                  await resPokemon.text()
                );
                return null;
              }
              const pokemonData = await resPokemon.json();

              const totalStats = pokemonData.stats.reduce(
                (sum: number, s: any) => sum + s.base_stat,
                0
              );

              return {
                name: speciesData.name,
                is_legendary: speciesData.is_legendary,
                is_mythical: speciesData.is_mythical,
                base_stat: totalStats,
              };
            }
            return null;
          });

          const batchResults = await Promise.all(promises);
          results.push(
            ...batchResults.filter((r): r is LegendaryPoke => r !== null)
          );
        }

        setLegend(
          results.sort((a, b) => b.base_stat - a.base_stat).slice(0, 5)
        );
      } catch (err) {
        console.error(err);
        setError("Falha ao verificar ou receber status da API");
      } finally {
        setLoading(false);
      }
    };

    fetchLegends();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-3">
      {legend.map((poke, index) => (
        <div
          key={index}
          className="group p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800 capitalize">
                #{index + 1} {poke.name}
              </p>
              <p className="text-sm text-gray-600">
                Total Stats: {poke.base_stat}
              </p>
            </div>
            <div className="text-right">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 5
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
