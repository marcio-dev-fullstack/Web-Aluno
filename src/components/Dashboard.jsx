import React, { useState, useEffect } from 'react';
import ListaAlunos from './ListaAlunos';
import { cursosIniciais } from '../data/cursosIniciais';

// Importações ajustadas para compatibilidade com Vite
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Função utilitária para garantir mínimo de 40h na carga horária
const padronizarCargasHorarias = (listaCursos) => {
  return listaCursos.map((curso) => {
    const horas = parseInt(curso.cargaHoraria, 10) || 0;
    return {
      ...curso,
      cargaHoraria: horas < 40 ? '40h' : curso.cargaHoraria
    };
  });
};

export default function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState('alunos');
  
  // Estado para cadastro de Aluno
  const [nomeAluno, setNomeAluno] = useState('');
  const [emailAluno, setEmailAluno] = useState('');
  const [whatsappAluno, setWhatsappAluno] = useState('');
  const [cpfAluno, setCpfAluno] = useState('');

  // Cursos com aplicação automática do piso de 40h
  const [cursos, setCursos] = useState(() => {
    const salvos = localStorage.getItem('cursos_v2');
    const baseCursos = salvos ? JSON.parse(salvos) : cursosIniciais;
    return padronizarCargasHorarias(baseCursos);
  });

  const [buscaCurso, setBuscaCurso] = useState('');
  const [nomeCurso, setNomeCurso] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('40h');

  // Estado para Matrículas
  const [matriculaAlunoId, setMatriculaAlunoId] = useState('');
  const [matriculaCursoId, setMatriculaCursoId] = useState('');
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    localStorage.setItem('cursos_v2', JSON.stringify(cursos));
  }, [cursos]);

  useEffect(() => {
    const alunosSalvos = JSON.parse(localStorage.getItem('alunos') || '[]');
    setAlunos(alunosSalvos);
  }, [abaAtiva]);

  const handleSair = () => {
    localStorage.removeItem('usuarioLogado');
    window.location.hash = '#/';
    window.location.reload();
  };

  const handleRestaurarCursosPadrao = () => {
    if (window.confirm('Deseja recarregar a lista padrão de 158 cursos?')) {
      const cursosPadronizados = padronizarCargasHorarias(cursosIniciais);
      setCursos(cursosPadronizados);
      localStorage.setItem('cursos_v2', JSON.stringify(cursosPadronizados));
    }
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
    
    setNomeAluno('');
    setEmailAluno('');
    setWhatsappAluno('');
    setCpfAluno('');
    setAbaAtiva('alunos');
    alert('Aluno cadastrado com sucesso!');
  };

  const handleCadastrarCurso = (e) => {
    e.preventDefault();
    
    // Garante que o novo curso cadastrado também respeite o mínimo de 40h
    const horasDigitadas = parseInt(cargaHoraria, 10) || 0;
    const cargaFormatada = horasDigitadas < 40 ? '40h' : cargaHoraria;

    const novoCurso = {
      id: Date.now(),
      nome: nomeCurso,
      cargaHoraria: cargaFormatada
    };

    const novaListaCursos = [novoCurso, ...cursos];
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

  const cursosFiltrados = cursos.filter(c => 
    c.nome.toLowerCase().includes(buscaCurso.toLowerCase())
  );

  // GERAÇÃO DE PDF
  const gerarPDFCursos = () => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.setTextColor(30, 58, 138);
      doc.text('MAZZ - Grade Curricular de Cursos', 14, 20);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Total de Cursos: ${cursosFiltrados.length} | Gerado em: ${new Date().toLocaleDateString('pt-BR')}`,
        14,
        27
      );

      const tableData = cursosFiltrados.map((curso, index) => [
        index + 1,
        curso.nome,
        curso.cargaHoraria
      ]);

      autoTable(doc, {
        startY: 32,
        head: [['#', 'Nome do Curso', 'Carga Horária']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [30, 58, 138],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 15, halign: 'center' },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 35, halign: 'center' }
        },
        styles: {
          fontSize: 9,
          cellPadding: 3
        }
      });

      doc.save('Grade_de_Cursos_MAZZ.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Ocorreu um erro ao gerar o PDF. Verifique o console para mais detalhes.');
    }
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
        
        {/* NAVEGAÇÃO DE ABAS */}
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
            📚 Cursos ({cursos.length})
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

        {/* ÁREA DA ABA SELECIONADA */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          
          {/* CADASTRAR ALUNO */}
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
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer shadow-lg shadow-blue-600/20"
                >
                  Salvar Aluno
                </button>
              </form>
            </div>
          )}

          {/* LISTA DE ALUNOS */}
          {abaAtiva === 'alunos' && <ListaAlunos />}

          {/* CADASTRAR E LISTAR CURSOS */}
          {abaAtiva === 'cursos' && (
            <div className="space-y-6">
              <div className="max-w-md mx-auto bg-slate-950/50 p-4 border border-slate-800 rounded-xl space-y-4">
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
                    Salvar Novo Curso
                  </button>
                </form>
              </div>

              {/* LISTA COMPLETA E BUSCA DE CURSOS */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h3 className="text-sm font-bold text-white">
                    Cursos Cadastrados ({cursosFiltrados.length})
                  </h3>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={gerarPDFCursos}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-2 rounded-xl transition cursor-pointer shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
                    >
                      📄 Baixar Grade em PDF
                    </button>

                    <button
                      onClick={handleRestaurarCursosPadrao}
                      className="text-xs text-slate-400 hover:text-amber-400 underline cursor-pointer"
                    >
                      🔄 Restaurar Padrão
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={buscaCurso}
                  onChange={(e) => setBuscaCurso(e.target.value)}
                  placeholder="Pesquisar curso por nome..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:border-blue-500 focus:outline-none transition"
                />

                <div className="max-h-96 overflow-y-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 sticky top-0 border-b border-slate-800">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Nome do Curso</th>
                        <th className="p-3 text-right">Carga Horária</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {cursosFiltrados.map((c, index) => (
                        <tr key={c.id} className="hover:bg-slate-800/30">
                          <td className="p-3 font-mono text-slate-500">{index + 1}</td>
                          <td className="p-3 font-medium text-slate-200">{c.nome}</td>
                          <td className="p-3 text-right font-mono text-blue-400">{c.cargaHoraria}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MATRICULAR ALUNOS */}
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Selecione o Curso ({cursos.length} disponíveis)
                  </label>
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