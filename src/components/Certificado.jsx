import React from 'react';

export default function Certificado({ aluno, curso, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  if (!aluno || !curso) return null;

  // URL corrigida para o seu GitHub Pages com Hash Routing
  const linkValidacao = 'https://marcio-dev-fullstack.github.io/Web-Aluno/#/valida';
  const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(linkValidacao)}&size=150`;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 z-50 overflow-y-auto">
      {/* Barra de Ações (Oculta na Impressão) */}
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

      {/* ÁREA DO CERTIFICADO */}
      <div className="bg-white text-slate-900 w-full max-w-4xl aspect-[1.414/1] p-8 md:p-12 border-[12px] border-blue-900 shadow-2xl flex flex-col justify-between text-center relative print:w-full print:h-screen print:max-w-none print:border-[10px] print:shadow-none print:m-0">
        
        {/* Moldura Interna */}
        <div className="absolute inset-2 border-2 border-blue-300 pointer-events-none"></div>

        {/* Cabeçalho */}
        <div className="space-y-2 pt-2">
          <h1 className="text-3xl md:text-5xl font-black text-blue-900 uppercase tracking-widest">
            MAZZ
          </h1>
          <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Plataforma de Capacitação Profissional
          </p>
          <div className="pt-2">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-wide">
              Certificado de Conclusão
            </h2>
          </div>
        </div>

        {/* Corpo do Certificado */}
        <div className="my-4 space-y-3">
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            Certificamos que o(a) aluno(a)
          </p>

          <p className="text-2xl md:text-4xl font-extrabold text-blue-600 uppercase underline underline-offset-8 decoration-blue-400">
            {aluno.nome}
          </p>

          <p className="text-xs md:text-sm font-mono text-slate-600">
            CPF: <strong>{aluno.cpf}</strong>
          </p>

          <p className="text-base md:text-lg text-slate-700 leading-relaxed pt-1">
            concluiu com êxito o curso de capacitação em
          </p>

          <p className="text-xl md:text-3xl font-extrabold text-slate-900 uppercase">
            {curso.nome}
          </p>

          <p className="text-sm md:text-base text-slate-700">
            com carga horária total de <strong>{curso.cargaHoraria}</strong>.
          </p>
        </div>

        {/* Rodapé */}
        <div className="grid grid-cols-3 items-end pt-4 pb-2">
          <div className="flex flex-col items-start text-left space-y-1">
            <img 
              src={qrCodeUrl} 
              alt="QR Code de Validação" 
              className="w-20 h-20 border border-slate-300 rounded p-1"
            />
            <span className="text-[9px] text-slate-500 font-mono leading-tight">
              Valide a autenticidade<br />escaneando o QR Code
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-56 border-t-2 border-slate-700 pt-2 text-xs md:text-sm font-bold text-slate-800">
              Instrutor Responsável
            </div>
          </div>

          <div></div>
        </div>

      </div>
    </div>
  );
}