// components/AnimatedBackground.tsx
export default function AnimatedBackground() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animationDelay: `${Math.random()*3}s`, animationDuration: `${2+Math.random()*2}s` }} />
      ))}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute w-4 h-4 rounded-full bg-gradient-to-b from-red-500 to-white border-2 border-gray-800 opacity-20 animate-bounce" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animationDelay: `${Math.random()*2}s`, animationDuration: `${3+Math.random()*2}s` }} />
      ))}
    </>
  );
}
