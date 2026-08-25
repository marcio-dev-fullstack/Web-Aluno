import React, { useState, useEffect } from 'react';

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [alunoEditando, setAlunoEditando] = useState(null);

  // Carrega os alunos ao iniciar
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
    </div>
  );
}