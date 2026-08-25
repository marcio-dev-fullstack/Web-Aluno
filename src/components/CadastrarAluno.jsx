import React, { useState } from 'react';

export default function CadastrarAluno() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    alunos.push({ id: Date.now(), nome, email, cpf, whatsapp });
    localStorage.setItem('alunos', JSON.stringify(alunos));
    
    setSucesso(true);
    setNome('');
    setEmail('');
    setCpf('');
    setWhatsapp('');
    setTimeout(() => setSucesso(false), 3000);
  };

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-base font-bold text-white">Cadastrar Novo Aluno</h2>
      
      {sucesso && (
        <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs p-3 rounded-xl">
          ✓ Aluno cadastrado com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp</label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="(00) 90000-0000"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-lg shadow-blue-600/20"
        >
          Salvar Aluno
        </button>
      </form>
    </div>
  );
}