import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// Rota protegida: se não estiver logado, redireciona para /login
function RotaProtegida({ children }) {
  const autenticado = localStorage.getItem('autenticado') === 'true';
  return autenticado ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <RotaProtegida>
            <Dashboard />
          </RotaProtegida>
        }
      />
      {/* Redireciona a raiz para /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}