import React, { useState, useEffect } from 'react';
import ListaAlunos from './ListaAlunos';
import { cursosIniciais } from '../data/cursosIniciais';

export default function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState('alunos');
  
  // Estado para cadastro de Aluno
  const [nomeAluno, setNomeAluno] = useState('');
  const [emailAluno, setEmailAluno] = useState('');
  const [whatsappAluno, setWhatsappAluno] = useState('');
  const [cpfAluno, setCpfAluno] = useState('');

  // Estado dos Cursos (inicia com os 158 cursos do arquivo ou os salvos no localStorage)
  const [cursos, setCursos] = useState(() => {
    const salvos = localStorage.getItem('cursos');
    return salvos ? JSON.parse(salvos) : cursosIniciais;
  });

  // Estado para cadastro de Curso
  const [nomeCurso, setNomeCurso] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('40h');

  // Estado para Matrículas
  const [matriculaAlunoId, setMatriculaAlunoId] = useState('');
  const [matriculaCursoId, setMatriculaCursoId] = useState('');
  const [alunos, setAlunos] = useState([]);

  // Atualiza a lista de cursos no LocalStorage sempre que for modificada
  useEffect(() => {
    localStorage.setItem('cursos', JSON.stringify(cursos));
  }, [cursos]);

  // Carrega a lista de alunos para o formulário de matrículas
  useEffect(() => {
    const alunosSalvos = JSON.parse(localStorage.getItem('alunos') || '[]');
    setAlunos(alunosSalvos);
  }, [abaAtiva]);

  const handleSair = () => {
    localStorage.removeItem('usuarioLogado');
    window.location.hash = '#/';
    window.location.reload();
  };

  const handleCadastrarAluno = (e) => {
    e.preventDefault();
    const novosAlunos = [
      ...alunos,
      {
        id: Date.now(),
        nome: nomeAluno,
        email: emailAluno,
        whatsapp: whatsappAluno,
        cpf: cpfAluno
      }
    ];
    localStorage.setItem('alunos', JSON.stringify(novosAlunos));
    setAlunos(novosAlunos);
    
    // Limpa os campos e redireciona para a lista
    setNomeAluno('');
    setEmailAluno('');
    setWhatsappAluno('');
    setCpfAluno('');
    setAbaAtiva('alunos');
    alert('Aluno cadastrado com sucesso!');
  };

  const handleCadastrarCurso = (e) => {
    e.preventDefault();
    const novoCurso = {
      id: Date.now(),
      nome: nomeCurso,
      cargaHoraria
    };

    const novaListaCursos = [...cursos, novoCurso];
    setCursos(novaListaCursos);

    setNomeCurso('');
    setCargaHoraria('40h');
    alert('Curso cadastrado com sucesso!');
  };

  const handleMatricular = (e) => {
    e.preventDefault();
    if (!matriculaAlunoId || !matriculaCursoId) {
      alert('Selecione o aluno e o curso!');
      return;
    }

    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    
    // Verifica se já está matriculado
    const jaMatriculado = matriculas.some(
      (m) => String(m.alunoId) === String(matriculaAlunoId) && String(m.cursoId) === String(matriculaCursoId)
    );

    if (jaMatriculado) {
      alert('Este aluno já está matriculado neste curso!');
      return;
    }

    const novaMatricula = {
      id: Date.now(),
      alunoId: matriculaAlunoId,
      cursoId: matriculaCursoId
    };

    localStorage.setItem('matriculas', JSON.stringify([...matriculas, novaMatricula]));
    alert('Matrícula realizada com sucesso!');
    setMatriculaAlunoId('');
    setMatriculaCursoId('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* BARRA SUPERIOR */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-600/30">
            E
          </div>
          <h1 className="text-base font-bold text-white tracking-wide">Painel de Gestão</h1>
        </div>

        <button
          onClick={handleSair}
          className="bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          🚪 Sair
        </button>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* MENU DE ABAS DA NAVEGAÇÃO */}
        <div className="flex flex-wrap justify-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
          <button
            onClick={() => setAbaAtiva('cadastrarAluno')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              abaAtiva === 'cadastrarAluno'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            👤 Cadastrar Aluno
          </button>

          <button
            onClick={() => setAbaAtiva('alunos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              abaAtiva === 'alunos'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            📋 Alunos Cadastrados
          </button>

          <button
            onClick={() => setAbaAtiva('cursos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              abaAtiva === 'cursos'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            📚 Cadastrar Cursos
          </button>

          <button
            onClick={() => setAbaAtiva('matricular')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              abaAtiva === 'matricular'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            🎓 Matricular Alunos
          </button>
        </div>

        {/* CONTAINER DINÂMICO DE ABAS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          
          {/* ABA: CADASTRAR ALUNO */}
          {abaAtiva === 'cadastrarAluno' && (
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-base font-bold text-white">Cadastrar Novo Aluno</h2>
              <form onSubmit={handleCadastrarAluno} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    value={nomeAluno}
                    onChange={(e) => setNomeAluno(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={emailAluno}
                    onChange={(e) => setEmailAluno(e.target.value)}
                    placeholder="aluno@email.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp</label>
                  <input
                    type="text"
                    value={whatsappAluno}
                    onChange={(e) => setWhatsappAluno(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CPF</label>
                  <input
                    type="text"
                    value={cpfAluno}
                    onChange={(e) => setCpfAluno(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer shadow-lg shadow-blue-600/20 pt-3"
                >
                  Salvar Aluno
                </button>
              </form>
            </div>
          )}

          {/* ABA: LISTA DE ALUNOS */}
          {abaAtiva === 'alunos' && <ListaAlunos />}

          {/* ABA: CADASTRAR CURSOS */}
          {abaAtiva === 'cursos' && (
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-base font-bold text-white">Cadastrar Novo Curso</h2>
              <form onSubmit={handleCadastrarCurso} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Curso</label>
                  <input
                    type="text"
                    value={nomeCurso}
                    onChange={(e) => setNomeCurso(e.target.value)}
                    placeholder="Ex: Engenharia Civil: Gestão de Obras"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Carga Horária</label>
                  <input
                    type="text"
                    value={cargaHoraria}
                    onChange={(e) => setCargaHoraria(e.target.value)}
                    placeholder="Ex: 40h"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer shadow-lg shadow-blue-600/20"
                >
                  Salvar Curso
                </button>
              </form>
            </div>
          )}

          {/* ABA: MATRICULAR ALUNOS */}
          {abaAtiva === 'matricular' && (
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-base font-bold text-white">Matricular Aluno em Curso</h2>
              <form onSubmit={handleMatricular} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Selecione o Aluno</label>
                  <select
                    value={matriculaAlunoId}
                    onChange={(e) => setMatriculaAlunoId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
                    required
                  >
                    <option value="">-- Selecione o Aluno --</option>
                    {alunos.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nome} ({a.cpf})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Selecione o Curso ({cursos.length} disponíveis)</label>
                  <select
                    value={matriculaCursoId}
                    onChange={(e) => setMatriculaCursoId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
                    required
                  >
                    <option value="">-- Selecione o Curso --</option>
                    {cursos.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome} ({c.cargaHoraria})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  Confirmar Matrícula
                </button>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}