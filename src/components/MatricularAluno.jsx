/**
 * File Name: MatricularAluno.jsx
 * Description: 
 * Developer: Marcio
 * Created Date: 2026-08-25
 * Last Modified: 2026-08-25
 */

import React, { useState } from 'react';

export default function MatricularAluno() {
  const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
  const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');

  const [alunoId, setAlunoId] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const matriculas = JSON.parse(localStorage.getItem('matriculas') || '[]');
    matriculas.push({ id: Date.now(), alunoId, cursoId, data: new Date().toLocaleDateString() });
    localStorage.setItem('matriculas', JSON.stringify(matriculas));

    setSucesso(true);
    setTimeout(() => setSucesso(false), 3000);
  };

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-base font-bold text-white">Matricular Aluno em Curso</h2>

      {sucesso && (
        <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs p-3 rounded-xl">
          ✓ Matrícula realizada com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Selecione o Aluno</label>
          <select
            value={alunoId}
            onChange={(e) => setAlunoId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100"
            required
          >
            <option value="">-- Selecione --</option>
            {alunos.map((a) => (
              <option key={a.id} value={a.id}>{a.nome} ({a.cpf})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Selecione o Curso</label>
          <select
            value={cursoId}
            onChange={(e) => setCursoId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100"
            required
          >
            <option value="">-- Selecione --</option>
            {cursos.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
        >
          Confirmar Matrícula
        </button>
      </form>
    </div>
  );
}