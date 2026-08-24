import React, { useState } from 'react';

export default function App() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario === 'admin' && senha === '123456') {
      setLogado(true);
    } else {
      alert('Usuário ou senha incorretos! (admin / 123456)');
    }
  };

  if (!logado) {
    return (
      <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-md w-full text-center">
          <div className="text-3xl font-bold text-slate-800 mb-1">MAZZ</div>
          <p className="text-xs text-red-700 font-semibold uppercase tracking-widest mb-6">
            Acesso ao Painel Admin
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold text-gray-700 mb-1">Usuário</label>
              <input
                type="text"
                placeholder="admin"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full p-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-xs font-bold text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                placeholder="123456"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-2.5 rounded font-bold text-sm cursor-pointer transition mt-2"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-xl font-bold text-slate-800 mb-4">Painel Administrativo MAZZ</h1>
        <button
          onClick={() => setLogado(false)}
          className="bg-red-600 text-white px-4 py-2 rounded text-xs font-bold"
        >
          Sair
        </button>
      </div>
    </div>
  );
}