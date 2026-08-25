import React, { useState, useEffect } from 'react';
import Certificado from './Certificado';

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [alunoEditando, setAlunoEditando] = useState(null);
  const [alunoFicha, setAlunoFicha] = useState(null);
  const [certificadoAtivo, setCertificadoAtivo] = useState(null);

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = () => {
    const dados = JSON.parse(localStorage.getItem('alunos') || '[]');
    setAlunos(dados);
  };

  const handleSalvarEdicao = (e) => {
    e.preventDefault();
    const alunosAtualizados = alunos.map((a) =>
      a.id === alunoEditando.id ? alunoEditando : a
    );

    localStorage.setItem('alunos', JSON.stringify(alunosAtualizados));
    setAlunos(alunosAtualizados);
    setAlunoEditando(null);
  };

  const handleExcluir = (id) => {
    if (confirm('Tem certeza que deseja remover este aluno?')) {
      const alunosFiltrados = alunos.filter((a) => a.id !== id);
      localStorage.setItem('alunos', JSON.stringify(alunosFiltrados));
      setAlunos(alunosFiltrados);
    }
  };

  const getCursosDoAluno = (alunoId) => {
    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
    
    const idsCursosMatriculados = matriculas
      .filter((m) => String(m.alunoId) === String(alunoId))
      .map((m) => String(m.cursoId));

    return cursos.filter((c) => idsCursosMatriculados.includes(String(c.id)));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-white">Alunos Cadastrados</h2>

      {alunos.length === 0 ? (
        <p className="text-xs text-slate-400">Nenhum aluno cadastrado até o momento.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">E-mail</th>
                <th className="py-3 px-4">WhatsApp</th>
                <th className="py-3 px-4">CPF</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {alunos.map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-100">{a.nome}</td>
                  <td className="py-3.5 px-4">{a.email}</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400">
                    {a.whatsapp || '-'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{a.cpf}</td>
                  <td className="py-3.5 px-4 text-center space-x-2">
                    <button
                      onClick={() => setAlunoFicha(a)}
                      className="bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
                    >
                      📄 Ver Ficha
                    </button>
                    <button
                      onClick={() => setAlunoEditando(a)}
                      className="bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleExcluir(a.id)}
                      className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
                    >
                      🗑️ Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL FICHA DO ALUNO */}
      {alunoFicha && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-6">
            
            {/* Header com Avatar e Nome */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-600/30 border border-blue-400/30">
                {alunoFicha.nome ? alunoFicha.nome.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">{alunoFicha.nome}</h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 mt-1">
                  ● Aluno Ativo
                </span>
              </div>
            </div>

            {/* Dados Pessoais */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">CPF</span>
                <span className="font-mono text-slate-200">{alunoFicha.cpf}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">WhatsApp</span>
                <span className="font-mono text-emerald-400">{alunoFicha.whatsapp || 'Não informado'}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">E-mail</span>
                <span className="text-slate-200">{alunoFicha.email}</span>
              </div>
            </div>

            {/* Cursos Matriculados */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Cursos Matriculados
                </h4>
                <span className="text-[11px] font-mono text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded-md border border-blue-800/60">
                  {getCursosDoAluno(alunoFicha.id).length} Matrícula(s)
                </span>
              </div>

              {getCursosDoAluno(alunoFicha.id).length === 0 ? (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-center">
                  <p className="text-xs text-slate-400">Este aluno ainda não está matriculado em nenhum curso.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {getCursosDoAluno(alunoFicha.id).map((curso) => (
                    <div key={curso.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center gap-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-200 block">{curso.nome}</span>
                        <span className="text-[10px] font-mono text-blue-400">{curso.cargaHoraria}</span>
                      </div>
                      
                      <button
                        onClick={() => setCertificadoAtivo({ aluno: alunoFicha, curso })}
                        className="bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 px-3 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer shrink-0"
                      >
                        🖨️ Certificado
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ação do Modal */}
            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setAlunoFicha(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Fechar Ficha
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE EDIÇÃO */}
      {alunoEditando && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Editar Dados do Aluno</h3>

            <form onSubmit={handleSalvarEdicao} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={alunoEditando.nome}
                  onChange={(e) => setAlunoEditando({ ...alunoEditando, nome: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
                <input
                  type="email"
                  value={alunoEditando.email}
                  onChange={(e) => setAlunoEditando({ ...alunoEditando, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp</label>
                <input
                  type="text"
                  value={alunoEditando.whatsapp || ''}
                  onChange={(e) => setAlunoEditando({ ...alunoEditando, whatsapp: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">CPF</label>
                <input
                  type="text"
                  value={alunoEditando.cpf}
                  onChange={(e) => setAlunoEditando({ ...alunoEditando, cpf: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAlunoEditando(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COMPONENTE DO CERTIFICADO */}
      {certificadoAtivo && (
        <Certificado
          aluno={certificadoAtivo.aluno}
          curso={certificadoAtivo.curso}
          onClose={() => setCertificadoAtivo(null)}
        />
      )}
    </div>
  );
}