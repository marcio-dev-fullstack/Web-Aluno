/**
 * File Name: Dashboard.jsx
 * Description: 
 * Developer: Marcio
 * Created Date: 2026-08-25
 * Last Modified: 2026-08-25
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CadastrarAluno from './CadastrarAluno';
import ListaAlunos from './ListaAlunos';
import CadastrarCurso from './CadastrarCurso';
import MatricularAluno from './MatricularAluno';

export default function Dashboard() {
  const [aba, setAba] = useState('cadastrar-aluno');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('autenticado');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white font-black text-lg w-9 h-9 rounded-xl flex items-center justify-center">
            E
          </div>
          <span className="font-extrabold text-base text-white">Painel de Gestão</span>
        </div>

        <button
          onClick={handleLogout}
          className="bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          🚪 Sair
        </button>
      </header>

      {/* NAVEGAÇÃO DAS 4 FUNCIONALIDADES */}
      <div className="max-w-6xl w-full mx-auto p-6 space-y-6">
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setAba('cadastrar-aluno')}
            className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
              aba === 'cadastrar-aluno'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            👤 Cadastrar Aluno
          </button>

          <button
            onClick={() => setAba('alunos-cadastrados')}
            className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
              aba === 'alunos-cadastrados'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            📋 Alunos Cadastrados
          </button>

          <button
            onClick={() => setAba('cadastrar-curso')}
            className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
              aba === 'cadastrar-curso'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            📚 Cadastrar Cursos
          </button>

          <button
            onClick={() => setAba('matricular-aluno')}
            className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
              aba === 'matricular-aluno'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            🎓 Matricular Alunos
          </button>
        </nav>

        {/* CONTEÚDO DA ABA SELECIONADA */}
        <main className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          {aba === 'cadastrar-aluno' && <CadastrarAluno />}
          {aba === 'alunos-cadastrados' && <ListaAlunos />}
          {aba === 'cadastrar-curso' && <CadastrarCurso />}
          {aba === 'matricular-aluno' && <MatricularAluno />}
        </main>
      </div>
    </div>
  );
}