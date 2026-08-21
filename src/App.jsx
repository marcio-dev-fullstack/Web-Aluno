import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [abaAdmin, setAbaAdmin] = useState('alunos');

  // Admin Login
  const [adminLogado, setAdminLogado] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminSenha, setAdminSenha] = useState('');

  // Listas
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [busca, setBusca] = useState('');

  // Modais
  const [alunoDetalhe, setAlunoDetalhe] = useState(null);
  const [cursoVisualizar, setCursoVisualizar] = useState(null);
  const [abaConteudo, setAbaConteudo] = useState('pdfs');
  const [editandoMateriais, setEditandoMateriais] = useState(false);

  // Estado dos Materiais por Curso
  const [materiaisCurso, setMateriaisCurso] = useState({
    apostila_titulo: 'Apostila Principal do Curso (PDF)',
    apostila_desc: 'Conteúdo teórico completo em formato PDF.',
    apostila_url: 'https://www.w3.org/WAI/WCAG21/quickref/',
    exercicios_titulo: 'Caderno de Exercícios Práticos (PDF)',
    exercicios_desc: 'Material complementar para fixação.',
    exercicios_url: 'https://www.w3.org/WAI/WCAG21/quickref/',
    video_1_titulo: 'Módulo 1: Fundamentos da Acessibilidade',
    video_1_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    video_2_titulo: 'Módulo 2: Diretrizes Práticas de WCAG',
    video_2_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  });

  // Prova
  const [respostasProva, setRespostasProva] = useState({});
  const [resultadoProva, setResultadoProva] = useState(null);

  // Forms
  const [alunoForm, setAlunoForm] = useState({ id: null, matricula: '', nome: '', cpf: '', whatsapp: '', email: '', foto_url: '' });
  const [cursoForm, setCursoForm] = useState({ id: null, nome: '', carga_horaria: '' });
  const [alunoSelecionadoMatricula, setAlunoSelecionadoMatricula] = useState('');
  const [cursoSelecionadoMatricula, setCursoSelecionadoMatricula] = useState('');

  const questoes = [
    { id: 1, pergunta: '1. Qual a finalidade principal das diretrizes de Acessibilidade Web (WCAG)?', opcoes: ['Garantir acesso a pessoas com deficiência', 'Aumentar a velocidade do servidor', 'Apenas melhorar as cores da página', 'Proibir navegação via teclado'], correta: 0 },
    { id: 2, pergunta: '2. Qual das alternativas representa uma boa prática de desenvolvimento Web?', opcoes: ['Código sem validação', 'Uso de tags semânticas e acessíveis', 'Omitir atributos ALT em imagens', 'Utilizar senhas expostas'], correta: 1 },
    { id: 3, pergunta: '3. Para garantir acessibilidade e estrutura correta em formulários:', opcoes: ['Associar labels aos inputs', 'Remover navegação por TAB', 'Não colocar foco nos elementos', 'Usar baixo contraste'], correta: 0 },
    { id: 4, pergunta: '4. Como garantir a integridade dos dados na aplicação?', opcoes: ['Sem validação no backend', 'Validação no frontend e backend', 'Apenas estilos CSS', 'Não tratar exceções'], correta: 1 },
    { id: 5, pergunta: '5. Qual a finalidade de utilizar APIs RESTful?', opcoes: ['Comunicação padronizada entre sistemas', 'Somente estilização visual', 'Armazenar arquivos locais', 'Compilar código JS'], correta: 0 },
    { id: 6, pergunta: '6. Em relação à segurança de dados, o que é fundamental?', opcoes: ['Autenticação e Criptografia', 'Senhas em texto puro', 'Permissões públicas totais', 'Desabilitar HTTPS'], correta: 0 },
    { id: 7, pergunta: '7. O que representa uma métrica de performance em aplicações Web?', opcoes: ['Tempo de carregamento (LCP)', 'Quantidade de arquivos baixados', 'Tamanho do arquivo CSS', 'Cor do painel'], correta: 0 },
    { id: 8, pergunta: '8. Como otimizar consultas ao banco de dados Supabase?', opcoes: ['Fazer JOINs desnecessários', 'Criar Índices e filtrar campos requeridos', 'Baixar todas as tabelas', 'Ignorar chaves estrangeiras'], correta: 1 },
    { id: 9, pergunta: '9. Qual a importância do controle de versão (Git)?', opcoes: ['Histórico de alterações e trabalho em equipe', 'Apenas salvar arquivos na nuvem', 'Não tem utilização prática', 'Substituir banco de dados'], correta: 0 },
    { id: 10, pergunta: '10. Qual a nota mínima exigida nesta prova para obtenção do certificado?', opcoes: ['Nota maior ou igual a 6.0', 'Nota menor que 5.0', 'Responder apenas 1 questão', 'Qualquer nota acima de 0'], correta: 0 }
  ];

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (adminLogado) {
      carregarAlunos();
      carregarCursos();
      carregarMatriculas();
    }
  }, [adminLogado]);

  const carregarAlunos = async () => {
    const { data } = await supabase.from('alunos').select('*').order('nome', { ascending: true });
    setAlunos(data || []);
  };

  const carregarCursos = async () => {
    const { data } = await supabase.from('cursos').select('*').order('nome', { ascending: true });
    setCursos(data || []);
  };

  const carregarMatriculas = async () => {
    const { data, error } = await supabase.from('matriculas').select('*, alunos(*), cursos(*)');
    if (!error && data) {
      setMatriculas(data);
    } else {
      const { data: rawMatriculas } = await supabase.from('matriculas').select('*');
      setMatriculas(rawMatriculas || []);
    }
  };

  const gerarMatricula = () => {
    const anoAtual = new Date().getFullYear();
    const proximoNumero = alunos.length + 1;
    return `${anoAtual}-${String(proximoNumero).padStart(4, '0')}`;
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (
      (adminEmail.trim().toLowerCase() === 'marcio@email.com' ||
        adminEmail.trim().toLowerCase() === 'admin@mazz.online') &&
      adminSenha === '123456'
    ) {
      setAdminLogado(true);
      setMensagem({ tipo: '', texto: '' });
    } else {
      setMensagem({ tipo: 'erro', texto: 'E-mail ou senha inválidos.' });
    }
  };

  const handleSalvarAluno = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cpfLimpo = alunoForm.cpf.replace(/\D/g, '');
    const emailAluno = alunoForm.email.toLowerCase().trim();

    if (alunoForm.id) {
      const { error } = await supabase
        .from('alunos')
        .update({
          nome: alunoForm.nome.toUpperCase(),
          cpf: cpfLimpo,
          whatsapp: alunoForm.whatsapp,
          email: emailAluno,
          foto_url: alunoForm.foto_url
        })
        .eq('id', alunoForm.id);

      if (error) setMensagem({ tipo: 'erro', texto: 'Erro ao atualizar aluno.' });
      else {
        setMensagem({ tipo: 'sucesso', texto: 'Aluno atualizado!' });
        limparFormAluno();
        carregarAlunos();
      }
    } else {
      const novaMatricula = gerarMatricula();
      const { error } = await supabase.from('alunos').insert([
        {
          matricula: novaMatricula,
          nome: alunoForm.nome.toUpperCase(),
          cpf: cpfLimpo,
          whatsapp: alunoForm.whatsapp,
          email: emailAluno,
          foto_url: alunoForm.foto_url || 'https://via.placeholder.com/150',
          senha_pin: cpfLimpo,
          status: 'Ativo'
        }
      ]);

      if (error) setMensagem({ tipo: 'erro', texto: error.message });
      else {
        setMensagem({ tipo: 'sucesso', texto: `Aluno cadastrado! Matrícula: ${novaMatricula}` });
        limparFormAluno();
        carregarAlunos();
      }
    }
    setLoading(false);
  };

  const limparFormAluno = () => {
    setAlunoForm({ id: null, matricula: '', nome: '', cpf: '', whatsapp: '', email: '', foto_url: '' });
  };

  const handleSalvarCurso = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (cursoForm.id) {
      const { error } = await supabase
        .from('cursos')
        .update({
          nome: cursoForm.nome.toUpperCase(),
          carga_horaria: cursoForm.carga_horaria
        })
        .eq('id', cursoForm.id);

      if (error) setMensagem({ tipo: 'erro', texto: 'Erro ao atualizar curso.' });
      else {
        setMensagem({ tipo: 'sucesso', texto: 'Curso atualizado com sucesso!' });
        setCursoForm({ id: null, nome: '', carga_horaria: '' });
        carregarCursos();
      }
    } else {
      const { error } = await supabase.from('cursos').insert([
        {
          nome: cursoForm.nome.toUpperCase(),
          carga_horaria: cursoForm.carga_horaria
        }
      ]);

      if (error) setMensagem({ tipo: 'erro', texto: error.message });
      else {
        setMensagem({ tipo: 'sucesso', texto: 'Curso cadastrado com sucesso!' });
        setCursoForm({ id: null, nome: '', carga_horaria: '' });
        carregarCursos();
      }
    }
    setLoading(false);
  };

  const handleMatricularAluno = async (e) => {
    e.preventDefault();
    if (!alunoSelecionadoMatricula || !cursoSelecionadoMatricula) {
      setMensagem({ tipo: 'erro', texto: 'Selecione o Aluno e o Curso.' });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('matriculas').insert([
      {
        aluno_id: alunoSelecionadoMatricula,
        curso_id: cursoSelecionadoMatricula,
        status: 'Cursando',
        nota: 0.0
      }
    ]);

    if (error) {
      setMensagem({ tipo: 'erro', texto: 'Erro ao realizar matrícula.' });
    } else {
      setMensagem({ tipo: 'sucesso', texto: 'Aluno matriculado com sucesso!' });
      setAlunoSelecionadoMatricula('');
      setCursoSelecionadoMatricula('');
      await carregarMatriculas();
    }
    setLoading(false);
  };

  const handleAtualizarMatricula = async (matriculaId, campo, valor) => {
    await supabase.from('matriculas').update({ [campo]: valor }).eq('id', matriculaId);
    carregarMatriculas();
  };

  const handleAbrirFichaAluno = async (aluno) => {
    await carregarMatriculas();
    setAlunoDetalhe(aluno);
  };

  const handleAbrirVisualizacaoCurso = (matriculaObj) => {
    setCursoVisualizar(matriculaObj);
    setAbaConteudo('pdfs');
    setRespostasProva({});
    setResultadoProva(null);
    setEditandoMateriais(false);
  };

  const handleSalvarMateriais = (e) => {
    e.preventDefault();
    setEditandoMateriais(false);
    setMensagem({ tipo: 'sucesso', texto: 'Materiais do curso atualizados com sucesso!' });
    setTimeout(() => setMensagem({ tipo: '', texto: '' }), 3000);
  };

  const handleFinalizarProva = async () => {
    let notaCalculada = 0;
    questoes.forEach((q) => {
      if (respostasProva[q.id] === q.correta) {
        notaCalculada += 1;
      }
    });

    const statusFinal = notaCalculada >= 6 ? 'Concluído' : 'Cursando';
    setResultadoProva({ nota: notaCalculada, aprovado: notaCalculada >= 6 });

    if (cursoVisualizar?.id) {
      await supabase
        .from('matriculas')
        .update({ nota: notaCalculada, status: statusFinal })
        .eq('id', cursoVisualizar.id);

      setCursoVisualizar((prev) => ({ ...prev, nota: notaCalculada, status: statusFinal }));
      carregarMatriculas();
    }
  };

  const handleImprimirCertificado = () => {
    window.print();
  };

  const alunosFiltrados = alunos.filter((a) =>
    a.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    a.cpf?.includes(busca) ||
    a.matricula?.toLowerCase().includes(busca.toLowerCase())
  );

  const matriculasDoAlunoDetalhe = matriculas
    .filter((m) => String(m.aluno_id) === String(alunoDetalhe?.id))
    .map((m) => {
      const cursoObj = m.cursos
        ? (Array.isArray(m.cursos) ? m.cursos[0] : m.cursos)
        : cursos.find((c) => String(c.id) === String(m.curso_id));
      const alunoObj = m.alunos
        ? (Array.isArray(m.alunos) ? m.alunos[0] : m.alunos)
        : alunoDetalhe;

      return { ...m, cursoDados: cursoObj, alunoDados: alunoObj };
    });

  const dataHoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  if (route === '#/admin') {
    if (!adminLogado) {
      return (
        <div style={styles.container}>
          <div style={styles.cardAdmin}>
            <h2 style={styles.tituloAdmin}>Painel Admin - MAZZ</h2>
            {mensagem.texto && <div style={styles.alertErro}>{mensagem.texto}</div>}
            <form onSubmit={handleAdminLogin} style={styles.form}>
              <input type="email" placeholder="E-mail Admin" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} style={styles.input} required />
              <input type="password" placeholder="Senha Admin" value={adminSenha} onChange={(e) => setAdminSenha(e.target.value)} style={styles.input} required />
              <button type="submit" style={styles.btnAdmin}>Entrar</button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* REGRAS CSS DE IMPRESSÃO */}
        <style>{`
          @media print {
            body {
              background: #fff !important;
              color: #000 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .no-print {
              display: none !important;
            }
            .print-only {
              display: block !important;
            }
            @page {
              size: A4 landscape;
              margin: 0;
            }
          }
          @media screen {
            .print-only {
              display: none !important;
            }
          }
        `}</style>

        {/* ÁREA DA TELA DO SISTEMA (OCULTA AO IMPRIMIR) */}
        <div className="no-print" style={styles.containerAdmin}>
          <div style={styles.cardAdminPainel}>
            <div style={styles.headerAdmin}>
              <h2>Painel Administrativo</h2>
              <button onClick={() => setAdminLogado(false)} style={styles.btnSair}>Sair</button>
            </div>

            <div style={styles.menuNav}>
              <button onClick={() => setAbaAdmin('alunos')} style={abaAdmin === 'alunos' ? styles.btnNavAtivo : styles.btnNav}>👨‍🎓 Gestão de Alunos</button>
              <button onClick={() => setAbaAdmin('cursos')} style={abaAdmin === 'cursos' ? styles.btnNavAtivo : styles.btnNav}>📚 Cursos</button>
              <button onClick={() => setAbaAdmin('matriculas')} style={abaAdmin === 'matriculas' ? styles.btnNavAtivo : styles.btnNav}>📝 Matricular Aluno</button>
            </div>

            {mensagem.texto && <div style={mensagem.tipo === 'erro' ? styles.alertErro : styles.alertSucesso}>{mensagem.texto}</div>}

            {/* ABA GESTÃO DE ALUNOS */}
            {abaAdmin === 'alunos' && (
              <>
                <div style={styles.secaoForm}>
                  <h3>{alunoForm.id ? `✏️ Editar Aluno` : '➕ Cadastrar Novo Aluno'}</h3>
                  <form onSubmit={handleSalvarAluno} style={styles.gridForm}>
                    <input type="text" placeholder="Nome Completo *" value={alunoForm.nome} onChange={(e) => setAlunoForm({ ...alunoForm, nome: e.target.value })} style={styles.input} required />
                    <input type="text" placeholder="CPF *" value={alunoForm.cpf} onChange={(e) => setAlunoForm({ ...alunoForm, cpf: e.target.value })} style={styles.input} required />
                    <input type="text" placeholder="WhatsApp *" value={alunoForm.whatsapp} onChange={(e) => setAlunoForm({ ...alunoForm, whatsapp: e.target.value })} style={styles.input} required />
                    <input type="email" placeholder="E-mail *" value={alunoForm.email} onChange={(e) => setAlunoForm({ ...alunoForm, email: e.target.value })} style={styles.input} required />
                    <input type="url" placeholder="URL da Foto 3x4 (Opcional)" value={alunoForm.foto_url} onChange={(e) => setAlunoForm({ ...alunoForm, foto_url: e.target.value })} style={{ ...styles.input, gridColumn: '1 / -1' }} />
                    <button type="submit" disabled={loading} style={{ ...styles.btnAdmin, gridColumn: '1 / -1' }}>{loading ? 'Salvando...' : 'Salvar Aluno'}</button>
                  </form>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3>Alunos Cadastrados ({alunosFiltrados.length})</h3>
                    <input type="text" placeholder="🔍 Buscar Aluno..." value={busca} onChange={(e) => setBusca(e.target.value)} style={{ ...styles.input, width: '200px' }} />
                  </div>
                  <table style={styles.tabela}>
                    <thead>
                      <tr>
                        <th style={styles.th}>MATRÍCULA</th>
                        <th style={styles.th}>FOTO</th>
                        <th style={styles.th}>NOME</th>
                        <th style={styles.th}>CPF</th>
                        <th style={styles.th}>AÇÕES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alunosFiltrados.map((aluno) => (
                        <tr key={aluno.id}>
                          <td style={{ ...styles.td, color: '#38bdf8', fontWeight: 'bold' }}>{aluno.matricula}</td>
                          <td style={styles.td}>
                            <img src={aluno.foto_url || 'https://via.placeholder.com/40'} alt="Foto 3x4" style={{ width: '35px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                          </td>
                          <td style={{ ...styles.td, cursor: 'pointer', color: '#60a5fa' }} onClick={() => handleAbrirFichaAluno(aluno)}>
                            <strong>{aluno.nome}</strong>
                          </td>
                          <td style={styles.td}>{aluno.cpf}</td>
                          <td style={styles.td}>
                            <button onClick={() => handleAbrirFichaAluno(aluno)} style={{ ...styles.btnAtualizar, backgroundColor: '#059669' }}>👁️ Abrir Ficha</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* ABA CURSOS */}
            {abaAdmin === 'cursos' && (
              <>
                <div style={styles.secaoForm}>
                  <h3>{cursoForm.id ? '✏️ Editar Curso' : '➕ Cadastrar Novo Curso'}</h3>
                  <form onSubmit={handleSalvarCurso} style={styles.gridForm}>
                    <input type="text" placeholder="Nome do Curso *" value={cursoForm.nome} onChange={(e) => setCursoForm({ ...cursoForm, nome: e.target.value })} style={styles.input} required />
                    <input type="text" placeholder="Carga Horária (ex: 40h) *" value={cursoForm.carga_horaria} onChange={(e) => setCursoForm({ ...cursoForm, carga_horaria: e.target.value })} style={styles.input} required />
                    <button type="submit" disabled={loading} style={{ ...styles.btnAdmin, gridColumn: '1 / -1' }}>{loading ? 'Salvando...' : 'Salvar Curso'}</button>
                  </form>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <h3>Cursos Cadastrados ({cursos.length})</h3>
                  <table style={styles.tabela}>
                    <thead>
                      <tr>
                        <th style={styles.th}>NOME DO CURSO</th>
                        <th style={styles.th}>CARGA HORÁRIA</th>
                        <th style={styles.th}>AÇÕES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cursos.map((curso) => (
                        <tr key={curso.id}>
                          <td style={styles.td}><strong>{curso.nome}</strong></td>
                          <td style={styles.td}>{curso.carga_horaria || '-'}</td>
                          <td style={styles.td}>
                            <button onClick={() => setCursoForm(curso)} style={styles.btnAtualizar}>✏️ Editar</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* ABA MATRICULAR */}
            {abaAdmin === 'matriculas' && (
              <>
                <div style={styles.secaoForm}>
                  <h3>📝 Matricular Aluno em Curso</h3>
                  <form onSubmit={handleMatricularAluno} style={styles.form}>
                    <select value={alunoSelecionadoMatricula} onChange={(e) => setAlunoSelecionadoMatricula(e.target.value)} style={styles.input} required>
                      <option value="">-- Selecione o Aluno --</option>
                      {alunos.map((a) => (
                        <option key={a.id} value={a.id}>{a.nome} ({a.matricula})</option>
                      ))}
                    </select>

                    <select value={cursoSelecionadoMatricula} onChange={(e) => setCursoSelecionadoMatricula(e.target.value)} style={styles.input} required>
                      <option value="">-- Selecione o Curso --</option>
                      {cursos.map((c) => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                      ))}
                    </select>

                    <button type="submit" disabled={loading} style={styles.btnAdmin}>{loading ? 'Matriculando...' : 'Confirmar Matrícula'}</button>
                  </form>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <h3>Matrículas Ativas ({matriculas.length})</h3>
                  <table style={styles.tabela}>
                    <thead>
                      <tr>
                        <th style={styles.th}>ALUNO</th>
                        <th style={styles.th}>CURSO</th>
                        <th style={styles.th}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matriculas.map((m) => {
                        const alunoNome = m.alunos?.nome || alunos.find((a) => String(a.id) === String(m.aluno_id))?.nome || '-';
                        const cursoNome = m.cursos?.nome || cursos.find((c) => String(c.id) === String(m.curso_id))?.nome || '-';
                        return (
                          <tr key={m.id}>
                            <td style={styles.td}>{alunoNome}</td>
                            <td style={styles.td}>{cursoNome}</td>
                            <td style={styles.td}><strong>{m.status || 'Cursando'}</strong></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* FICHA DO ALUNO */}
            {alunoDetalhe && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #3b82f6', paddingBottom: '10px' }}>
                    <h2>📜 FICHA DO ALUNO</h2>
                    <button onClick={() => setAlunoDetalhe(null)} style={styles.btnSair}>Fechar ✖</button>
                  </div>

                  <div style={{ display: 'flex', gap: '20px', marginTop: '20px', alignItems: 'center' }}>
                    <img
                      src={alunoDetalhe.foto_url || 'https://via.placeholder.com/150'}
                      alt="Foto 3x4"
                      style={{ width: '105px', height: '140px', objectFit: 'cover', border: '2px solid #3b82f6', borderRadius: '6px' }}
                    />
                    <div>
                      <p style={{ margin: '4px 0' }}><strong>NOME:</strong> {alunoDetalhe.nome}</p>
                      <p style={{ margin: '4px 0' }}><strong>MATRÍCULA:</strong> {alunoDetalhe.matricula}</p>
                      <p style={{ margin: '4px 0' }}><strong>CPF:</strong> {alunoDetalhe.cpf}</p>
                      <p style={{ margin: '4px 0' }}><strong>E-MAIL:</strong> {alunoDetalhe.email}</p>
                      <p style={{ margin: '4px 0' }}><strong>WHATSAPP:</strong> {alunoDetalhe.whatsapp}</p>
                    </div>
                  </div>

                  <h3 style={{ marginTop: '20px', color: '#38bdf8' }}>📚 Cursos Matriculados</h3>
                  <table style={styles.tabela}>
                    <thead>
                      <tr>
                        <th style={styles.th}>CURSO</th>
                        <th style={styles.th}>CARGA H.</th>
                        <th style={styles.th}>NOTA</th>
                        <th style={styles.th}>SITUAÇÃO</th>
                        <th style={styles.th}>AÇÕES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matriculasDoAlunoDetalhe.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ ...styles.td, textAlign: 'center', color: '#94a3b8' }}>
                            Nenhum curso matriculado para este aluno.
                          </td>
                        </tr>
                      ) : (
                        matriculasDoAlunoDetalhe.map((m) => (
                          <tr key={m.id}>
                            <td style={styles.td}><strong>{m.cursoDados?.nome || 'Curso Sem Nome'}</strong></td>
                            <td style={styles.td}>{m.cursoDados?.carga_horaria || '-'}</td>
                            <td style={styles.td}>
                              <input
                                type="number"
                                step="0.1"
                                max="10"
                                min="0"
                                value={m.nota ?? 0}
                                onChange={(e) => handleAtualizarMatricula(m.id, 'nota', e.target.value)}
                                style={{ ...styles.input, width: '60px', padding: '4px' }}
                              />
                            </td>
                            <td style={styles.td}>
                              <select
                                value={m.status || 'Cursando'}
                                onChange={(e) => handleAtualizarMatricula(m.id, 'status', e.target.value)}
                                style={{ ...styles.input, padding: '4px' }}
                              >
                                <option value="Cursando">🟡 Cursando</option>
                                <option value="Concluído">🟢 Concluído</option>
                              </select>
                            </td>
                            <td style={styles.td}>
                              <button
                                onClick={() => handleAbrirVisualizacaoCurso(m)}
                                style={{ ...styles.btnAtualizar, backgroundColor: '#0284c7', padding: '6px 14px', fontWeight: 'bold' }}
                              >
                                👁️ Visualizar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TELA DO CURSO */}
            {cursoVisualizar && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalContentAmpliado}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0284c7', paddingBottom: '12px' }}>
                    <h2 style={{ color: '#38bdf8', margin: 0 }}>📖 TELA DO CURSO - {cursoVisualizar.cursoDados?.nome || 'CURSO'}</h2>
                    <button onClick={() => setCursoVisualizar(null)} style={styles.btnSair}>Fechar ✖</button>
                  </div>

                  <div style={styles.cardDadosAlunoCurso}>
                    <img
                      src={cursoVisualizar.alunoDados?.foto_url || 'https://via.placeholder.com/150'}
                      alt="Foto 3x4"
                      style={{ width: '85px', height: '110px', objectFit: 'cover', borderRadius: '6px', border: '2px solid #38bdf8' }}
                    />
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                      <div><strong>NOME:</strong> {cursoVisualizar.alunoDados?.nome}</div>
                      <div><strong>MATRÍCULA:</strong> {cursoVisualizar.alunoDados?.matricula}</div>
                      <div><strong>CPF:</strong> {cursoVisualizar.alunoDados?.cpf}</div>
                      <div><strong>E-MAIL:</strong> {cursoVisualizar.alunoDados?.email}</div>
                      <div><strong>WHATSAPP:</strong> {cursoVisualizar.alunoDados?.whatsapp}</div>
                      <div><strong>CARGA HORÁRIA:</strong> {cursoVisualizar.cursoDados?.carga_horaria || '40h'}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0', backgroundColor: '#0f172a', padding: '12px 16px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div>
                      <span style={{ fontSize: '14px' }}>Situação Atual: </span>
                      <strong style={{ color: Number(cursoVisualizar.nota) >= 6 || cursoVisualizar.status === 'Concluído' ? '#22c55e' : '#eab308' }}>
                        {Number(cursoVisualizar.nota) >= 6 || cursoVisualizar.status === 'Concluído' ? '🟢 CONCLUÍDO' : '🟡 CURSANDO'}
                      </strong>
                      <span style={{ marginLeft: '16px', fontSize: '14px' }}>Nota: <strong>{cursoVisualizar.nota ?? 0} / 10.0</strong></span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => setEditandoMateriais(!editandoMateriais)}
                        style={{ ...styles.btnAdmin, backgroundColor: '#eab308', color: '#0f172a' }}
                      >
                        {editandoMateriais ? '✖️ Fechar Edição' : '✏️ Atualizar Materiais de Estudo'}
                      </button>

                      <button
                        onClick={handleImprimirCertificado}
                        disabled={!(Number(cursoVisualizar.nota) >= 6 || cursoVisualizar.status === 'Concluído')}
                        style={{
                          ...styles.btnAdmin,
                          backgroundColor: Number(cursoVisualizar.nota) >= 6 || cursoVisualizar.status === 'Concluído' ? '#059669' : '#475569',
                          cursor: Number(cursoVisualizar.nota) >= 6 || cursoVisualizar.status === 'Concluído' ? 'pointer' : 'not-allowed'
                        }}
                      >
                        🎓 Imprimir Certificado
                      </button>
                    </div>
                  </div>

                  {editandoMateriais && (
                    <form onSubmit={handleSalvarMateriais} style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '2px solid #eab308', marginBottom: '16px' }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#eab308' }}>✏️ Edição / Atualização dos Materiais do Curso</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={styles.labelForm}>Título Apostila 1 (PDF):</label>
                          <input type="text" value={materiaisCurso.apostila_titulo} onChange={(e) => setMateriaisCurso({ ...materiaisCurso, apostila_titulo: e.target.value })} style={styles.input} />
                        </div>
                        <div>
                          <label style={styles.labelForm}>URL Apostila 1 (PDF):</label>
                          <input type="url" value={materiaisCurso.apostila_url} onChange={(e) => setMateriaisCurso({ ...materiaisCurso, apostila_url: e.target.value })} style={styles.input} placeholder="https://link-do-pdf.com/arquivo.pdf" />
                        </div>

                        <div>
                          <label style={styles.labelForm}>Título Apostila 2 (PDF):</label>
                          <input type="text" value={materiaisCurso.exercicios_titulo} onChange={(e) => setMateriaisCurso({ ...materiaisCurso, exercicios_titulo: e.target.value })} style={styles.input} />
                        </div>
                        <div>
                          <label style={styles.labelForm}>URL Apostila 2 (PDF):</label>
                          <input type="url" value={materiaisCurso.exercicios_url} onChange={(e) => setMateriaisCurso({ ...materiaisCurso, exercicios_url: e.target.value })} style={styles.input} placeholder="https://link-do-pdf.com/arquivo.pdf" />
                        </div>

                        <div>
                          <label style={styles.labelForm}>URL Vídeo Aula 1 (Módulo 1):</label>
                          <input type="url" value={materiaisCurso.video_1_url} onChange={(e) => setMateriaisCurso({ ...materiaisCurso, video_1_url: e.target.value })} style={styles.input} />
                        </div>
                        <div>
                          <label style={styles.labelForm}>URL Vídeo Aula 2 (Módulo 2):</label>
                          <input type="url" value={materiaisCurso.video_2_url} onChange={(e) => setMateriaisCurso({ ...materiaisCurso, video_2_url: e.target.value })} style={styles.input} />
                        </div>
                      </div>

                      <button type="submit" style={{ ...styles.btnAdmin, width: '100%', marginTop: '12px', backgroundColor: '#059669' }}>
                        💾 Salvar Alterações dos Materiais
                      </button>
                    </form>
                  )}

                  <div style={styles.menuNav}>
                    <button onClick={() => setAbaConteudo('pdfs')} style={abaConteudo === 'pdfs' ? styles.btnNavAtivo : styles.btnNav}>📘 Apostilas & PDFs</button>
                    <button onClick={() => setAbaConteudo('videos')} style={abaConteudo === 'videos' ? styles.btnNavAtivo : styles.btnNav}>🎥 Aulas em Vídeo</button>
                    <button onClick={() => setAbaConteudo('prova')} style={abaConteudo === 'prova' ? styles.btnNavAtivo : styles.btnNav}>📄 Avaliação / Prova</button>
                  </div>

                  <div style={{ maxHeight: '38vh', overflowY: 'auto', paddingRight: '8px' }}>
                    {abaConteudo === 'pdfs' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={styles.cardConteudo}>
                          <h4 style={{ margin: '0 0 6px 0', color: '#38bdf8' }}>📘 {materiaisCurso.apostila_titulo}</h4>
                          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 10px 0' }}>{materiaisCurso.apostila_desc}</p>
                          <a href={materiaisCurso.apostila_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                            <button style={{ ...styles.btnAdmin, backgroundColor: '#0284c7' }}>⏬ Baixar Apostila PDF</button>
                          </a>
                        </div>

                        <div style={styles.cardConteudo}>
                          <h4 style={{ margin: '0 0 6px 0', color: '#38bdf8' }}>📄 {materiaisCurso.exercicios_titulo}</h4>
                          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 10px 0' }}>{materiaisCurso.exercicios_desc}</p>
                          <a href={materiaisCurso.exercicios_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                            <button style={{ ...styles.btnAdmin, backgroundColor: '#0284c7' }}>⏬ Baixar Exercícios PDF</button>
                          </a>
                        </div>
                      </div>
                    )}

                    {abaConteudo === 'videos' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={styles.cardConteudo}>
                          <h4 style={{ margin: '0 0 8px 0' }}>{materiaisCurso.video_1_titulo}</h4>
                          <a href={materiaisCurso.video_1_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={styles.videoPlaceholder}>▶️ Play Video - Aula 01</div>
                          </a>
                        </div>
                        <div style={styles.cardConteudo}>
                          <h4 style={{ margin: '0 0 8px 0' }}>{materiaisCurso.video_2_titulo}</h4>
                          <a href={materiaisCurso.video_2_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={styles.videoPlaceholder}>▶️ Play Video - Aula 02</div>
                          </a>
                        </div>
                      </div>
                    )}

                    {abaConteudo === 'prova' && (
                      <div>
                        <div style={{ backgroundColor: '#0f172a', padding: '14px', borderRadius: '8px', marginBottom: '14px', border: '1px solid #334155' }}>
                          <h4 style={{ margin: 0 }}>📋 Prova Final do Curso (10 Questões)</h4>
                          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                            Obtenha a nota mínima de **6.0** para aprovação.
                          </p>
                        </div>

                        {questoes.map((q) => (
                          <div key={q.id} style={{ ...styles.cardConteudo, marginBottom: '12px' }}>
                            <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>{q.pergunta}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              {q.opcoes.map((opcao, idx) => (
                                <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                                  <input
                                    type="radio"
                                    name={`questao-${q.id}`}
                                    checked={respostasProva[q.id] === idx}
                                    onChange={() => setRespostasProva({ ...respostasProva, [q.id]: idx })}
                                  />
                                  {opcao}
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}

                        <button onClick={handleFinalizarProva} style={{ ...styles.btnAdmin, width: '100%', marginTop: '10px', backgroundColor: '#059669' }}>
                          Enviar Prova e Calcular Nota
                        </button>

                        {resultadoProva && (
                          <div style={{ marginTop: '16px', padding: '14px', borderRadius: '8px', backgroundColor: resultadoProva.aprovado ? '#14532d' : '#7f1d1d' }}>
                            <h4>Resultado: Nota {resultadoProva.nota}.0 / 10.0</h4>
                            <p style={{ fontSize: '13px', margin: '4px 0 0 0' }}>
                              {resultadoProva.aprovado
                                ? '🎉 Parabéns! Você foi aprovado e o Certificado foi liberado para emissão.'
                                : '❌ Sua nota foi inferior a 6.0. Estude o material e refaça a prova.'}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ESTRUTURA DO CERTIFICADO EXCLUSIVA PARA IMPRESSÃO (A4 HORIZONTAL - 2 PÁGINAS) */}
        {cursoVisualizar && (
          <div className="print-only">
            {/* PÁGINA 1: CERTIFICADO */}
            <div style={certStyles.pagina}>
              <div style={certStyles.bordaExterna}>
                <div style={certStyles.bordaInterna}>
                  <h1 style={certStyles.tituloHeader}>MAZZ CURSOS & CAPACITAÇÕES</h1>
                  <h2 style={certStyles.subtituloHeader}>CERTIFICADO DE CONCLUSÃO</h2>

                  <p style={certStyles.textoCertifico}>
                    Certificamos para os devidos fins que o(a) aluno(a):
                  </p>

                  <h3 style={certStyles.nomeAluno}>{cursoVisualizar.alunoDados?.nome || 'NOME COMPLETO DO ALUNO'}</h3>
                  <p style={certStyles.cpfText}>portador(a) do CPF <strong>{cursoVisualizar.alunoDados?.cpf || '000.000.000-00'}</strong></p>

                  <p style={certStyles.textoCorpo}>
                    concluiu com êxito o curso de capacitação profissional em:
                  </p>

                  <h3 style={certStyles.nomeCurso}>{cursoVisualizar.cursoDados?.nome || 'NOME DO CURSO'}</h3>

                  <div style={certStyles.boxInfo}>
                    <div>CARGA HORÁRIA: <strong>{cursoVisualizar.cursoDados?.carga_horaria || '40h'}</strong></div>
                    <div>NOTA OBTIDA: <strong>{cursoVisualizar.nota ?? '10.0'} / 10.0</strong></div>
                    <div>SITUAÇÃO: <strong style={{ color: '#000' }}>APROVADO</strong></div>
                  </div>

                  <p style={certStyles.localData}>
                    CUIABÁ - MT, {dataHoje}
                  </p>

                  <div style={certStyles.linhaAssinatura}>
                    <div style={certStyles.assinatura}>
                      <div style={certStyles.tracoAssinatura}></div>
                      <span>Direção Pedagógica</span>
                      <strong>MAZZ T.I e Capacitação</strong>
                    </div>
                    <div style={certStyles.assinatura}>
                      <div style={certStyles.tracoAssinatura}></div>
                      <span>Data de Emissão</span>
                      <strong>{dataHoje}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PÁGINA 2: HISTÓRICO E DETALHAMENTO */}
            <div style={{ ...certStyles.pagina, pageBreakBefore: 'always' }}>
              <div style={certStyles.bordaExterna}>
                <div style={certStyles.bordaInterna}>
                  <h2 style={certStyles.tituloVerso}>DETALHAMENTO DO CONTEÚDO PROGRAMÁTICO</h2>
                  <p style={{ textAlign: 'center', fontSize: '13px', marginBottom: '20px' }}>
                    Histórico acadêmico e registro de desempenho do aluno.
                  </p>

                  <table style={certStyles.tabelaVerso}>
                    <thead>
                      <tr>
                        <th style={certStyles.thVerso}>MÓDULO / DISCIPLINA</th>
                        <th style={certStyles.thVerso}>STATUS</th>
                        <th style={certStyles.thVerso}>ACOMPANHAMENTO</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={certStyles.tdVerso}>Fundamentos e Conceitos Teóricos Práticos</td>
                        <td style={certStyles.tdVerso}>Concluído</td>
                        <td style={certStyles.tdVerso}>100% de Aprov.</td>
                      </tr>
                      <tr>
                        <td style={certStyles.tdVerso}>Acessibilidade e Usabilidade Aplicada (WCAG)</td>
                        <td style={certStyles.tdVerso}>Concluído</td>
                        <td style={certStyles.tdVerso}>100% de Aprov.</td>
                      </tr>
                      <tr>
                        <td style={certStyles.tdVerso}>Avaliação e Prova Final de Qualificação</td>
                        <td style={certStyles.tdVerso}>Aprovado</td>
                        <td style={certStyles.tdVerso}>Nota {cursoVisualizar.nota ?? '10.0'}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '11px', color: '#555' }}>
                    <p>Registro de Autenticidade Digital: MAZZ-VERIFY-{cursoVisualizar.id}-{Date.now()}</p>
                    <p>Cuiabá - MT, Mato Grosso - Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.cardLaranja}>
        <h2 style={styles.titulo}>🎓 Portal do Aluno</h2>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: '#fff', fontFamily: 'sans-serif' },
  containerAdmin: { minHeight: '100vh', backgroundColor: '#0f172a', padding: '30px 20px', color: '#fff', fontFamily: 'sans-serif' },
  cardLaranja: { backgroundColor: '#1e293b', border: '2px solid #f97316', borderRadius: '12px', padding: '32px', width: '100%', maxWidth: '450px' },
  cardAdmin: { backgroundColor: '#1e293b', border: '2px solid #3b82f6', borderRadius: '12px', padding: '32px', width: '100%', maxWidth: '450px' },
  cardAdminPainel: { backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px', maxWidth: '1050px', margin: '0 auto' },
  headerAdmin: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '15px' },
  menuNav: { display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' },
  btnNav: { backgroundColor: '#0f172a', color: '#94a3b8', border: '1px solid #334155', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  btnNavAtivo: { backgroundColor: '#2563eb', color: '#fff', border: '1px solid #2563eb', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  secaoForm: { backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #334155' },
  gridForm: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  input: { padding: '10px 12px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', fontSize: '14px', width: '100%', boxSizing: 'border-box' },
  labelForm: { fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' },
  btnAdmin: { backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  btnSair: { backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  btnAtualizar: { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer' },
  alertErro: { backgroundColor: '#7f1d1d', color: '#fca5a5', padding: '10px', borderRadius: '6px', marginBottom: '15px' },
  alertSucesso: { backgroundColor: '#14532d', color: '#86efac', padding: '10px', borderRadius: '6px', marginBottom: '15px' },
  tabela: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { textAlign: 'left', padding: '10px', backgroundColor: '#0f172a', fontSize: '12px', color: '#94a3b8' },
  td: { padding: '10px', borderBottom: '1px solid #334155', fontSize: '14px' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 },
  modalContent: { backgroundColor: '#0f172a', border: '2px solid #3b82f6', borderRadius: '12px', padding: '24px', maxWidth: '850px', width: '100%', color: '#fff' },
  modalContentAmpliado: { backgroundColor: '#1e293b', border: '2px solid #0284c7', borderRadius: '12px', padding: '24px', maxWidth: '900px', width: '100%', color: '#fff' },
  cardDadosAlunoCurso: { display: 'flex', gap: '16px', alignItems: 'center', backgroundColor: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #334155', marginTop: '12px' },
  cardConteudo: { backgroundColor: '#0f172a', border: '1px solid #334155', padding: '16px', borderRadius: '8px' },
  videoPlaceholder: { height: '120px', backgroundColor: '#0284c7', borderRadius: '6px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }
};

// ESTILOS DE IMPRESSÃO DO CERTIFICADO (A4 LANDSCAPE)
const certStyles = {
  pagina: { width: '297mm', height: '210mm', padding: '10mm', boxSizing: 'border-box', backgroundColor: '#fff', color: '#111', fontFamily: 'Georgia, serif' },
  bordaExterna: { border: '4px double #1e3a8a', height: '100%', padding: '6mm', boxSizing: 'border-box' },
  bordaInterna: { border: '1px solid #b45309', height: '100%', padding: '20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' },
  tituloHeader: { fontSize: '24px', color: '#1e3a8a', margin: 0, letterSpacing: '2px' },
  subtituloHeader: { fontSize: '18px', color: '#b45309', margin: '4px 0 10px 0', textTransform: 'uppercase' },
  textoCertifico: { fontSize: '14px', color: '#444', margin: '10px 0 4px 0' },
  nomeAluno: { fontSize: '26px', color: '#000', textTransform: 'uppercase', margin: '6px 0', borderBottom: '2px solid #1e3a8a', paddingBottom: '4px', width: '80%' },
  cpfText: { fontSize: '14px', margin: '0 0 10px 0' },
  textoCorpo: { fontSize: '14px', color: '#444', margin: '4px 0' },
  nomeCurso: { fontSize: '22px', color: '#1e3a8a', textTransform: 'uppercase', margin: '8px 0' },
  boxInfo: { display: 'flex', gap: '30px', fontSize: '13px', backgroundColor: '#f8fafc', padding: '8px 20px', borderRadius: '6px', border: '1px solid #cbd5e1', margin: '10px 0' },
  localData: { fontSize: '14px', fontWeight: 'bold', margin: '10px 0' },
  linhaAssinatura: { display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '10px' },
  assinatura: { display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px' },
  tracoAssinatura: { width: '200px', borderTop: '1px solid #000', marginBottom: '4px' },
  tituloVerso: { fontSize: '20px', color: '#1e3a8a', margin: '10px 0' },
  tabelaVerso: { width: '90%', borderCollapse: 'collapse', marginTop: '20px' },
  thVerso: { border: '1px solid #000', padding: '8px', backgroundColor: '#f1f5f9', fontSize: '12px' },
  tdVerso: { border: '1px solid #000', padding: '8px', fontSize: '12px', textAlign: 'center' }
};