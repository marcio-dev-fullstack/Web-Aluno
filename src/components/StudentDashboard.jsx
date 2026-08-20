import React, { useState } from "react";
import { 
  FaGraduationCap, 
  FaBook, 
  FaCalendarAlt, 
  FaSignOutAlt, 
  FaUserGraduate,
  FaCheckCircle,
  FaFileAlt,
  FaTimes,
  FaClock,
  FaChalkboardTeacher,
  FaBullseye,
  FaPen,
  FaExclamationTriangle,
  FaCheck
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { questionsDatabase } from "../data/questionsData";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [aluno] = useState({
    nome: "Carlos Eduardo",
    email: "carlos@email.com",
    turma: "Engenharia Civil - Módulo I",
    codigoTurma: "ENG-2026-1"
  });

  const [disciplinas, setDisciplinas] = useState([
    { 
      id: 1, 
      nome: "Cálculo I", 
      professor: "Prof. Dr. Ricardo Silva", 
      cargaHoraria: "80h", 
      horarios: "Sábados, 08:00 - 12:00",
      acertos: 16, 
      status: "Aprovado",
      tentativasUsadas: 0,
      tentativasMax: 10,
      ementa: "Funções, limites, continuidade, derivadas e noções de integração aplicada.",
    },
    { 
      id: 2, 
      nome: "Geometria Analítica", 
      professor: "Profa. Dra. Ana Souza", 
      cargaHoraria: "60h", 
      horarios: "Sextas, 19:00 - 22:00",
      acertos: 10, 
      status: "Reprovado",
      tentativasUsadas: 1,
      tentativasMax: 10,
      ementa: "Vetores no R2 e R3, produto escalar e vetorial, estudo da reta e do plano.",
    },
    { 
      id: 3, 
      nome: "Física Geral I", 
      professor: "Prof. Me. Marcos Lima", 
      cargaHoraria: "80h", 
      horarios: "Quintas, 19:00 - 22:00",
      acertos: 18, 
      status: "Aprovado",
      tentativasUsadas: 0,
      tentativasMax: 10,
      ementa: "Mecânica clássica, leis de Newton, trabalho e energia.",
    },
    { 
      id: 4, 
      nome: "Introdução à Engenharia", 
      professor: "Profa. Carla Mendes", 
      cargaHoraria: "40h", 
      horarios: "Quartas, 19:00 - 21:00",
      acertos: 20, 
      status: "Aprovado",
      tentativasUsadas: 0,
      tentativasMax: 10,
      ementa: "Histórico da engenharia, atribuições profissionais, ética e projetos.",
    }
  ]);

  // Modais
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [activeExamDiscipline, setActiveExamDiscipline] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [filterStatus, setFilterStatus] = useState("Todos");

  const handleLogout = () => navigate("/");

  // Abrir aplicação da prova
  const handleOpenExam = (disc) => {
    if (disc.status === "Reprovado" && disc.tentativasUsadas >= disc.tentativasMax) {
      return alert("Você atingiu o limite máximo de 10 tentativas para esta disciplina!");
    }
    setActiveExamDiscipline(disc);
    setUserAnswers({});
  };

  // Selecionar alternativa
  const handleSelectOption = (questionId, optionLetter) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionLetter }));
  };

  // Submeter Prova e Calcular Nota Final
  const handleSubmitExam = (e) => {
    e.preventDefault();
    const questions = questionsDatabase[activeExamDiscipline.id] || [];
    
    if (Object.keys(userAnswers).length < questions.length) {
      if (!window.confirm("Você ainda não respondeu todas as 20 questões. Deseja finalizar assim mesmo?")) {
        return;
      }
    }

    let totalAcertos = 0;
    questions.forEach(q => {
      const correctOption = q.opcoes.find(o => o.correta)?.letra;
      if (userAnswers[q.id] === correctOption) {
        totalAcertos++;
      }
    });

    const notaFinal = totalAcertos * 0.5;
    const aprovado = notaFinal >= 6.0;

    setDisciplinas(disciplinas.map(d => {
      if (d.id === activeExamDiscipline.id) {
        return {
          ...d,
          acertos: totalAcertos,
          status: aprovado ? "Aprovado" : "Reprovado",
          tentativasUsadas: d.status === "Reprovado" || !aprovado ? d.tentativasUsadas + 1 : d.tentativasUsadas
        };
      }
      return d;
    }));

    alert(`Prova Finalizada!\nAcertos: ${totalAcertos} de 20\nNota Final: ${notaFinal.toFixed(1)}\nStatus: ${aprovado ? "APROVADO 🎉" : "REPROVADO ⚠️"}`);
    setActiveExamDiscipline(null);
  };

  const mediaGeral = (disciplinas.reduce((acc, curr) => acc + (curr.acertos * 0.5), 0) / disciplinas.length).toFixed(1);

  const disciplinasFiltradas = disciplinas.filter(d => {
    if (filterStatus === "Aprovado") return d.status === "Aprovado";
    if (filterStatus === "Reprovado") return d.status === "Reprovado";
    return true;
  });

  return (
    <div className="student-container">
      <header className="student-header">
        <div className="student-logo-title">
          <div className="student-icon-badge"><FaUserGraduate /></div>
          <div>
            <h1 className="student-title">Portal do Aluno MAZZ</h1>
            <p className="student-subtitle">{aluno.turma} ({aluno.codigoTurma})</p>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}><FaSignOutAlt /> Sair</button>
      </header>

      <main className="student-content">
        <div className="welcome-card">
          <h2>Bem-vindo(a), {aluno.nome}! 👋</h2>
          <p>
            Provas Objetivas Automáticas (20 questões de A a D - Peso 0,5). Média de aprovação: <strong>6,0 (12 acertos)</strong>. Em caso de reprovação, você possui até <strong>10 tentativas</strong> para refazer.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <FaBook className="stat-icon blue" />
            <div><p className="stat-label">Disciplinas</p><h3 className="stat-value">{disciplinas.length}</h3></div>
          </div>
          <div className="stat-card">
            <FaCheckCircle className="stat-icon green" />
            <div><p className="stat-label">Média Geral</p><h3 className="stat-value">{mediaGeral} / 10.0</h3></div>
          </div>
          <div className="stat-card">
            <FaCalendarAlt className="stat-icon amber" />
            <div><p className="stat-label">Frequência</p><h3 className="stat-value">93.7%</h3></div>
          </div>
        </div>

        <div className="disciplines-header-actions">
          <div className="section-title-box"><FaGraduationCap /> <h3>Minhas Disciplinas</h3></div>
          <div className="filter-buttons">
            <button className={`filter-btn ${filterStatus === "Todos" ? "active" : ""}`} onClick={() => setFilterStatus("Todos")}>Todas ({disciplinas.length})</button>
            <button className={`filter-btn ${filterStatus === "Aprovado" ? "active" : ""}`} onClick={() => setFilterStatus("Aprovado")}>Aprovadas ({disciplinas.filter(d => d.status === "Aprovado").length})</button>
            <button className={`filter-btn ${filterStatus === "Reprovado" ? "active" : ""}`} onClick={() => setFilterStatus("Reprovado")}>Reprovadas ({disciplinas.filter(d => d.status === "Reprovado").length})</button>
          </div>
        </div>

        <div className="disciplines-grid">
          {disciplinasFiltradas.map((disc) => {
            const notaFinal = (disc.acertos * 0.5).toFixed(1);
            const isApproved = disc.status === "Aprovado";
            return (
              <div key={disc.id} className={`discipline-card ${!isApproved ? "card-reproved" : ""}`}>
                <div>
                  <div className="discipline-header">
                    <h4>{disc.nome}</h4>
                    <span className={`status-tag ${isApproved ? "approved" : "reproved"}`}>{disc.status}</span>
                  </div>
                  <p className="professor-name"><FaChalkboardTeacher /> {disc.professor}</p>
                  <div className="discipline-info">
                    <div><span className="info-label">Acertos</span><span className="info-value">{disc.acertos} / 20</span></div>
                    <div><span className="info-label">Nota</span><span className={`info-value ${isApproved ? "highlight-green" : "highlight-red"}`}>{notaFinal}</span></div>
                    <div><span className="info-label">Aprovação</span><span className="info-value">≥ 6.0</span></div>
                  </div>
                  {!isApproved && (
                    <div className="retake-alert-box">
                      <FaExclamationTriangle />
                      <span>Tentativa: <strong>{disc.tentativasUsadas} de {disc.tentativasMax} usadas</strong></span>
                    </div>
                  )}
                </div>
                <div className="card-actions">
                  <button className={`btn-secondary-card ${!isApproved ? "btn-redo-highlight" : ""}`} onClick={() => handleOpenExam(disc)}>
                    <FaPen /> {!isApproved ? "Refazer Prova (20Q)" : "Realizar / Refazer Prova"}
                  </button>
                  <button className="btn-primary-card" onClick={() => setSelectedDiscipline(disc)}><FaFileAlt /> Plano</button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* MODAL DE APLICAÇÃO DA PROVA (20 QUESTÕES A, B, C, D) */}
      {activeExamDiscipline && (
        <div className="modal-overlay">
          <div className="modal-card exam-modal-large">
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Prova Oficial: {activeExamDiscipline.nome}</h3>
                <p className="exam-subtitle-modal">20 Questões Objetivas | Valor: 0.5 por questão | Média mínima: 6.0</p>
              </div>
              <button className="btn-close-modal" onClick={() => setActiveExamDiscipline(null)}><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmitExam}>
              <div className="exam-questions-scroll">
                {(questionsDatabase[activeExamDiscipline.id] || []).map((q, idx) => (
                  <div key={q.id} className="question-item-card">
                    <p className="question-title"><strong>Questão {idx + 1}:</strong> {q.enunciado}</p>
                    <div className="options-grid">
                      {q.opcoes.map(op => {
                        const isSelected = userAnswers[q.id] === op.letra;
                        return (
                          <div 
                            key={op.letra} 
                            className={`option-box ${isSelected ? "selected" : ""}`}
                            onClick={() => handleSelectOption(q.id, op.letra)}
                          >
                            <span className="option-badge">{op.letra}</span>
                            <span className="option-text">{op.texto}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-footer exam-footer">
                <div className="exam-progress-counter">
                  Respondidas: <strong>{Object.keys(userAnswers).length} / 20</strong>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button type="button" className="btn-secondary" onClick={() => setActiveExamDiscipline(null)}>Cancelar</button>
                  <button type="submit" className="btn-primary btn-submit-exam"><FaCheck /> Finalizar e Entregar Prova</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}