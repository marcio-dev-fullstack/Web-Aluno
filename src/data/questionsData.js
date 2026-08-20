/**
 * File Name: questionsData.js
 * Description: 
 * Developer: Unknown Developer
 * Created Date: 2026-08-18
 * Last Modified: 2026-08-18
 */

// Gerador de questões objetivas (20 questões por disciplina)
export const questionsDatabase = {
  // 1. CÁLCULO I
  1: Array.from({ length: 20 }, (_, index) => {
    const qNum = index + 1;
    return {
      id: qNum,
      enunciado: `[Cálculo I - Q${qNum}] Qual é o resultado do limite lim(x->${qNum}) f(x) considerando a função de continuidade contínua?`,
      opcoes: [
        { letra: "A", texto: `Valor igual a ${qNum * 2}`, correta: true },
        { letra: "B", texto: `Valor igual a ${qNum * 3 - 1}`, correta: false },
        { letra: "C", texto: `Valor indefinido / Infinito`, correta: false },
        { letra: "D", texto: `Valor igual a zero`, correta: false }
      ]
    };
  }),

  // 2. GEOMETRIA ANALÍTICA
  2: Array.from({ length: 20 }, (_, index) => {
    const qNum = index + 1;
    return {
      id: qNum,
      enunciado: `[Geometria Analítica - Q${qNum}] Dado o vetor V = (${qNum}, ${qNum + 2}, 0) no R3, assinale a alternativa referente ao seu produto escalar:`,
      opcoes: [
        { letra: "A", texto: `Vetor nulo de dimensão zero`, correta: false },
        { letra: "B", texto: `Resultado do produto é ${qNum + 5}`, correta: true },
        { letra: "C", texto: `Ortogonalidade com norma negativa`, correta: false },
        { letra: "D", texto: `Projeção paralela ao plano Z`, correta: false }
      ]
    };
  }),

  // 3. FÍSICA GERAL I
  3: Array.from({ length: 20 }, (_, index) => {
    const qNum = index + 1;
    return {
      id: qNum,
      enunciado: `[Física I - Q${qNum}] Um corpo de massa M desloca-se sob ação de uma força constante de ${qNum * 10}N. Qual a aceleração resultante?`,
      opcoes: [
        { letra: "A", texto: `Aceleração escalar nula`, correta: false },
        { letra: "B", texto: `Trajetória parabólica sem atrito`, correta: false },
        { letra: "C", texto: `Aceleração proporcional à 2ª Lei de Newton: ${qNum * 2} m/s²`, correta: true },
        { letra: "D", texto: `Velocidade constante em repouso`, correta: false }
      ]
    };
  }),

  // 4. INTRODUÇÃO À ENGENHARIA
  4: Array.from({ length: 20 }, (_, index) => {
    const qNum = index + 1;
    return {
      id: qNum,
      enunciado: `[Engenharia - Q${qNum}] De acordo com o código de ética profissional e gestão de projetos (Questão ${qNum}), assinale a conduta correta:`,
      opcoes: [
        { letra: "A", texto: `Aprovação técnica conforme diretrizes das normas ABNT/CONFEA`, correta: true },
        { letra: "B", texto: `Execução sem responsabilidade técnica (ART)`, correta: false },
        { letra: "C", texto: `Desconsiderar impacto ambiental regional`, correta: false },
        { letra: "D", texto: `Uso de insumos fora das especificações mínimas`, correta: false }
      ]
    };
  })
};