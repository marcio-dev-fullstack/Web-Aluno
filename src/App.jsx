import React, { useState, useEffect } from 'react';

export default function App() {
  // Inicializa e força a rota para #/login na primeira carga
  const [route, setRoute] = useState(window.location.hash || '#/login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuarioInput, setUsuarioInput] = useState('');
  const [senhaInput, setSenhaInput] = useState('');
  const [activeTab, setActiveTab] = useState('alunos');

  // Dados para gestão escolar
  const [alunos] = useState([
    { id: 1, nome: 'KESIA MARIA', cpf: '034.264.572-29', curso: 'Business Intelligence com Power BI', status: 'Aprovado' },
    { id: 2, nome: 'MARCIO OLIVEIRA', cpf: '123.456.789-00', curso: 'Desenvolvimento Fullstack', status: 'Em Andamento' }
  ]);

  const [cursos] = useState([
    { id: 1, nome: 'Business Intelligence com Power BI', cargaHoraria: '40h' },
    { id: 2, nome: 'Desenvolvimento Fullstack', cargaHoraria: '120h' }
  ]);

  useEffect(() => {
    // Se acessar a raiz sem hash, força o redirecionamento imediato para #/login
    if (!window.location.hash) {
      window.location.hash = '#/login';
      setRoute('#/login');
    }

    const session = localStorage.getItem('webAlunoAuth');
    if (session === 'true') {
      setIsAuthenticated(true);
    }

    const handleHashChange = () => {
      setRoute(window.location.hash || '#/login');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuarioInput === 'admin' && senhaInput === '123456') {
      localStorage.setItem('webAlunoAuth', 'true');
      setIsAuthenticated(true);
      window.location.hash = '#/admin';
    } else {
      alert('Usuário ou senha incorretos! (Credenciais: admin / 123456)');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      localStorage.removeItem('webAlunoAuth');
      setIsAuthenticated(false);
      window.location.hash = '#/login';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col items-center justify-start p-4">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; padding: 0 !important; }
          .cert-container { border: 2px solid #000 !important; box-shadow: none !important; }
        }
      `}</style>

      {/* Barra de Navegação Superior */}
      <header className="no-print w-full max-w-5xl flex justify-center gap-4 mb-6 z-50">
        <button
          type="button"
          onClick={() => { window.location.hash = '#/admin'; }}
          className="bg-slate-800 hover:bg-slate-900 text-white font-medium px-4 py-2 rounded shadow flex items-center gap-2 cursor-pointer transition select-none"
        >
          <span>⚙️</span> Painel Admin
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow flex items-center gap-2 cursor-pointer transition select-none"
        >
          <span>🖨️</span> Imprimir / PDF
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded shadow flex items-center gap-2 cursor-pointer transition select-none"
        >
          <span>🚪</span> Sair
        </button>
      </header>

      <main className="w-full max-w-5xl">
        {/* TELA INICIAL DE LOGIN (Forçada na abertura) */}
        {(route.includes('/login') || !isAuthenticated) && (
          <div className="bg-white p-8 rounded shadow-lg border border-gray-300 max-w-md mx-auto text-center">
            <div className="text-3xl font-bold text-slate-800 mb-2">MAZZ</div>
            <p className="text-xs text-red-700 font-semibold uppercase tracking-widest mb-6">Acesso Ao Portal Administrativo</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Usuário (admin)"
                value={usuarioInput}
                onChange={(e) => setUsuarioInput(e.target.value)}
                className="w-full p-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
                required
              />
              <input
                type="password"
                placeholder="Senha (123456)"
                value={senhaInput}
                onChange={(e) => setSenhaInput(e.target.value)}
                className="w-full p-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
                required
              />
              <button
                type="submit"
                className="w-full bg-slate-800 hover:bg-slate-900 text-white py-2.5 rounded font-medium cursor-pointer transition"
              >
                Entrar no Painel
              </button>
            </form>
          </div>
        )}

        {/* TELA DO PAINEL ADMIN (Liberado após autenticar) */}
        {route.includes('/admin') && isAuthenticated && (
          <div className="bg-white p-6 rounded shadow-lg border border-gray-300">
            <div className="flex justify-between items-center mb-6 pb-2 border-b">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Painel do Administrador - MAZZ</h2>
                <p className="text-xs text-gray-500">Gestão Escolar e Acadêmica</p>
              </div>
              <button
                type="button"
                onClick={() => { window.location.hash = '#/certificado'; }}
                className="bg-gray-200 hover:bg-gray-300 text-xs font-semibold px-3 py-1.5 rounded cursor-pointer"
              >
                ← Ver Certificado
              </button>
            </div>

            {/* Abas do Painel */}
            <div className="flex gap-2 mb-6 border-b pb-2">
              <button
                onClick={() => setActiveTab('alunos')}
                className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer ${activeTab === 'alunos' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                👨‍🎓 Alunos
              </button>
              <button
                onClick={() => setActiveTab('cursos')}
                className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer ${activeTab === 'cursos' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                📚 Cursos
              </button>
              <button
                onClick={() => setActiveTab('matriculas')}
                className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer ${activeTab === 'matriculas' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                📝 Matrículas
              </button>
              <button
                onClick={() => setActiveTab('fichas')}
                className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer ${activeTab === 'fichas' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                📄 Fichas dos Alunos
              </button>
            </div>

            {/* Conteúdo da Gestão */}
            {activeTab === 'alunos' && (
              <div>
                <h3 className="font-bold text-sm mb-3">Lista de Alunos Cadastrados</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="p-2 border-r">Nome</th>
                        <th className="p-2 border-r">CPF</th>
                        <th className="p-2 border-r">Curso</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alunos.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-2 border-r font-semibold">{item.nome}</td>
                          <td className="p-2 border-r">{item.cpf}</td>
                          <td className="p-2 border-r">{item.curso}</td>
                          <td className="p-2 font-bold text-green-700">{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'cursos' && (
              <div>
                <h3 className="font-bold text-sm mb-3">Cursos da Escola</h3>
                <ul className="space-y-2 text-xs">
                  {cursos.map((c) => (
                    <li key={c.id} className="p-3 bg-gray-50 border rounded flex justify-between">
                      <span className="font-semibold">{c.nome}</span>
                      <span className="text-gray-500">Carga Horária: {c.cargaHoraria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'matriculas' && (
              <div className="text-xs text-gray-600">
                <h3 className="font-bold text-sm mb-3 text-slate-800">Controle de Matrículas</h3>
                <p>Gestão de turmas e novas matrículas ativas na instituição.</p>
              </div>
            )}

            {activeTab === 'fichas' && (
              <div className="text-xs text-gray-600">
                <h3 className="font-bold text-sm mb-3 text-slate-800">Fichas Cadastrais dos Alunos</h3>
                <p>Acesso rápido aos históricos escolares e dados de certificação.</p>
              </div>
            )}
          </div>
        )}

        {/* TELA DE CERTIFICADO (Acessível via rota #/certificado após autenticado) */}
        {route.includes('/certificado') && isAuthenticated && (
          <div className="bg-white p-8 rounded shadow-lg border-4 border-red-900 relative cert-container">
            <div className="border-2 border-slate-800 p-8 text-center flex flex-col items-center">
              <div className="mb-4">
                <div className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
                  <span className="bg-slate-800 text-white px-2 py-1 rounded">M</span> MAZZ
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