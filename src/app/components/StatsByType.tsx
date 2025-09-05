import { useEffect, useState } from "react";

interface Types {
  name: string;
}

export default function StatsByType() {
  const [type, setType] = useState<Types[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const typeInfo: Record<
  string,
  { pt: string; emoji: string; avg: number }
> = {
  normal:   { pt: "Normal",    emoji: "⚪", avg: 420 },
  fire:     { pt: "Fogo",      emoji: "🔥", avg: 485 },
  water:    { pt: "Água",      emoji: "💧", avg: 475 },
  grass:    { pt: "Planta",    emoji: "🌱", avg: 450 },
  electric: { pt: "Elétrico",  emoji: "⚡", avg: 470 },
  ice:      { pt: "Gelo",      emoji: "❄️", avg: 480 },
  fighting: { pt: "Lutador",   emoji: "🥊", avg: 470 },
  poison:   { pt: "Venenoso",  emoji: "☠️", avg: 440 },
  ground:   { pt: "Terrestre", emoji: "🌍", avg: 470 },
  flying:   { pt: "Voador",    emoji: "🕊️", avg: 455 },
  psychic:  { pt: "Psíquico",  emoji: "🔮", avg: 500 },
  bug:      { pt: "Inseto",    emoji: "🐛", avg: 430 },
  rock:     { pt: "Pedra",     emoji: "🪨", avg: 460 },
  ghost:    { pt: "Fantasma",  emoji: "👻", avg: 480 },
  dragon:   { pt: "Dragão",    emoji: "🐉", avg: 535 },
  dark:     { pt: "Sombrio",   emoji: "🌑", avg: 490 },
  steel:    { pt: "Aço",       emoji: "⚙️", avg: 495 },
  fairy:    { pt: "Fada",      emoji: "✨", avg: 470 },
  shadow:   { pt: "Sombra",    emoji: "⚕️", avg: 500 }, // só existe em spin-offs
  unknown:  { pt: "Desconhecido", emoji: "⁉️", avg: 0 },
};

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        const data = await response.json();
        setType(data.results);        
      } catch (e: any) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {type.filter((t) => typeInfo[t.name]).map((type, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border hover:shadow-md transition-all"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{type.name}</span>
            <span className="font-semibold">
              {typeInfo[type.name].emoji} {typeInfo[type.name].pt}
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">{typeInfo[type.name].avg}</div>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
