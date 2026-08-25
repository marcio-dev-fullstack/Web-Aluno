/**
 * File Name: Certificado.jsx
 * Description: 
 * Developer: Marcio
 * Created Date: 2026-08-25
 * Last Modified: 2026-08-25
 */

import React from 'react';

export default function Certificado({ aluno, curso, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  if (!aluno || !curso) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 z-50 overflow-y-auto">
      {/* Barra de Ações (Apenas na tela - Oculta ao Imprimir) */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-4 print:hidden">
        <button
          onClick={onClose}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          ← Voltar para a Ficha
        </button>
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition cursor-pointer flex items-center gap-2"
        >
          🖨️ Imprimir / Salvar PDF
        </button>
      </div>

      {/* ÁREA DO CERTIFICADO (Formatada para Impressão) */}
      <div className="bg-white text-slate-900 w-full max-w-4xl aspect-[1.414/1] p-8 md:p-12 border-[12px] border-blue-900 shadow-2xl flex flex-col justify-between text-center relative print:w-full print:h-screen print:max-w-none print:border-[10px] print:shadow-none print:m-0">
        
        {/* Moldura Interna */}
        <div className="absolute inset-2 border-2 border-blue-300 pointer-events-none"></div>

        {/* Cabeçalho */}
        <div className="space-y-2 pt-4">
          <h1 className="text-2xl md:text-3xl font-black text-blue-900 uppercase tracking-widest">
            Engenharia Academy
          </h1>
          <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Plataforma de Capacitação Profissional
          </p>
          <div className="pt-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-wide">
              Certificado de Conclusão
            </h2>
          </div>
        </div>

        {/* Corpo do Certificado */}
        <div className="my-6 space-y-4">
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            Certificamos que o(a) aluno(a)
          </p>

          <p className="text-2xl md:text-4xl font-extrabold text-blue-600 uppercase underline underline-offset-8 decoration-blue-400">
            {aluno.nome}
          </p>

          <p className="text-xs md:text-sm font-mono text-slate-600">
            CPF: <strong>{aluno.cpf}</strong>
          </p>

          <p className="text-base md:text-lg text-slate-700 leading-relaxed pt-2">
            concluiu com êxito o curso de capacitação em
          </p>

          <p className="text-xl md:text-3xl font-extrabold text-slate-900 uppercase">
            {curso.nome}
          </p>

          <p className="text-sm md:text-base text-slate-700">
            com carga horária total de <strong>{curso.cargaHoraria}</strong>.
          </p>
        </div>

        {/* Rodapé e Assinaturas */}
        <div className="grid grid-cols-2 gap-8 pt-8 pb-4">
          <div className="flex flex-col items-center">
            <div className="w-48 border-t-2 border-slate-700 pt-2 text-xs md:text-sm font-bold text-slate-800">
              Direção Acadêmica
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-48 border-t-2 border-slate-700 pt-2 text-xs md:text-sm font-bold text-slate-800">
              Instrutor Responsável
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}