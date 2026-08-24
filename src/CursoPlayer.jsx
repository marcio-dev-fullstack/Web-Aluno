/**
 * File Name: CursoPlayer.jsx
 * Description: 
 * Developer: Marcio
 * Created Date: 2026-08-24
 * Last Modified: 2026-08-24
 */

import React, { useState } from 'react';
import { curso01Data } from './cursosData';

export default function CursoPlayer({ onVoltar }) {
  const [moduloAtivoIndex, setModuloAtivoIndex] = useState(0);
  const [slideAtual, setSlideAtual] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState('slides'); // 'slides', 'subjetivos', 'objetivos', 'prova'

  // Estado da Prova Online
  const [respostasProva, setRespostasProva] = useState({});
  const [tentativasRestantes, setTentativasRestantes] = useState(10);
  const [resultadoProva, setResultadoProva] = useState(null);

  const moduloAtual = curso01Data.modulos[moduloAtivoIndex];

  // Manipulação da Prova
  const handleOpcaoProvaChange = (questaoId, opcaoIndex) => {
    setRespostasProva({ ...respostasProva, [questaoId]: opcaoIndex });
  };

  const handleSubmeterProva = () => {
    if (tentativasRestantes <= 0) {
      alert("Você atingiu o limite máximo de 10 tentativas.");
      return;
    }

    let acertos = 0;
    curso01Data.provaFinal.forEach((q) => {
      if (respostasProva[q.id] === q.correta) {
        acertos++;
      }
    });

    const notaCalculada = acertos * 0.5; // Cada questão vale 0.5
    const aprovado = notaCalculada >= 6.0;

    setTentativasRestantes(tentativasRestantes - 1);
    setResultadoProva({
      nota: notaCalculada.toFixed(1),
      acertos,
      total: curso01Data.provaFinal.length,
      aprovado
    });
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 p-4 md:p-6 w-full max-w-6xl mx-auto">
      {/* CABEÇALHO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-700 pb-4 mb-6 gap-4">
        <div>
          <button onClick={onVoltar} className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold px-3 py-1.5 rounded mb-2 transition cursor-pointer">
            ← Voltar ao Painel
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{curso01Data.titulo}</h1>
          <p className="text-xs text-slate-400 mt-1">Carga Horária: <span className="text-blue-400 font-bold">{curso01Data.cargaHoraria}</span> | Instrutor: {curso01Data.instrutor}</p>
        </div>
        <div className="bg-blue-950 border border-blue-800 px-4 py-2 rounded-lg text-right">
          <p className="text-[10px] uppercase font-bold text-blue-300">Status da Avaliação</p>
          <p className="text-xs text-slate-200">Nota para Aprovação: <strong className="text-green-400">≥ 6,0</strong></p>
          <p className="text-xs text-slate-300">Tentativas Restantes: <strong className="text-amber-400">{tentativasRestantes} / 10</strong></p>
        </div>
      </div>

      {/* NAVEGAÇÃO DE MÓDULOS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {curso01Data.modulos.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => { setModuloAtivoIndex(idx); setSlideAtual(0); setAbaAtiva('slides'); }}
            className={`p-2.5 text-xs font-bold rounded-lg border text-left transition cursor-pointer ${
              moduloAtivoIndex === idx 
                ? 'bg-blue-600 border-blue-400 text-white shadow-lg' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Módulo {m.id}
          </button>
        ))}
      </div>

      {/* SELEÇÃO DE ABAS */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 mb-6">
        <button onClick={() => setAbaAtiva('slides')} className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer ${abaAtiva === 'slides' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
          🖼️ Slides do Módulo ({moduloAtual.slides.length})
        </button>
        <button onClick={() => setAbaAtiva('subjetivos')} className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer ${abaAtiva === 'subjetivos' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
          📝 Exercícios Subjetivos (10)
        </button>
        <button onClick={() => setAbaAtiva('objetivos')} className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer ${abaAtiva === 'objetivos' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
          🔘 Exercícios Objetivos (10)
        </button>
        <button onClick={() => setAbaAtiva('prova')} className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer ${abaAtiva === 'prova' ? 'bg-red-600 text-white font-extrabold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
          🎓 PROVA ONLINE FINAL (20 Q)
        </button>
      </div>

      {/* CONTEÚDO 1: SLIDES */}
      {abaAtiva === 'slides' && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">{moduloAtual.titulo}</span>
              <span className="text-xs bg-slate-900 px-3 py-1 rounded-full text-slate-400 font-mono">Slide {slideAtual + 1} de {moduloAtual.slides.length}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">{moduloAtual.slides[slideAtual].titulo}</h2>
                <p className="text-sm text-slate-300 leading-relaxed">{moduloAtual.slides[slideAtual].conteudo}</p>
              </div>
              <div className="flex justify-center">
                <img 
                  src={moduloAtual.slides[slideAtual].imagem} 
                  alt={moduloAtual.slides[slideAtual].titulo}
                  className="rounded-lg border border-slate-600 object-cover h-56 w-full shadow-md" 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-700 mt-6">
            <button
              disabled={slideAtual === 0}
              onClick={() => setSlideAtual(slideAtual - 1)}
              className="bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-white text-xs font-bold px-5 py-2.5 rounded-lg cursor-pointer"
            >
              ← Anterior
            </button>
            <button
              disabled={slideAtual === moduloAtual.slides.length - 1}
              onClick={() => setSlideAtual(slideAtual + 1)}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white text-xs font-bold px-5 py-2.5 rounded-lg cursor-pointer"
            >
              Próximo →
            </button>
          </div>
        </div>
      )}

      {/* CONTEÚDO 2: EXERCÍCIOS SUBJETIVOS */}
      {abaAtiva === 'subjetivos' && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-blue-400 border-b border-slate-700 pb-2">Exercícios Subjetivos - {moduloAtual.titulo}</h3>
          <p className="text-xs text-slate-400">Utilize as questões abaixo para fixação de conceitos e discussões operacionais:</p>
          <div className="space-y-3 pt-2">
            {moduloAtual.exerciciosSubjetivos.map((q, idx) => (
              <div key={idx} className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-700/80 text-xs text-slate-200">
                {q}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTEÚDO 3: EXERCÍCIOS OBJETIVOS */}
      {abaAtiva === 'objetivos' && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-blue-400 border-b border-slate-700 pb-2">Exercícios Objetivos do Módulo</h3>
          <div className="space-y-6">
            {moduloAtual.exerciciosObjetivos.map((q) => (
              <div key={q.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-2">
                <p className="text-xs font-bold text-white">{q.id}. {q.pergunta}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {q.opcoes.map((op, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded text-xs border ${idx === q.correta ? 'bg-green-950/60 border-green-600 text-green-200 font-semibold' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                    >
                      {op} {idx === q.correta && ' ✓ (Correta)'}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTEÚDO 4: PROVA ONLINE FINAL */}
      {abaAtiva === 'prova' && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-700 pb-4">
            <h3 className="text-xl font-bold text-red-400">Avaliação Final de Certificação</h3>
            <p className="text-xs text-slate-300 mt-1">A prova contém 20 questões abrangendo todo o conteúdo. Cada questão vale 0,5 ponto (Total: 10,0). É necessário nota igual ou superior a 6,0 para aprovação.</p>
          </div>

          {resultadoProva && (
            <div className={`p-5 rounded-xl border ${resultadoProva.aprovado ? 'bg-green-950/80 border-green-500 text-green-100' : 'bg-red-950/80 border-red-500 text-red-100'}`}>
              <h4 className="text-lg font-bold">{resultadoProva.aprovado ? '🎉 PARABÉNS! VOCÊ FOI APROVADO!' : '❌ NOTA INSUFICIENTE'}</h4>
              <p className="text-sm mt-1">Sua Nota Final: <strong className="text-xl underline">{resultadoProva.nota} / 10.0</strong> ({resultadoProva.acertos} de {resultadoProva.total} acertos)</p>
              <p className="text-xs mt-2">{resultadoProva.aprovado ? 'Seu certificado já está liberado no painel do aluno!' : 'Você pode revisar o material e tentar novamente.'}</p>
            </div>
          )}

          <div className="space-y-6">
            {curso01Data.provaFinal.map((q) => (
              <div key={q.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-3">
                <p className="text-xs font-bold text-slate-100">{q.pergunta}</p>
                <div className="space-y-2">
                  {q.opcoes.map((op, idx) => (
                    <label 
                      key={idx} 
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer text-xs transition ${
                        respostasProva[q.id] === idx 
                          ? 'bg-blue-900/60 border-blue-500 text-white font-medium' 
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name={`questao-${q.id}`} 
                        checked={respostasProva[q.id] === idx}
                        onChange={() => handleOpcaoProvaChange(q.id, idx)}
                        className="accent-blue-500" 
                      />
                      <span>{op}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-700 flex justify-end">
            <button
              onClick={handleSubmeterProva}
              className="bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-8 py-3 rounded-lg shadow-lg cursor-pointer transition"
            >
              Enviar Prova para Correção
            </button>
          </div>
        </div>
      )}
    </div>
  );
}