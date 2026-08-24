import React, { useState } from 'react';
import CursoPlayer from './CursoPlayer';
import { curso01Data } from './cursosData';

export default function App() {
  // Estado para controlar se o aluno/admin abriu algum curso
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  // Lista de cursos da plataforma (Curso 01 funcional + rascunhos para os próximos)
  const listaCursos = [
    {
      id: 1,
      titulo: curso01Data.titulo,
      cargaHoraria: curso01Data.cargaHoraria,
      instrutor: curso01Data.instrutor,
      modulosCount: curso01Data.modulos.length,
      categoria: "Gestão & Engenharia",
      imagem: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600",
      ativo: true
    },
    {
      id: 2,
      titulo: "Orçamento de Obras e Formação de Preço (BDI)",
      cargaHoraria: "40h",
      instrutor: "Engª. Ana Paula Costa",
      modulosCount: 5,
      categoria: "Custos & Finanças",
      imagem: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600",
      ativo: false
    },
    {
      id: 3,
      titulo: "BIM para Gestores: Revit e Navisworks na Prática",
      cargaHoraria: "60h",
      instrutor: "Prof. Fernando Ramos",
      modulosCount: 6,
      categoria: "Tecnologia & BIM",
      imagem: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
      ativo: false
    }
  ];

  // Se algum curso for selecionado, renderiza o Player completo
  if (cursoSelecionado) {
    return <CursoPlayer onVoltar={() => setCursoSelecionado(null)} />;
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col font-sans">
      {/* NAVBAR */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-lg">
              E
            </div>
            <span className="font-bold text-lg tracking-wide text-white">Engenharia<span className="text-blue-500">Academy</span></span>
          </div>

          <nav className="flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#cursos" className="hover:text-blue-400 transition">Meus Cursos</a>
            <a href="#certificados" className="hover:text-blue-400 transition">Certificados</a>
            <div className="bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Aluno Conectado
            </div>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900 border border-blue-900/50 rounded-2xl p-6 md:p-10 mb-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="bg-blue-600/30 text-blue-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30">
              Plataforma de Capacitação Técnica
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-4 mb-3 leading-tight">
              Aprenda a Gerenciar Obras de Alta Performance
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Acesse cursos completos com conteúdo prático, slides detalhados, bateria de exercícios operacionais e exames de certificação com validação automática.
            </p>
            <a 
              href="#cursos" 
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-lg shadow-lg transition"
            >
              Explorar Catálogo
            </a>
          </div>
        </div>

        {/* LISTA DE CURSOS */}
        <section id="cursos" className="space-y-6">
          <div className="flex justify-between items-end border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Catálogo de Cursos Disponíveis</h2>
              <p className="text-xs text-slate-400 mt-1">Selecione um curso para acessar os módulos e realizar os testes</p>
            </div>
            <span className="text-xs text-slate-500 font-mono">Total: {listaCursos.length} Cursos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listaCursos.map((curso) => (
              <div 
                key={curso.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden">
                    <img 
                      src={curso.imagem} 
                      alt={curso.titulo}
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded border border-slate-800 uppercase">
                      {curso.categoria}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-sm text-white line-clamp-2 leading-snug">
                      {curso.titulo}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-b border-slate-800/80 py-2 font-mono">
                      <span>⏱️ {curso.cargaHoraria}</span>
                      <span>📚 {curso.modulosCount} Módulos</span>
                    </div>

                    <p className="text-xs text-slate-400">
                      Instrutor: <strong className="text-slate-200">{curso.instrutor}</strong>
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  {curso.ativo ? (
                    <button
                      onClick={() => setCursoSelecionado(curso)}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-lg shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      Acessar Curso Completo →
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-slate-800 text-slate-500 font-bold text-xs py-2.5 rounded-lg cursor-not-allowed text-center"
                    >
                      Em Breve (Em Produção)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-16 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 EngenhariaAcademy — Sistema de Capacitação Continuada.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Termos</a>
            <a href="#" className="hover:underline">Privacidade</a>
            <a href="#" className="hover:underline">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}