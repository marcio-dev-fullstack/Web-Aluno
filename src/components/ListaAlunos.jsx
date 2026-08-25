import React from 'react';

export default function ListaAlunos() {
  const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}