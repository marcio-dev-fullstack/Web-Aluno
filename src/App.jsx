import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Validacao from './components/Validacao';

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route.includes('/valida')) {
    return <Validacao />;
  }

  const logado = localStorage.getItem('usuarioLogado');

  return logado ? <Dashboard /> : <Login />;
}