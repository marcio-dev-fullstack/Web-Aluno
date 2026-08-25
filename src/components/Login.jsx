import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Exemplo simples de validação (substitua ou conecte ao backend)
    if (usuario === 'admin' && senha === '123456') {
      localStorage.setItem('autenticado', 'true');
      navigate('/dashboard');
    } else {
      setErro('Usuário ou senha incorretos! (Dica: admin / 123456)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto text-white font-extrabold text-xl shadow-lg shadow-blue-600/30">
            E
          </div>
          <h1 className="text-xl font-extrabold text-white">Portal do Sistema</h1>
          <p className="text-xs text-slate-400">Entre com suas credenciais para continuar</p>
        </div>

        {erro && (
          <div className="bg-rose-950/60 border border-rose-800 text-rose-300 text-xs p-3 rounded-xl text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs transition cursor-pointer shadow-lg shadow-blue-600/20"
          >
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}