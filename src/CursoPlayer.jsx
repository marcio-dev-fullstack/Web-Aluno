import React, { useState } from 'react';
import { curso01Data } from './cursosData';

export default function CursoPlayer({ curso, onVoltar }) {
  // Usa o curso recebido por prop ou o curso 01 padrão caso venha sem estrutura
  const cursoAtivo = (curso && curso.modulos && curso.modulos.length > 0) 
    ? curso 
    : curso01Data;

  const [moduloIndex, setModuloIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState('slides'); // 'slides', 'exercicios', 'prova'
  
  // Respostas da prova final
  const [respostasProva, setRespostasProva] = useState({});
  const [resultadoProva, setResultadoProva] = useState(null);

  const modulos = cursoAtivo.modulos || [];
  const moduloAtual = modulos[moduloIndex] || null;
  const slides = moduloAtual?.slides || [];
  const slideAtual = slides[slideIndex] || null;

  const proximoSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else if (moduloIndex < modulos.length - 1) {
      setModuloIndex(moduloIndex + 1);
      setSlideIndex(0);
    }
  };

  const slideAnterior = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else if (moduloIndex > 0) {
      setModuloIndex(moduloIndex - 1);
      setSlideIndex((modulos[moduloIndex - 1]?.slides?.length || 1) - 1);
    }
  };

  const handleOpcaoProva = (perguntaId, opcaoIdx) => {
    setRespostasProva(prev => ({
      ...prev,
      [perguntaId]: opcaoIdx
    }));
  };

  const calcularResultadoProva = () => {
    const prova = cursoAtivo.provaFinal || [];
    if (prova.length === 0) return;

    let acertos = 0;
    prova.forEach(q => {
      if (respostasProva[q.id] === q.correta) {
        acertos++;
      }
    });

    const nota = (acertos / prova.length) * 10;
    setResultadoProva({
      nota: nota.toFixed(1),
      aprovado: nota >= 6.0,
      totalQuestoes: prova.length,
      acertos
    });
  };

  // Trata cursos de demonstração que ainda não possuem conteúdo cadastrado
  if (!moduloAtual && modulos.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-lg text-center shadow-2xl space-y-4">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold border border-blue-500/30">
            ℹ️
          </div>
          <h2 className="text-xl font-bold text-white">{cursoAtivo.nome || curso.nome}</h2>
          <p className="text-sm text-slate-400">
            Este curso está em fase de demonstração no catálogo. A estrutura completa de slides e avaliações está disponível para o curso <strong className="text-blue-400">Projetos Estruturais em Concreto Armado</strong>.
          </p>
          <button
            onClick={onVoltar}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition cursor-pointer shadow-lg shadow-blue-600/20"
          >
            ← Voltar ao Painel Geral
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* BARRA SUPERIOR FIXA */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={onVoltar}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 shadow-sm"
          >
            ← Voltar ao Painel
          </button>
          <div>
            <h1 className="text-sm font-extrabold text-white line-clamp-1">{cursoAtivo.nome}</h1>
            <p className="text-[11px] text-slate-400">Instrutor: {cursoAtivo.instrutor || 'MÁRCIO OLIVEIRA'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAbaAtiva('slides')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              abaAtiva === 'slides'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            📊 Slides & Conteúdo
          </button>

          <button
            onClick={() => setAbaAtiva('exercicios')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              abaAtiva === 'exercicios'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            📝 Exercícios
          </button>

          <button
            onClick={() => setAbaAtiva('prova')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              abaAtiva === 'prova'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            🎓 Prova Final
          </button>
        </div>
      </header>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-6 gap-6 overflow-hidden">
        {/* NAVEGAÇÃO LATERAL DOS MÓDULOS */}
        <aside className="w-80 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 h-fit shadow-xl">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Módulos do Curso ({modulos.length})
          </h3>
          <div className="space-y-2">
            {modulos.map((mod, idx) => (
              <button
                key={mod.id}
                onClick={() => {
                  setModuloIndex(idx);
                  setSlideIndex(0);
                  setAbaAtiva('slides');
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer flex flex-col gap-1 ${
                  idx === moduloIndex
                    ? 'bg-blue-950/60 border-blue-600/60 text-blue-200 font-bold'
                    : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <span>{mod.titulo}</span>
                <span className="text-[10px] text-slate-500 font-mono">Duração: {mod.duracao}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* ÁREA DE EXIBIÇÃO DO CONTEÚDO */}
        <main className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-xl min-h-[500px]">
          {/* ABA SLIDES */}
          {abaAtiva === 'slides' && slideAtual && (
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h2 className="text-lg font-extrabold text-white">{slideAtual.titulo}</h2>
                  <span className="text-xs font-mono text-slate-400">
                    Slide {slideIndex + 1} de {slides.length}
                  </span>
                </div>

                {slideAtual.imagem && (
                  <div className="w-full flex justify-center bg-slate-950 rounded-xl p-2 border border-slate-800 overflow-hidden max-h-[320px]">
                    <img
                      src={slideAtual.imagem}
                      alt={slideAtual.titulo}
                      className="object-contain max-h-[300px] w-full rounded-lg"
                    />
                  </div>
                )}

                <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  {slideAtual.conteudo}
                </p>
              </div>

              {/* BOTOES NAVEGAÇAO SLIDES */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  onClick={slideAnterior}
                  disabled={moduloIndex === 0 && slideIndex === 0}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  ← Slide Anterior
                </button>

                <button
                  onClick={proximoSlide}
                  disabled={moduloIndex === modulos.length - 1 && slideIndex === slides.length - 1}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-md shadow-blue-600/20"
                >
                  Próximo Slide →
                </button>
              </div>
            </div>
          )}

          {/* ABA EXERCÍCIOS */}
          {abaAtiva === 'exercicios' && moduloAtual && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Exercícios do Módulo
              </h2>

              {/* Subjetivos */}
              {moduloAtual.exerciciosSubjetivos?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Questões Dissertativas / Subjetivas
                  </h3>
                  {moduloAtual.exerciciosSubjetivos.map((ex, i) => (
                    <div key={i} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                      <p className="font-semibold text-slate-200">{i + 1}. {ex}</p>
                      <textarea
                        placeholder="Digite sua resposta técnica..."
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Objetivos */}
              {moduloAtual.exerciciosObjetivos?.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Questões Objetivas
                  </h3>
                  {moduloAtual.exerciciosObjetivos.map((q, idx) => (
                    <div key={q.id} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                      <p className="text-xs font-semibold text-slate-200">{idx + 1}. {q.pergunta}</p>
                      <div className="space-y-2">
                        {q.opcoes.map((op, opIdx) => (
                          <label key={opIdx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900/80 cursor-pointer text-xs text-slate-300 border border-slate-800/50">
                            <input type="radio" name={`quest_${q.id}`} className="accent-blue-500" />
                            <span>{op}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABA PROVA FINAL */}
          {abaAtiva === 'prova' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white">Avaliação Final do Curso</h2>
                <p className="text-xs text-slate-400">Responda a todas as questões para obter a nota final (Mínimo para aprovação: 6,0).</p>
              </div>

              {resultadoProva ? (
                <div className={`p-6 rounded-2xl border text-center space-y-4 ${
                  resultadoProva.aprovado
                    ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-800 text-rose-200'
                }`}>
                  <div className="text-3xl font-extrabold font-mono">
                    Nota: {resultadoProva.nota} / 10.0
                  </div>
                  <p className="text-sm font-semibold">
                    {resultadoProva.aprovado
                      ? '🎉 Parabéns! Você foi aprovado e seu certificado está disponível.'
                      : '❌ Você não atingiu a nota mínima. Revise o conteúdo e tente novamente.'}
                  </p>
                  <button
                    onClick={() => setResultadoProva(null)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Refazer Prova
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {(cursoAtivo.provaFinal || []).map((q, idx) => (
                    <div key={q.id} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                      <p className="text-xs font-semibold text-slate-200">{idx + 1}. {q.pergunta}</p>
                      <div className="space-y-2">
                        {q.opcoes.map((op, opIdx) => (
                          <label
                            key={opIdx}
                            onClick={() => handleOpcaoProva(q.id, opIdx)}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs transition ${
                              respostasProva[q.id] === opIdx
                                ? 'bg-blue-950/80 border-blue-500 text-blue-200 font-medium'
                                : 'bg-slate-900 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`prova_${q.id}`}
                              checked={respostasProva[q.id] === opIdx}
                              onChange={() => {}}
                              className="accent-blue-500"
                            />
                            <span>{op}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={calcularResultadoProva}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition cursor-pointer shadow-lg shadow-blue-600/20 text-xs"
                  >
                    Finalizar e Enviar Prova
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}