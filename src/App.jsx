import React, { useState, useEffect } from 'react';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAdmin = () => {
    window.location.hash = '#/admin';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      window.location.hash = '#/login';
    }
  };

  const handleVoltar = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col items-center justify-start p-4">
      {/* Estilos para impressão */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; padding: 0 !important; }
          .cert-container { border: 2px solid #000 !important; box-shadow: none !important; }
        }
      `}</style>

      {/* Barra de Navegação Superior Global */}
      <header className="no-print w-full max-w-4xl flex justify-center gap-4 mb-6 z-50">
        <button
          type="button"
          onClick={handleAdmin}
          className="bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-medium px-4 py-2 rounded shadow flex items-center gap-2 cursor-pointer transition select-none"
        >
          <span>⚙️</span> Painel Admin
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium px-4 py-2 rounded shadow flex items-center gap-2 cursor-pointer transition select-none"
        >
          <span>🖨️</span> Imprimir / PDF
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-medium px-4 py-2 rounded shadow flex items-center gap-2 cursor-pointer transition select-none"
        >
          <span>🚪</span> Sair
        </button>
      </header>

      {/* Renderização Condicional de Telas baseada na Hash */}
      <main className="w-full max-w-4xl">
        {route.includes('/admin') && (
          <div className="bg-white p-6 rounded shadow-lg border border-gray-300">
            <div className="flex justify-between items-center mb-6 pb-2 border-b">
              <h2 className="text-xl font-bold text-slate-800">Painel Administrativo - MAZZ</h2>
              <button
                type="button"
                onClick={handleVoltar}
                className="bg-gray-200 hover:bg-gray-300 text-xs px-3 py-1.5 rounded cursor-pointer"
              >
                ← Voltar ao Certificado
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-50 border rounded">
                <h3 className="font-bold mb-2">Gerenciar Alunos</h3>
                <p className="text-gray-600 text-xs mb-4">Cadastrar ou editar certificados emitidos.</p>
                <button
                  type="button"
                  onClick={() => alert('Módulo de cadastro ativado')}
                  className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded cursor-pointer"
                >
                  Novo Aluno
                </button>
              </div>
              <div className="p-4 bg-gray-50 border rounded">
                <h3 className="font-bold mb-2">Configurações de Cursos</h3>
                <p className="text-gray-600 text-xs mb-4">Cargas horárias e chaves de validação.</p>
                <button
                  type="button"
                  onClick={() => alert('Módulo de cursos ativado')}
                  className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded cursor-pointer"
                >
                  Gerenciar Cursos
                </button>
              </div>
            </div>
          </div>
        )}

        {route.includes('/login') && (
          <div className="bg-white p-8 rounded shadow-lg border border-gray-300 max-w-md mx-auto text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Acesso ao Portal</h2>
            <input type="text" placeholder="Usuário / CPF" className="w-full p-2 border rounded mb-3 text-sm" />
            <input type="password" placeholder="Senha" className="w-full p-2 border rounded mb-4 text-sm" />
            <button
              type="button"
              onClick={handleAdmin}
              className="w-full bg-slate-800 text-white py-2 rounded font-medium hover:bg-slate-900 cursor-pointer"
            >
              Entrar no Painel
            </button>
          </div>
        )}

        {!route.includes('/admin') && !route.includes('/login') && (
          <div className="bg-white p-8 rounded shadow-lg border-4 border-red-900 relative cert-container">
            <div className="border-2 border-slate-800 p-8 text-center flex flex-col items-center">
              <div className="mb-4">
                <div className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
                  <span class="bg-slate-800 text-white px-2 py-1 rounded">M</span> MAZZ
                </div>
                <p className="text-xs text-red-700 font-semibold uppercase tracking-widest">Cursos & Capacitações</p>
                <p className="text-xs text-gray-500">CNPJ: 68.664.946/0001-96</p>
              </div>

              <h1 className="text-2xl font-serif font-bold text-red-800 tracking-wider my-4">CERTIFICADO DE CONCLUSÃO</h1>
              <p className="text-sm text-gray-600 mb-2">Certificamos para os devidos fins que o(a) aluno(a):</p>

              <h2 className="text-2xl font-bold text-slate-900 my-1">KESIA MARIA</h2>
              <p className="text-xs text-gray-700 mb-4">portador(a) do CPF <span className="font-bold">034.264.572-29</span></p>

              <p className="text-sm text-gray-600">concluiu com êxito o curso de capacitação profissional em:</p>
              <h3 className="text-xl font-bold text-blue-900 my-2 uppercase">BUSINESS INTELLIGENCE COM POWER BI</h3>

              <div className="bg-gray-50 border border-gray-200 rounded px-4 py-2 my-4 text-xs text-gray-700 space-x-2">
                <span>CARGA HORÁRIA: <strong>40h</strong></span> |
                <span>NOTA OBTIDA: <strong>10 / 10.0</strong></span> |
                <span>SITUAÇÃO: <strong className="text-green-700">APROVADO</strong></span>
              </div>

              <p className="text-sm font-bold text-slate-800 my-4">CUIABÁ - MT, 22 de agosto de 2026</p>

              <div className="mt-8 border-t border-slate-800 pt-2 w-64">
                <p className="text-xs font-bold text-slate-800">Direção Geral</p>
                <p className="text-[10px] text-gray-500">MAZZ Cursos</p>
                <p className="text-[10px] text-gray-500">CNPJ: 68.664.946/0001-96</p>
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-gray-300 w-full flex justify-between items-end text-left text-[10px] text-gray-500">
                <div>
                  <p className="font-bold text-gray-700">AUTENTICIDADE E VERIFICAÇÃO</p>
                  <p>Documento assinado digitalmente conforme regulamentação interna.</p>
                  <p>Chave de Validação: <strong className="text-slate-800">MZZ-2026-68E0-0C28</strong></p>
                </div>
                <div>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=MZZ-2026-68E0-0C28" alt="QR Code" className="w-16 h-16 border p-1" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}