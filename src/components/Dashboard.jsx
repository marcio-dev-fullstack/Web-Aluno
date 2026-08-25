import { cursosIniciais } from '../data/cursosIniciais';

// No componente Dashboard:
const [cursos, setCursos] = useState(() => {
  const salvos = localStorage.getItem('cursos_mazz');
  return salvos ? JSON.parse(salvos) : cursosIniciais;
});