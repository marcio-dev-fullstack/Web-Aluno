/**
 * File Name: CadastrarCurso.jsx
 * Description: 
 * Developer: Marcio
 * Created Date: 2026-08-25
 * Last Modified: 2026-08-25
 */

import React, { useState } from 'react';

export default function CadastrarCurso() {
  const [nome, setNome] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('40h');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
    cursos.push({ id: Date.now(), nome, cargaHoraria });
    localStorage.setItem('cursos', JSON.stringify(cursos));

    setSucesso(true);
    setNome('');
    setTimeout(() => setSucesso(false), 3000);
  };

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-base font-bold text-white">Cadastrar Novo Curso</h2>

      {sucesso && (
        <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs p-3 rounded-xl">
          ✓ Curso cadastrado com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Nome do Curso</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Carga Horária</label>
          <input
            type="text"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
        >
          Salvar Curso
        </button>
      </form>
    </div>
  );
}