import React, { useState } from "react";
import { 
  FaUsers, 
  FaGraduationCap, 
  FaCheckCircle, 
  FaPlus, 
  FaSearch, 
  FaTrash, 
  FaSignOutAlt, 
  FaUserShield,
  FaTimes,
  FaWhatsapp
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("turmas");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados locais dos dados
  const [turmas, setTurmas] = useState([
    { id: 1, codigo: "ENG-2026-1", nome: "Engenharia Civil - Módulo I", alunos: 24, status: "Ativa" },
    { id: 2, codigo: "GPA-2026-2", nome: "Gestão de Projetos Avançada", alunos: 18, status: "Ativa" },
    { id: 3, codigo: "TIR-2025-4", nome: "Tecnologia da Informação - Redes", alunos: 30, status: "Encerrada" },
  ]);

  const [alunos, setAlunos] = useState([
    { id: 1, nome: "João Silva", email: "joao@email.com", whatsapp: "(11) 99999-8888", turma: "Engenharia Civil - Módulo I", status: "Ativo" },
    { id: 2, nome: "Maria Oliveira", email: "maria@email.com", whatsapp: "(21) 98888-7777", turma: "Gestão de Projetos Avançada", status: "Ativo" },
  ]);

  // Estados dos formulários do Modal
  const [novaTurma, setNovaTurma] = useState({ codigo: "", nome: "", status: "Ativa" });
  const [novoAluno, setNovoAluno] = useState({ nome: "", email: "", whatsapp: "", turma: turmas[0]?.nome || "", status: "Ativo" });

  const handleLogout = () => {
    navigate("/");
  };

  const handleDeletarTurma = (id) => {
    setTurmas(turmas.filter((t) => t.id !== id));
  };

  const handleDeletarAluno = (id) => {
    setAlunos(alunos.filter((a) => a.id !== id));
  };

  // Handler para salvar novo registro
  const handleSalvar = (e) => {
    e.preventDefault();

    if (activeTab === "turmas") {
      if (!novaTurma.codigo || !novaTurma.nome) return alert("Preencha todos os campos!");
      
      const item = {
        id: Date.now(),
        codigo: novaTurma.codigo,
        nome: novaTurma.nome,
        alunos: 0,
        status: novaTurma.status
      };

      setTurmas([...turmas, item]);
      setNovaTurma({ codigo: "", nome: "", status: "Ativa" });
    } else {
      if (!novoAluno.nome || !novoAluno.email || !novoAluno.whatsapp) return alert("Preencha todos os campos obrigatoriamente!");

      const item = {
        id: Date.now(),
        nome: novoAluno.nome,
        email: novoAluno.email,
        whatsapp: novoAluno.whatsapp,
        turma: novoAluno.turma || turmas[0]?.nome || "Sem Turma",
        status: novoAluno.status
      };

      setAlunos([...alunos, item]);
      setNovoAluno({ nome: "", email: "", whatsapp: "", turma: turmas[0]?.nome || "", status: "Ativo" });
    }

    setIsModalOpen(false);
  };

  // Filtros de Busca
  const turmasFiltradas = turmas.filter(
    (t) =>
      t.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const alunosFiltrados = alunos.filter(
    (a) =>
      a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.whatsapp.includes(searchTerm)
  );

  return (
    <div className="admin-container">
      {/* HEADER */}
      <header className="admin-header">
        <div className="admin-logo-title">
          <div className="admin-icon-badge">
            <FaUserShield />
          </div>
          <div>
            <h1 className="admin-title">Painel Administrativo MAZZ</h1>
            <p className="admin-subtitle">Gestão do Portal do Aluno</p>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          <FaSignOutAlt /> Sair
        </button>
      </header>

      {/* CONTEÚDO */}
      <main className="admin-content">
        {/* CARDS DE ESTATÍSTICAS */}
        <div className="stats-grid">
          <div className="stat-card">
            <FaGraduationCap className="stat-icon amber" />
            <div>
              <p className="stat-label">Total de Turmas</p>
              <h3 className="stat-value">{turmas.length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <FaUsers className="stat-icon blue" />
            <div>
              <p className="stat-label">Total de Alunos</p>
              <h3 className="stat-value">{alunos.length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <FaCheckCircle className="stat-icon green" />
            <div>
              <p className="stat-label">Turmas Ativas</p>
              <h3 className="stat-value">
                {turmas.filter((t) => t.status === "Ativa").length}
              </h3>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO POR ABAS */}
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === "turmas" ? "active" : ""}`}
            onClick={() => setActiveTab("turmas")}
          >
            <FaGraduationCap /> Gestão de Turmas
          </button>
          <button
            className={`tab-btn ${activeTab === "alunos" ? "active" : ""}`}
            onClick={() => setActiveTab("alunos")}
          >
            <FaUsers /> Gestão de Alunos
          </button>
        </div>

        {/* BARRA DE AÇÕES */}
        <div className="section-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder={
                activeTab === "turmas"
                  ? "Buscar por nome ou código..."
                  : "Buscar por aluno, e-mail ou WhatsApp..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> {activeTab === "turmas" ? "Nova Turma" : "Novo Aluno"}
          </button>
        </div>

        {/* TABELA DE TURMAS */}
        {activeTab === "turmas" && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome da Turma</th>
                  <th>Alunos Registrados</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {turmasFiltradas.length > 0 ? (
                  turmasFiltradas.map((turma) => (
                    <tr key={turma.id}>
                      <td><strong>{turma.codigo}</strong></td>
                      <td>{turma.nome}</td>
                      <td>{turma.alunos} alunos</td>
                      <td>
                        <span className={`status-badge ${turma.status === "Ativa" ? "active" : "inactive"}`}>
                          {turma.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className="btn-action-delete" onClick={() => handleDeletarTurma(turma.id)} title="Excluir">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", color: "#9ca3af" }}>Nenhuma turma encontrada.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TABELA DE ALUNOS */}
        {activeTab === "alunos" && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>WhatsApp</th>
                  <th>Turma</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunosFiltrados.length > 0 ? (
                  alunosFiltrados.map((aluno) => (
                    <tr key={aluno.id}>
                      <td><strong>{aluno.nome}</strong></td>
                      <td>{aluno.email}</td>
                      <td>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#22c55e" }}>
                          <FaWhatsapp /> {aluno.whatsapp}
                        </span>
                      </td>
                      <td>{aluno.turma}</td>
                      <td>
                        <span className={`status-badge ${aluno.status === "Ativo" ? "active" : "inactive"}`}>
                          {aluno.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className="btn-action-delete" onClick={() => handleDeletarAluno(aluno.id)} title="Excluir">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", color: "#9ca3af" }}>Nenhum aluno encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* MODAL DE CADASTRO */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">
                {activeTab === "turmas" ? "Cadastrar Nova Turma" : "Cadastrar Novo Aluno"}
              </h3>
              <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSalvar}>
              {activeTab === "turmas" ? (
                <>
                  <div className="modal-form-group">
                    <label className="modal-label">Código da Turma</label>
                    <input
                      type="text"
                      placeholder="Ex: ENG-2026-1"
                      className="modal-input"
                      value={novaTurma.codigo}
                      onChange={(e) => setNovaTurma({ ...novaTurma, codigo: e.target.value })}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Nome da Turma / Curso</label>
                    <input
                      type="text"
                      placeholder="Ex: Engenharia Civil - Módulo I"
                      className="modal-input"
                      value={novaTurma.nome}
                      onChange={(e) => setNovaTurma({ ...novaTurma, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Status</label>
                    <select
                      className="modal-select"
                      value={novaTurma.status}
                      onChange={(e) => setNovaTurma({ ...novaTurma, status: e.target.value })}
                    >
                      <option value="Ativa">Ativa</option>
                      <option value="Encerrada">Encerrada</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-form-group">
                    <label className="modal-label">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Ex: Carlos Eduardo"
                      className="modal-input"
                      value={novoAluno.nome}
                      onChange={(e) => setNovoAluno({ ...novoAluno, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">E-mail</label>
                    <input
                      type="email"
                      placeholder="Ex: carlos@email.com"
                      className="modal-input"
                      value={novoAluno.email}
                      onChange={(e) => setNovoAluno({ ...novoAluno, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">WhatsApp (para validação)</label>
                    <input
                      type="tel"
                      placeholder="Ex: (11) 99999-9999"
                      className="modal-input"
                      value={novoAluno.whatsapp}
                      onChange={(e) => setNovoAluno({ ...novoAluno, whatsapp: e.target.value })}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Turma</label>
                    <select
                      className="modal-select"
                      value={novoAluno.turma}
                      onChange={(e) => setNovoAluno({ ...novoAluno, turma: e.target.value })}
                    >
                      {turmas.map((t) => (
                        <option key={t.id} value={t.nome}>
                          {t.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label className="modal-label">Status</label>
                    <select
                      className="modal-select"
                      value={novoAluno.status}
                      onChange={(e) => setNovoAluno({ ...novoAluno, status: e.target.value })}
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                </>
              )}

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}