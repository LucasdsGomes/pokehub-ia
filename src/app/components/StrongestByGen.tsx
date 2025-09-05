"use client";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface StrongPoke {
  name: string;
  base_stat: number;
  gen: string;
}

// Neste código foi utilizado batchSize que consiste basicamente no sobrecarregamento de informações vindas da API
// Neste contexto, mais de 1000 pokémons seriam recebidos da API e retornados na interface, porém optei por exemplo na web que tratassem desses erros e não tratasse de um overload.


export default function StrongestByGen() {
  const [strongPoke, setStrongPoke] = useState<StrongPoke[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // intervalos das gerações (National Dex)
  const gens: Record<string, [number, number]> = {
    first: [1, 151],
    second: [152, 251],
    third: [252, 386],
    fourth: [387, 493],
    fifth: [494, 649],
    sixth: [650, 721],
    seventh: [722, 809],
    eighth: [810, 905],
    ninth: [906, 1025],
  };

  // tamanho do lote (quantos fetch em paralelo)
  const batchSize = 25;

  const fetchBatch = async (ids: number[]) => {
    const promises = ids.map(async (id) => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (!res.ok) return null;

        if (!res.headers.get("content-type")?.includes("application/json")) {
          console.warn("Resposta não-JSON", await res.text());
          return null;
        }

        const data = await res.json();
        const totalStats = data.stats.reduce(
          (sum: number, s: any) => sum + s.base_stat,
          0
        );

        return {
          name: data.name,
          base_stat: totalStats,
        };
      } catch {
        return null;
      }
    });

    return (await Promise.all(promises)).filter(
      (p): p is StrongPoke => p !== null
    );
  };

  useEffect(() => {
    const fetchStrongest = async () => {
      try {
        setLoading(true);
        const results: StrongPoke[] = [];

        for (const [genName, [start, end]] of Object.entries(gens)) {
          const pokes: StrongPoke[] = [];

          // roda em lotes
          for (let i = start; i <= end; i += batchSize) {
            const batchIds = Array.from(
              { length: Math.min(batchSize, end - i + 1) },
              (_, j) => i + j
            );
            const batchResults = await fetchBatch(batchIds);
            pokes.push(...batchResults);
          }

          // pega o mais forte da geração
          const topStrongest = pokes.sort(
            (a, b) => b.base_stat - a.base_stat
          )[0];
          if (topStrongest)
            results.push({ ...topStrongest, gen: genName });
        }

        setStrongPoke(results);
      } catch (err) {
        console.error(err);
        setError("Falha ao verificar ou receber status da API");
      } finally {
        setLoading(false);
      }
    };

    fetchStrongest();
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
      {strongPoke.map((poke, index) => (
        <div
          key={index}
          className="group p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800 capitalize">
                {index+1} - Gen {poke.gen} – {poke.name}
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
                      i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
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
