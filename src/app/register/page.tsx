"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterProps {
  email: string;
  password: string;
  confirmPassword: string;
  favPokemon: string;
}

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favPokemon, setFavPokemon] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const validatingForm = () => {
    if (!email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido.");
      return false;
    }
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatingForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          favorite_pokemon: favPokemon,
        }),
      });

      const dataUser: RegisterProps = await response.json();

      if (response.ok) {
        setSuccess("Registro realizado com sucesso!");
        localStorage.setItem("user", JSON.stringify(dataUser["email"]));
        router.push("/");
      } else {
        alert("Possível Email Já Cadastrado.");
      }
    } catch (e) {
      setError("Erro ao registrar. Tente novamente.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500">
              PokéHub
            </h1>
            <p className="text-gray-300 font-light">
              Entre na sua conta de treinador
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="exemplo@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm tracking-wide">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm tracking-wide">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm tracking-wide">
                  Pokémon Favorito
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={favPokemon}
                    onChange={(e) => setFavPokemon(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="Charmander"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">
                    ⚡
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                  <p className="text-red-200 text-sm font-medium">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                  <p className="text-green-200 text-sm font-medium">
                    {success}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  loading
                    ? "bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 hover:from-yellow-600 hover:via-red-600 hover:to-pink-600"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Entrando...</span>
                  </div>
                ) : (
                  "Entrar na Academia"
                )}
              </button>

              <div className="flex justify-center text-sm">
                <button
                  onClick={() => router.push("/login")}
                  type="button"
                  className="text-blue-300 hover:text-blue-200 transition-colors duration-200 underline"
                >
                  Lembrei meu Login
                </button>
              </div>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-xs">
              Junte-se à maior comunidade de treinadores Pokémon! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
