import React, { useState, useEffect } from 'react';

export default function App() {
  // 1. Roteamento e Autenticação
  const [route, setRoute] = useState('#/login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuarioInput, setUsuarioInput] = useState('');
  const [senhaInput, setSenhaInput] = useState('');
  const [activeTab, setActiveTab] = useState('alunos');

  // 2. Estados Globais de Dados (Com dados de exemplo)
  const [alunos, setAlunos] = useState([
    { id: 1, nome: 'KESIA MARIA', cpf: '034.264.572-29', email: 'kesia@email.com', telefone: '(65) 99999-0001', nascimento: '1995-05-12' },
    { id: 2, nome: 'MARCIO OLIVEIRA', cpf: '123.456.789-00', email: 'marcio@email.com', telefone: '(65) 99999-0002', nascimento: '1988-10-20' }
  ]);

  const [cursos, setCursos] = useState([
    { id: 1, nome: 'BUSINESS INTELLIGENCE COM POWER BI', cargaHoraria: '40h', instrutor: 'Prof. Carlos Silva' },
    { id: 2, nome: 'DESENVOLVIMENTO FULLSTACK REACT', cargaHoraria: '120h', instrutor: 'Prof. Ana Souza' }
  ]);

  const [matriculas, setMatriculas] = useState([
    { id: 1, alunoId: 1, cursoId: 1, nota: '10.0', situacao: 'APROVADO', emissao: '22 de agosto de 2026', chave: 'MZZ-2026-68E0-0C28' }
  ]);

  // 3. Estados dos Formulários
  const [formAluno, setFormAluno] = useState({ nome: '', cpf: '', email: '', telefone: '', nascimento: '' });
  const [formCurso, setFormCurso] = useState({ nome: '', cargaHoraria: '', instrutor: '' });
  const [formMatricula, setFormMatricula] = useState({ alunoId: '', cursoId: '', nota: '10.0', situacao: 'APROVADO' });

  // 4. Estado para o Certificado Selecionado
  const [certificadoAtivo, setCertificadoAtivo] = useState(matriculas[0]);

  // Controle de inicialização e rotas
  useEffect(() => {
    // Força a tela de login na primeira carga
    window.location.hash = '#/login';
    setRoute('#/login');

    const handleHashChange = () => {
      const currentHash = window.location.hash || '#/login';
      setRoute(currentHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handlers do Sistema
  const handleLogin = (e) => {
    e.preventDefault();
    if (usuarioInput === 'admin' && senhaInput === '123456') {
      setIsAuthenticated(true);
      window.location.hash = '#/admin';
    } else {
      alert('Usuário ou senha incorretos! (Credenciais: admin / 123456)');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      setIsAuthenticated(false);
      window.location.hash = '#/login';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Cadastro de Aluno
  const handleCadastrarAluno = (e) => {
    e.preventDefault();
    const novo = { ...formAluno, id: Date.now() };
    setAlunos([...alunos, novo]);
    setFormAluno({ nome: '', cpf: '', email: '', telefone: '', nascimento: '' });
    alert('Aluno cadastrado com sucesso!');
  };

  // Cadastro de Curso
  const handleCadastrarCurso = (e) => {
    e.preventDefault();
    const novo = { ...formCurso, id: Date.now() };
    setCursos([...cursos, novo]);
    setFormCurso({ nome: '', cargaHoraria: '', instrutor: '' });
    alert('Curso cadastrado com sucesso!');
  };

  // Matricular Aluno
  const handleCadastrarMatricula = (e) => {
    e.preventDefault();
    const chaveGerada = `MZZ-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const nova = {
      id: Date.now(),
      alunoId: Number(formMatricula.alunoId),
      cursoId: Number(formMatricula.cursoId),
      nota: formMatricula.nota,
      situacao: formMatricula.situacao,
      emissao: '22 de agosto de 2026',
      chave: chaveGerada
    };
    setMatriculas([...matriculas, nova]);
    alert('Matrícula efetuada com sucesso!');
  };

  // Visualizar Certificado de uma Matrícula
  const verCertificado = (mat) => {
    setCertificadoAtivo(mat);
    window.location.hash = '#/certificado';
  };

  // Dados resolvidos para a exibição do Certificado Ativo
  const alunoCert = alunos.find(a => a.id === certificadoAtivo?.alunoId) || alunos[0];
  const cursoCert = cursos.find(c => c.id === certificadoAtivo?.cursoId) || cursos[0];

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col items-center justify-start p-4">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; padding: 0 !important; }
          .cert-container { border: 2px solid #000 !important; box-shadow: none !important; }
        }
      `}</style>

      {/* Barra de Navegação Superior (Exibida apenas quando autenticado) */}
      {isAuthenticated && (
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
      )}

      <main className="w-full max-w-5xl">
        {/* TELA 1: LOGIN (Tela Padrão de Entrada) */}
        {(!isAuthenticated || route.includes('/login')) && (
          <div className="bg-white p-8 rounded shadow-lg border border-gray-300 max-w-md mx-auto text-center mt-10">
            <div className="text-3xl font-bold text-slate-800 mb-1">MAZZ</div>
            <p className="text-xs text-red-700 font-semibold uppercase tracking-widest mb-6">Cursos & Capacitações</p>
            
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

        {/* TELA 2: PAINEL ADMINISTRATIVO */}
        {isAuthenticated && route.includes('/admin') && (
          <div className="bg-white p-6 rounded shadow-lg border border-gray-300">
            <div className="flex justify-between items-center mb-6 pb-2 border-b">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Painel do Administrador - MAZZ</h2>
                <p className="text-xs text-gray-500">Gestão de Alunos, Cursos e Emissão de Certificados</p>
              </div>
            </div>

            {/* Abas do Painel */}
            <div className="flex gap-2 mb-6 border-b pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('alunos')}
                className={`px-4 py-2 text-xs font-bold rounded cursor-pointer ${activeTab === 'alunos' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                👨‍🎓 Cadastrar Alunos
              </button>
              <button
                onClick={() => setActiveTab('cursos')}
                className={`px-4 py-2 text-xs font-bold rounded cursor-pointer ${activeTab === 'cursos' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                📚 Cadastrar Cursos
              </button>
              <button
                onClick={() => setActiveTab('matriculas')}
                className={`px-4 py-2 text-xs font-bold rounded cursor-pointer ${activeTab === 'matriculas' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                📝 Matricular Aluno
              </button>
              <button
                onClick={() => setActiveTab('fichas')}
                className={`px-4 py-2 text-xs font-bold rounded cursor-pointer ${activeTab === 'fichas' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                📄 Fichas & Certificados
              </button>
            </div>

            {/* ABA 1: ALUNOS */}
            {activeTab === 'alunos' && (
              <div className="space-y-6">
                <form onSubmit={handleCadastrarAluno} className="bg-gray-50 p-4 border rounded grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <input type="text" placeholder="Nome Completo" value={formAluno.nome} onChange={e => setFormAluno({...formAluno, nome: e.target.value})} className="p-2 border rounded" required />
                  <input type="text" placeholder="CPF (000.000.000-00)" value={formAluno.cpf} onChange={e => setFormAluno({...formAluno, cpf: e.target.value})} className="p-2 border rounded" required />
                  <input type="email" placeholder="E-mail" value={formAluno.email} onChange={e => setFormAluno({...formAluno, email: e.target.value})} className="p-2 border rounded" required />
                  <input type="text" placeholder="Telefone" value={formAluno.telefone} onChange={e => setFormAluno({...formAluno, telefone: e.target.value})} className="p-2 border rounded" required />
                  <input type="date" value={formAluno.nascimento} onChange={e => setFormAluno({...formAluno, nascimento: e.target.value})} className="p-2 border rounded" required />
                  <button type="submit" className="bg-slate-800 text-white font-bold py-2 rounded hover:bg-slate-900 cursor-pointer">Cadastrar Aluno</button>
                </form>

                <div>
                  <h3 className="font-bold text-sm mb-2 text-slate-800">Alunos Cadastrados</h3>
                  <table className="w-full text-xs border text-left">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="p-2 border-r">Nome</th>
                        <th className="p-2 border-r">CPF</th>
                        <th className="p-2 border-r">E-mail</th>
                        <th className="p-2">Telefone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alunos.map(a => (
                        <tr key={a.id} className="border-b">
                          <td className="p-2 border-r font-semibold">{a.nome}</td>
                          <td className="p-2 border-r">{a.cpf}</td>
                          <td className="p-2 border-r">{a.email}</td>
                          <td className="p-2">{a.telefone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ABA 2: CURSOS */}
            {activeTab === 'cursos' && (
              <div className="space-y-6">
                <form onSubmit={handleCadastrarCurso} className="bg-gray-50 p-4 border rounded grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <input type="text" placeholder="Nome do Curso" value={formCurso.nome} onChange={e => setFormCurso({...formCurso, nome: e.target.value})} className="p-2 border rounded" required />
                  <input type="text" placeholder="Carga Horária (ex: 40h)" value={formCurso.cargaHoraria} onChange={e => setFormCurso({...formCurso, cargaHoraria: e.target.value})} className="p-2 border rounded" required />
                  <input type="text" placeholder="Instrutor / Professor" value={formCurso.instrutor} onChange={e => setFormCurso({...formCurso, instrutor: e.target.value})} className="p-2 border rounded" required />
                  <button type="submit" className="bg-slate-800 text-white font-bold py-2 rounded hover:bg-slate-900 cursor-pointer col-span-full">Cadastrar Curso</button>
                </form>

                <div>
                  <h3 className="font-bold text-sm mb-2 text-slate-800">Cursos Disponíveis</h3>
                  <table className="w-full text-xs border text-left">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="p-2 border-r">Curso</th>
                        <th className="p-2 border-r">Carga Horária</th>
                        <th className="p-2">Instrutor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cursos.map(c => (
                        <tr key={c.id} className="border-b">
                          <td className="p-2 border-r font-semibold">{c.nome}</td>
                          <td className="p-2 border-r">{c.cargaHoraria}</td>
                          <td className="p-2">{c.instrutor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ABA 3: MATRÍCULAS */}
            {activeTab === 'matriculas' && (
              <div className="space-y-6">
                <form onSubmit={handleCadastrarMatricula} className="bg-gray-50 p-4 border rounded grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <select value={formMatricula.alunoId} onChange={e => setFormMatricula({...formMatricula, alunoId: e.target.value})} className="p-2 border rounded" required>
                    <option value="">Selecione o Aluno...</option>
                    {alunos.map(a => <option key={a.id} value={a.id}>{a.nome} - CPF: {a.cpf}</option>)}
                  </select>

                  <select value={formMatricula.cursoId} onChange={e => setFormMatricula({...formMatricula, cursoId: e.target.value})} className="p-2 border rounded" required>
                    <option value="">Selecione o Curso...</option>
                    {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                  </select>

                  <input type="text" placeholder="Nota Final (ex: 10.0)" value={formMatricula.nota} onChange={e => setFormMatricula({...formMatricula, nota: e.target.value})} className="p-2 border rounded" required />

                  <select value={formMatricula.situacao} onChange={e => setFormMatricula({...formMatricula, situacao: e.target.value})} className="p-2 border rounded">
                    <option value="APROVADO">APROVADO</option>
                    <option value="EM ANDAMENTO">EM ANDAMENTO</option>
                  </select>

                  <button type="submit" className="bg-slate-800 text-white font-bold py-2 rounded hover:bg-slate-900 cursor-pointer col-span-full">Efetuar Matrícula</button>
                </form>
              </div>
            )}

            {/* ABA 4: FICHAS E CERTIFICADOS */}
            {activeTab === 'fichas' && (
              <div>
                <h3 className="font-bold text-sm mb-2 text-slate-800">Matrículas e Emitir Certificado</h3>
                <table className="w-full text-xs border text-left">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="p-2 border-r">Aluno</th>
                      <th className="p-2 border-r">Curso</th>
                      <th className="p-2 border-r">Nota</th>
                      <th className="p-2 border-r">Situação</th>
                      <th className="p-2 text-center">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matriculas.map(m => {
                      const al = alunos.find(a => a.id === m.alunoId);
                      const cs = cursos.find(c => c.id === m.cursoId);
                      return (
                        <tr key={m.id} className="border-b">
                          <td className="p-2 border-r font-semibold">{al?.nome || 'N/A'}</td>
                          <td className="p-2 border-r">{cs?.nome || 'N/A'}</td>
                          <td className="p-2 border-r">{m.nota}</td>
                          <td className="p-2 border-r font-bold text-green-700">{m.situacao}</td>
                          <td className="p-2 text-center">
                            <button onClick={() => verCertificado(m)} className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-2 py-1 rounded cursor-pointer">📄 Gerar Certificado</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TELA 3: CERTIFICADO DE CONCLUSÃO */}
        {isAuthenticated && route.includes('/certificado') && (
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

              <h2 className="text-2xl font-bold text-slate-900 my-1">{alunoCert?.nome}</h2>
              <p className="text-xs text-gray-700 mb-4">portador(a) do CPF <span className="font-bold">{alunoCert?.cpf}</span></p>

              <p className="text-sm text-gray-600">concluiu com êxito o curso de capacitação profissional em:</p>
              <h3 className="text-xl font-bold text-blue-900 my-2 uppercase">{cursoCert?.nome}</h3>

              <div className="bg-gray-50 border border-gray-200 rounded px-4 py-2 my-4 text-xs text-gray-700 space-x-2">
                <span>CARGA HORÁRIA: <strong>{cursoCert?.cargaHoraria}</strong></span> |
                <span>NOTA OBTIDA: <strong>{certificadoAtivo?.nota}</strong></span> |
                <span>SITUAÇÃO: <strong className="text-green-700">{certificadoAtivo?.situacao}</strong></span>
              </div>

              <p className="text-sm font-bold text-slate-800 my-4">CUIABÁ - MT, {certificadoAtivo?.emissao}</p>

              <div className="mt-8 border-t border-slate-800 pt-2 w-64">
                <p className="text-xs font-bold text-slate-800">Direção Geral</p>
                <p className="text-[10px] text-gray-500">MAZZ Cursos</p>
                <p className="text-[10px] text-gray-500">CNPJ: 68.664.946/0001-96</p>
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-gray-300 w-full flex justify-between items-end text-left text-[10px] text-gray-500">
                <div>
                  <p className="font-bold text-gray-700">AUTENTICIDADE E VERIFICAÇÃO</p>
                  <p>Documento assinado digitalmente conforme regulamentação interna.</p>
                  <p>Chave de Validação: <strong className="text-slate-800">{certificadoAtivo?.chave}</strong></p>
                </div>
                <div>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${certificadoAtivo?.chave}`} alt="QR Code" className="w-16 h-16 border p-1" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}