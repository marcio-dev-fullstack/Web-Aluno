import React, { useState } from 'react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuarioInput, setUsuarioInput] = useState('');
  const [senhaInput, setSenhaInput] = useState('');
  const [activeTab, setActiveTab] = useState('alunos');
  const [verCertificado, setVerCertificado] = useState(false);

  // Estados de dados da escola
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

  const [formAluno, setFormAluno] = useState({ nome: '', cpf: '', email: '', telefone: '', nascimento: '' });
  const [formCurso, setFormCurso] = useState({ nome: '', cargaHoraria: '', instrutor: '' });
  const [formMatricula, setFormMatricula] = useState({ alunoId: '', cursoId: '', nota: '10.0', situacao: 'APROVADO' });
  const [certificadoAtivo, setCertificadoAtivo] = useState(matriculas[0]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuarioInput === 'admin' && senhaInput === '123456') {
      setIsAuthenticated(true);
    } else {
      alert('Usuário ou senha incorretos! (Use: admin / 123456)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsuarioInput('');
    setSenhaInput('');
    setVerCertificado(false);
  };

  const handleCadastrarAluno = (e) => {
    e.preventDefault();
    setAlunos([...alunos, { ...formAluno, id: Date.now() }]);
    setFormAluno({ nome: '', cpf: '', email: '', telefone: '', nascimento: '' });
    alert('Aluno cadastrado com sucesso!');
  };

  const handleCadastrarCurso = (e) => {
    e.preventDefault();
    setCursos([...cursos, { ...formCurso, id: Date.now() }]);
    setFormCurso({ nome: '', cargaHoraria: '', instrutor: '' });
    alert('Curso cadastrado com sucesso!');
  };

  const handleCadastrarMatricula = (e) => {
    e.preventDefault();
    const nova = {
      id: Date.now(),
      alunoId: Number(formMatricula.alunoId),
      cursoId: Number(formMatricula.cursoId),
      nota: formMatricula.nota,
      situacao: formMatricula.situacao,
      emissao: '22 de agosto de 2026',
      chave: `MZZ-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    };
    setMatriculas([...matriculas, nova]);
    alert('Matrícula efetuada!');
  };

  const alunoCert = alunos.find(a => a.id === certificadoAtivo?.alunoId) || alunos[0];
  const cursoCert = cursos.find(c => c.id === certificadoAtivo?.cursoId) || cursos[0];

  // SE NÃO ESTIVER AUTENTICADO: RETORNA APENAS O LOGIN (SEM LER A RUTA/HASH)
  if (!isAuthenticated) {
    return (
      <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-md w-full text-center">
          <div className="text-3xl font-bold text-slate-800 mb-1">MAZZ</div>
          <p className="text-xs text-red-700 font-semibold uppercase tracking-widest mb-6">
            Acesso Restrito - Admin
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold text-gray-700 mb-1">Usuário</label>
              <input
                type="text"
                placeholder="admin"
                value={usuarioInput}
                onChange={(e) => setUsuarioInput(e.target.value)}
                className="w-full p-2.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-xs font-bold text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                placeholder="123456"
                value={senhaInput}
                onChange={(e) => setSenhaInput(e.target.value)}
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

  // APÓS O LOGIN
  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col items-center justify-start p-4">
      <header className="w-full max-w-5xl flex justify-center gap-4 mb-6">
        <button
          onClick={() => setVerCertificado(false)}
          className="bg-slate-800 text-white font-medium px-4 py-2 rounded shadow"
        >
          ⚙️ Painel Admin
        </button>
        {verCertificado && (
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded shadow"
          >
            🖨️ Imprimir / PDF
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white font-medium px-4 py-2 rounded shadow"
        >
          🚪 Sair
        </button>
      </header>

      <main className="w-full max-w-5xl">
        {!verCertificado ? (
          <div className="bg-white p-6 rounded shadow border">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Painel Administrativo</h2>

            <div className="flex gap-2 mb-6 border-b pb-2">
              <button onClick={() => setActiveTab('alunos')} className={`px-3 py-1.5 text-xs font-bold rounded ${activeTab === 'alunos' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>👨‍🎓 Alunos</button>
              <button onClick={() => setActiveTab('cursos')} className={`px-3 py-1.5 text-xs font-bold rounded ${activeTab === 'cursos' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>📚 Cursos</button>
              <button onClick={() => setActiveTab('matriculas')} className={`px-3 py-1.5 text-xs font-bold rounded ${activeTab === 'matriculas' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>📝 Matrículas</button>
              <button onClick={() => setActiveTab('fichas')} className={`px-3 py-1.5 text-xs font-bold rounded ${activeTab === 'fichas' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>📄 Certificados</button>
            </div>

            {activeTab === 'alunos' && (
              <div className="space-y-4">
                <form onSubmit={handleCadastrarAluno} className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs bg-gray-50 p-3 border rounded">
                  <input type="text" placeholder="Nome" value={formAluno.nome} onChange={e => setFormAluno({...formAluno, nome: e.target.value})} className="p-2 border rounded" required />
                  <input type="text" placeholder="CPF" value={formAluno.cpf} onChange={e => setFormAluno({...formAluno, cpf: e.target.value})} className="p-2 border rounded" required />
                  <input type="email" placeholder="Email" value={formAluno.email} onChange={e => setFormAluno({...formAluno, email: e.target.value})} className="p-2 border rounded" required />
                  <input type="text" placeholder="Telefone" value={formAluno.telefone} onChange={e => setFormAluno({...formAluno, telefone: e.target.value})} className="p-2 border rounded" required />
                  <input type="date" value={formAluno.nascimento} onChange={e => setFormAluno({...formAluno, nascimento: e.target.value})} className="p-2 border rounded" required />
                  <button type="submit" className="bg-slate-800 text-white font-bold py-2 rounded">Cadastrar Aluno</button>
                </form>
                <table className="w-full text-xs border text-left">
                  <thead className="bg-gray-100"><tr><th className="p-2">Nome</th><th className="p-2">CPF</th><th className="p-2">Email</th></tr></thead>
                  <tbody>
                    {alunos.map(a => <tr key={a.id} className="border-b"><td className="p-2">{a.nome}</td><td className="p-2">{a.cpf}</td><td className="p-2">{a.email}</td></tr>)}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'cursos' && (
              <div className="space-y-4">
                <form onSubmit={handleCadastrarCurso} className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs bg-gray-50 p-3 border rounded">
                  <input type="text" placeholder="Nome do Curso" value={formCurso.nome} onChange={e => setFormCurso({...formCurso, nome: e.target.value})} className="p-2 border rounded" required />
                  <input type="text" placeholder="Carga Horária" value={formCurso.cargaHoraria} onChange={e => setFormCurso({...formCurso, cargaHoraria: e.target.value})} className="p-2 border rounded" required />
                  <input type="text" placeholder="Instrutor" value={formCurso.instrutor} onChange={e => setFormCurso({...formCurso, instrutor: e.target.value})} className="p-2 border rounded" required />
                  <button type="submit" className="bg-slate-800 text-white font-bold py-2 rounded col-span-full">Cadastrar Curso</button>
                </form>
                <table className="w-full text-xs border text-left">
                  <thead className="bg-gray-100"><tr><th className="p-2">Curso</th><th className="p-2">Carga Horária</th><th className="p-2">Instrutor</th></tr></thead>
                  <tbody>
                    {cursos.map(c => <tr key={c.id} className="border-b"><td className="p-2">{c.nome}</td><td className="p-2">{c.cargaHoraria}</td><td className="p-2">{c.instrutor}</td></tr>)}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'matriculas' && (
              <form onSubmit={handleCadastrarMatricula} className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs bg-gray-50 p-3 border rounded">
                <select value={formMatricula.alunoId} onChange={e => setFormMatricula({...formMatricula, alunoId: e.target.value})} className="p-2 border rounded" required>
                  <option value="">Selecione o Aluno...</option>
                  {alunos.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
                </select>
                <select value={formMatricula.cursoId} onChange={e => setFormMatricula({...formMatricula, cursoId: e.target.value})} className="p-2 border rounded" required>
                  <option value="">Selecione o Curso...</option>
                  {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
                <input type="text" placeholder="Nota" value={formMatricula.nota} onChange={e => setFormMatricula({...formMatricula, nota: e.target.value})} className="p-2 border rounded" required />
                <button type="submit" className="bg-slate-800 text-white font-bold py-2 rounded col-span-full">Matricular</button>
              </form>
            )}

            {activeTab === 'fichas' && (
              <table className="w-full text-xs border text-left">
                <thead className="bg-gray-100"><tr><th className="p-2">Aluno</th><th className="p-2">Curso</th><th className="p-2">Ação</th></tr></thead>
                <tbody>
                  {matriculas.map(m => (
                    <tr key={m.id} className="border-b">
                      <td className="p-2">{alunos.find(a => a.id === m.alunoId)?.nome}</td>
                      <td className="p-2">{cursos.find(c => c.id === m.cursoId)?.nome}</td>
                      <td className="p-2">
                        <button onClick={() => { setCertificadoAtivo(m); setVerCertificado(true); }} className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded">Ver Certificado</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className="bg-white p-8 rounded border-4 border-red-900 text-center">
            <h1 className="text-2xl font-serif font-bold text-red-800 my-2">CERTIFICADO DE CONCLUSÃO</h1>
            <p className="text-xs text-gray-600">Certificamos que</p>
            <h2 className="text-xl font-bold my-2">{alunoCert?.nome}</h2>
            <p className="text-xs text-gray-600">concluiu o curso de</p>
            <h3 className="text-lg font-bold text-blue-900 uppercase my-2">{cursoCert?.nome}</h3>
            <p className="text-xs font-bold text-slate-800 mt-6">Chave: {certificadoAtivo?.chave}</p>
          </div>
        )}
      </main>
    </div>
  );
}