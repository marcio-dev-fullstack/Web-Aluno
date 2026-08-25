// src/cursosData.js

export const curso01Data = {
  id: 1,
  nome: 'Projetos Estruturais em Concreto Armado',
  titulo: 'Projetos Estruturais em Concreto Armado',
  instrutor: 'MÁRCIO OLIVEIRA',
  cargaHoraria: '40h',
  descricao: 'Capacitação completa para elaboração, cálculo e detalhamento de projetos estruturais em concreto armado conforme a NBR 6118/2023.',
  modulos: [
    {
      id: 1,
      titulo: 'Módulo 1: Fundamentos da NBR 6118 e Propriedades dos Materiais (8h)',
      duracao: '8h',
      slides: [
        {
          id: 1,
          titulo: 'Introdução e Conceitos da NBR 6118',
          conteudo: 'Diretrizes essenciais para o projeto de estruturas de concreto armado. Conceitos de segurança estrutural, vida útil do projeto (VUP) e requisitos de durabilidade conforme a classe de agressividade ambiental (CAA I a IV).',
          imagem: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><rect width="100%" height="100%" fill="%230f172a"/><rect x="40" y="40" width="720" height="320" rx="12" fill="%231e293b" stroke="%23334155" stroke-width="2"/><text x="50%" y="35%" dominant-baseline="middle" text-anchor="middle" fill="%2338bdf8" font-family="sans-serif" font-size="26" font-weight="bold">NBR 6118: PROPRIEDADES &amp; DURABILIDADE</text><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23e2e8f0" font-family="sans-serif" font-size="16">Classes de Agressividade Ambiental (CAA I, II, III e IV)</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="14">Cobrimentos Mínimos: 20mm (Piso/Laje) a 45mm (Marinho/Industrial)</text></svg>'
        }
      ],
      exerciciosSubjetivos: [
        'Explique a importância da determinação correta da Classe de Agressividade Ambiental (CAA) na especificação do cobrimento nominal (cnom) da armadura.'
      ],
      exerciciosObjetivos: [
        {
          id: 101,
          pergunta: 'Em ambiente urbano com agressividade média (CAA II), qual o cobrimento nominal mínimo recomendado para vigas e pilares segundo a NBR 6118?',
          opcoes: ['20 mm', '25 mm', '30 mm', '40 mm'],
          correta: 2
        }
      ]
    }
  ],
  provaFinal: [
    {
      id: 1,
      pergunta: 'Qual norma técnica brasileira rege o projeto e dimensionamento de estruturas de concreto no Brasil?',
      opcoes: ['NBR 6118', 'NBR 6122', 'NBR 14931', 'NBR 15575'],
      correta: 0
    }
  ]
};

export const listaVinteCursos = [
  curso01Data,
  { id: 2, nome: 'BIM Aplicado à Engenharia Civil (Revit & Navisworks)', titulo: 'BIM Aplicado à Engenharia Civil (Revit & Navisworks)', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 3, nome: 'Gestão, Planejamento e Controle de Obras (MS Project & Primavera)', titulo: 'Gestão, Planejamento e Controle de Obras (MS Project & Primavera)', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 4, nome: 'Orçamento, Custos e BDI para Obras Civis (SINAPI & ORSE)', titulo: 'Orçamento, Custos e BDI para Obras Civis (SINAPI & ORSE)', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 5, nome: 'Mecânica dos Solos e Engenharia de Fundações', titulo: 'Mecânica dos Solos e Engenharia de Fundações', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 6, nome: 'Patologia, Recuperação e Reforço de Estruturas', titulo: 'Patologia, Recuperação e Reforço de Estruturas', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 7, nome: 'Sistemas Hidrossanitários e Prediais', titulo: 'Sistemas Hidrossanitários e Prediais', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 8, nome: 'Projetos de Instalações Elétricas Prediais (NBR 5410)', titulo: 'Projetos de Instalações Elétricas Prediais (NBR 5410)', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 9, nome: 'Engenharia Rodoviária e Pavimentação Asfáltica', titulo: 'Engenharia Rodoviária e Pavimentação Asfáltica', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 10, nome: 'Estruturas Metálicas e Mistas (NBR 8800)', titulo: 'Estruturas Metálicas e Mistas (NBR 8800)', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 11, nome: 'Drenagem Urbana e Manejo de Águas Pluviais', titulo: 'Drenagem Urbana e Manejo de Águas Pluviais', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 12, nome: 'Segurança do Trabalho na Construção Civil (NR-18)', titulo: 'Segurança do Trabalho na Construção Civil (NR-18)', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 13, nome: 'Norma de Desempenho nas Edificações (NBR 15575)', titulo: 'Norma de Desempenho nas Edificações (NBR 15575)', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 14, nome: 'Topografia, Agrimensura e Georreferenciamento', titulo: 'Topografia, Agrimensura e Georreferenciamento', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 15, nome: 'Perícias, Avaliações de Imóveis e Laudos Técnicos', titulo: 'Perícias, Avaliações de Imóveis e Laudos Técnicos', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 16, nome: 'Licitações e Contratos de Obras Públicas (Lei 14.133/21)', titulo: 'Licitações e Contratos de Obras Públicas (Lei 14.133/21)', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 17, nome: 'Tecnologia do Concreto e Controle Tecnológico', titulo: 'Tecnologia do Concreto e Controle Tecnológico', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 18, nome: 'Sistemas de Combate a Incêndio (PPCI) e Pára-Raios', titulo: 'Sistemas de Combate a Incêndio (PPCI) e Pára-Raios', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 19, nome: 'Construção Aço-Leve e Steel Frame', titulo: 'Construção Aço-Leve e Steel Frame', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] },
  { id: 20, nome: 'Gestão Ambiental e Licenciamento na Construção Civil', titulo: 'Gestão Ambiental e Licenciamento na Construção Civil', instrutor: 'MÁRCIO OLIVEIRA', cargaHoraria: '40h', modulos: [], provaFinal: [] }
];

export default listaVinteCursos;