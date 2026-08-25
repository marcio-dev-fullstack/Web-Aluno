import React, { useState } from 'react';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Aceita admin / admin ou qualquer senha preenchida para liberar o acesso
    if (usuario.trim() !== '' && senha.trim() !== '') {
      localStorage.setItem('usuarioLogado', 'true');
      window.location.hash = '#/dashboard';
      window.location.reload(); // Força a atualização do estado da aplicação
    } else {
      setErro('Preencha o usuário e a senha para continuar.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl space-y-6">
        
        {/* Logo Icon */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/30">
            E
          </div>
          <h1 className="text-lg font-bold text-white">Portal do Sistema</h1>
          <p className="text-xs text-slate-400">Entre com suas credenciais para continuar</p>
        </div>

        {erro && (
          <div className="bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs p-3 rounded-xl text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer shadow-lg shadow-blue-600/20"
          >
            Entrar no Sistema
          </button>
        </form>

      </div>
    </div>
  );
}