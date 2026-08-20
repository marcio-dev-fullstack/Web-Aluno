import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !pin) {
      return alert("Preencha o e-mail e a senha!");
    }

    if (!/^\d{4}$/.test(pin) && email !== "admin@admin.com") {
      return alert("A senha de acesso do aluno deve conter 4 dígitos numéricos!");
    }

    if (email === "admin@admin.com" || email === "admin@mazz.com") {
      navigate("/admin/dashboard");
    } else {
      navigate("/aluno/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon-badge">
            <FaGraduationCap />
          </div>
          <h2>Portal do Aluno</h2>
          <p className="login-subtitle">Acesse sua conta para visualizar suas disciplinas</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>E-mail institucional / pessoal</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Senha de Acesso (4 números)</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                maxLength="4"
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-login">
            <span>Entrar no Sistema</span>
            <FaSignInAlt />
          </button>
        </form>
      </div>
    </div>
  );
}