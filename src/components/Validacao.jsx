/**
 * File Name: Validacao.jsx
 * Description: 
 * Developer: Marcio
 * Created Date: 2026-08-25
 * Last Modified: 2026-08-25
 */

import React from 'react';

export default function Validacao() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
        
        <div className="w-20 h-20 bg-emerald-950/80 border border-emerald-700/60 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-3xl">
          ✓
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
            Documento Autêntico
          </span>
          <h1 className="text-xl font-black text-white pt-2">MAZZ - Validação de Certificado</h1>
          <p className="text-xs text-slate-400">
            Este certificado foi emitido pela plataforma oficial da MAZZ e possui validade em todo o território nacional.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-left text-xs space-y-2 text-slate-300 font-mono">
          <p><strong className="text-slate-500">Instituição:</strong> MAZZ Treinamentos</p>
          <p><strong className="text-slate-500">Status:</strong> Validação Concluída</p>
        </div>

        <button
          onClick={() => window.location.hash = '/'}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer"
        >
          Ir para o Portal
        </button>

      </div>
    </div>
  );
}