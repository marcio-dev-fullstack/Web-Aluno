import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [sessionAdmin, setSessionAdmin] = useState(false);
  const [alunoLogado, setAlunoLogado] = useState(null);

  // Formulário Aluno
  const [emailAluno, setEmailAluno] = useState('');
  const [cpfSenhaAluno, setCpfSenhaAluno] = useState('');

  // Formulário Admin
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');

  // Gestão Admin
  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState('');
  const [alunoId, setAlunoId] = useState(null);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('12345678');
  const [mensagem, setMensagem] = useState(null);
  const [erroLogin, setErroLogin] = useState('');

  // Escuta troca de rota via HASH (#/ e #/admin)
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      setErroLogin('');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Restaura sessões salvas
  useEffect(() => {
    const savedAdmin = localStorage.getItem('mazz_admin_logged');
    if (savedAdmin === 'true') setSessionAdmin(true);

    const savedAluno = localStorage.getItem('mazz_aluno_data');
    if (savedAluno) setAlunoLogado(JSON.parse(savedAluno));
  }, []);

  useEffect(() => {
    if (sessionAdmin && route.includes('/admin')) {
      carregarAlunos();
    }
  }, [sessionAdmin, route]);

  const carregarAlunos = async () => {
    const { data, error } = await supabase.from('alunos').select('*').order('nome', { ascending: true });
    if (!error && data) setAlunos(data);
  };

  const mascaraCPF = (val) => {
    let v = val.replace(/\D/g, '').slice(0, 11);
    return v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const mascaraWhatsApp = (val) => {
    let v = val.replace(/\D/g, '').slice(0, 11);
    return v.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
  };

  // Autenticação Aluno: Email + CPF (Apenas números)
  const handleLoginAluno = async (e) => {
    e.preventDefault();
    setErroLogin('');
    const rawCpfSenha = cpfSenhaAluno.replace(/\D/g, '');
    const cleanEmail = emailAluno.trim().toLowerCase();

    const { data, error } = await supabase
      .from('alunos')
      .select('*')
      .eq('email', cleanEmail)
      .eq('cpf', rawCpfSenha)
      .maybeSingle();

    if (error || !data) {
      setErroLogin('E-mail ou CPF (senha) incorretos. Verifique suas credenciais.');
    } else {
      localStorage.setItem('mazz_aluno_data', JSON.stringify(data));
      setAlunoLogado(data);
    }
  };

  // Autenticação Admin
  const handleLoginAdmin = (e) => {
    e.preventDefault();
    setErroLogin('');
    if (adminEmail === 'marcio@email.com' && adminPass === '123456') {
      localStorage.setItem('mazz_admin_logged', 'true');
      setSessionAdmin(true);
    } else {
      setErroLogin('E-mail ou senha do administrador inválidos.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setSessionAdmin(false);
    setAlunoLogado(null);
    setErroLogin('');
  };

  const salvarAluno = async (e) => {
    e.preventDefault();
    const payload = {
      nome: nome.trim(),
      cpf: cpf.replace(/\D/g, ''),
      whatsapp: whatsapp.replace(/\D/g, ''),
      email: email.trim().toLowerCase(),
      senha_pin: pin
    };

    let error;
    if (alunoId) {
      ({ error } = await supabase.from('alunos').update(payload).eq('id', alunoId));
    } else {
      ({ error } = await supabase.from('alunos').insert([payload]));
    }

    if (error) {
      setMensagem({ tipo: 'erro', texto: `Erro ao salvar: ${error.message}` });
    } else {
      setMensagem({ tipo: 'sucesso', texto: 'Aluno salvo com sucesso!' });
      limparForm();
      carregarAlunos();
    }
  };

  const editarAluno = (aluno) => {
    setAlunoId(aluno.id);
    setNome(aluno.nome);
    setCpf(mascaraCPF(aluno.cpf || ''));
    setWhatsapp(mascaraWhatsApp(aluno.whatsapp || ''));
    setEmail(aluno.email);
    setPin(aluno.senha_pin || '12345678');
  };

  const deletarAluno = async (id, nomeAluno) => {
    if (window.confirm(`Deseja excluir o aluno "${nomeAluno}"?`)) {
      await supabase.from('alunos').delete().eq('id', id);
      carregarAlunos();
    }
  };

  const limparForm = () => {
    setAlunoId(null);
    setNome('');
    setCpf('');
    setWhatsapp('');
    setEmail('');
    setPin('12345678');
    setMensagem(null);
  };

  const alunosFiltrados = alunos.filter(a =>
    a.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (a.cpf && a.cpf.includes(busca)) ||
    a.email.toLowerCase().includes(busca.toLowerCase())
  );

  // ==========================================
  // ROTA 1: PAINEL ADMINISTRATIVO (/#/admin)
  // ==========================================
  if (route.includes('/admin')) {
    if (!sessionAdmin) {
      return (
        <div className="container login-container" style={{ borderTop: '4px solid #3b82f6' }}>
          <h2 className="title" style={{ color: '#3b82f6' }}>Portal MAZZ - Admin</h2>
          <p className="subtitle">Informe suas credenciais de Administrador</p>
          {erroLogin && <div className="alert-error" style={{ marginTop: '12px' }}>{erroLogin}</div>}
          <form onSubmit={handleLoginAdmin} style={{ marginTop: '16px' }}>
            <div className="input-group">
              <label>E-mail do Admin</label>
              <input 
                type="email" 
                placeholder="marcio@email.com"
                value={adminEmail} 
                onChange={(e) => setAdminEmail(e.target.value)}
                required 
              />
            </div>
            <div className="input-group" style={{ marginTop: '12px' }}>
              <label>Senha</label>
              <input 
                type="password" 
                placeholder="******"
                value={adminPass} 
                onChange={(e) => setAdminPass(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="save-btn" style={{ marginTop: '16px', backgroundColor: '#3b82f6' }}>
              Entrar no Painel Admin
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="header-dashboard">
          <div>
            <h2 className="title">Painel Administrativo</h2>
            <p className="subtitle">Logado como: <strong>Márcio Oliveira</strong></p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Sair</button>
        </div>

        <hr className="divider" />

        <div className="form-card">
          <h4>{alunoId ? '✏️ Editar Aluno' : '➕ Cadastrar Novo Aluno'}</h4>
          {mensagem && (
            <div className={mensagem.tipo === 'erro' ? 'alert-error' : 'alert-success'}>
              {mensagem.texto}
            </div>
          )}
          <form onSubmit={salvarAluno} className="grid-form">
            <div className="input-group">
              <label>Nome Completo *</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>CPF *</label>
              <input type="text" value={cpf} onChange={(e) => setCpf(mascaraCPF(e.target.value))} required />
            </div>
            <div className="input-group">
              <label>WhatsApp *</label>
              <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(mascaraWhatsApp(e.target.value))} required />
            </div>
            <div className="input-group">
              <label>E-mail *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Senha PIN (8 dígitos)</label>
              <input type="text" maxLength="8" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="save-btn">{alunoId ? 'Atualizar' : 'Cadastrar'}</button>
              {alunoId && <button type="button" onClick={limparForm} className="cancel-btn">Cancelar</button>}
            </div>
          </form>
        </div>

        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
            <h4>Alunos Registrados ({alunosFiltrados.length})</h4>
            <input 
              type="text" 
              placeholder="🔍 Buscar aluno..." 
              value={busca} 
              onChange={(e) => setBusca(e.target.value)} 
              style={{ width: '260px' }} 
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>WhatsApp</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunosFiltrados.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                  <td>{mascaraCPF(aluno.cpf || '')}</td>
                  <td>{mascaraWhatsApp(aluno.whatsapp || '')}</td>
                  <td>{aluno.email}</td>
                  <td>
                    <button className="icon-btn" onClick={() => editarAluno(aluno)}>✏️</button>
                    <button className="icon-btn" onClick={() => deletarAluno(aluno.id, aluno.nome)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ==========================================
  // ROTA 2: PORTAL DO ALUNO (/#/) - TELA LARANJA
  // ==========================================
  if (!alunoLogado) {
    return (
      <div className="container login-container" style={{ borderTop: '4px solid #f97316' }}>
        <h2 className="title" style={{ color: '#f97316' }}>🎓 Portal do Aluno</h2>
        <p className="subtitle">Acesse com seu e-mail e CPF cadastrado</p>
        {erroLogin && <div className="alert-error" style={{ marginTop: '12px' }}>{erroLogin}</div>}
        <form onSubmit={handleLoginAluno} style={{ marginTop: '16px' }}>
          <div className="input-group">
            <label style={{ color: '#fdba74' }}>E-mail Cadastrado</label>
            <input 
              type="email" 
              placeholder="seuemail@exemplo.com"
              value={emailAluno} 
              onChange={(e) => setEmailAluno(e.target.value)}
              style={{ borderColor: '#f97316' }}
              required 
            />
          </div>
          <div className="input-group" style={{ marginTop: '12px' }}>
            <label style={{ color: '#fdba74' }}>Senha (Seu CPF)</label>
            <input 
              type="password" 
              placeholder="Digite seu CPF (somente números)"
              value={cpfSenhaAluno} 
              onChange={(e) => setCpfSenhaAluno(e.target.value)}
              style={{ borderColor: '#f97316' }}
              required 
            />
          </div>
          <button type="submit" className="save-btn" style={{ marginTop: '16px', backgroundColor: '#f97316' }}>
            Entrar no Portal do Aluno
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container" style={{ borderTop: '4px solid #f97316' }}>
      <div className="header-dashboard">
        <div>
          <h2 className="title" style={{ color: '#f97316' }}>Área do Aluno</h2>
          <p className="subtitle">Bem-vindo(a), <strong>{alunoLogado.nome}</strong></p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Sair</button>
      </div>

      <hr className="divider" />

      <div className="form-card">
        <h4 style={{ marginBottom: '16px', color: '#f97316' }}>📋 Meus Dados Cadastrais</h4>
        <div style={{ display: 'grid', gap: '12px', fontSize: '14px' }}>
          <p><strong>Nome Completo:</strong> {alunoLogado.nome}</p>
          <p><strong>CPF:</strong> {mascaraCPF(alunoLogado.cpf || '')}</p>
          <p><strong>E-mail:</strong> {alunoLogado.email}</p>
          <p><strong>WhatsApp:</strong> {mascaraWhatsApp(alunoLogado.whatsapp || '')}</p>
          <p><strong>Status da Matrícula:</strong> <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Ativa</span></p>
        </div>
      </div>
    </div>
  );
}