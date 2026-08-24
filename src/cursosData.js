/**
 * File Name: cursosData.js
 * Description: 
 * Developer: Marcio
 * Created Date: 2026-08-24
 * Last Modified: 2026-08-24
 */

export const curso01Data = {
  id: 1,
  titulo: "Gestão e Planejamento de Obras com MS Project",
  cargaHoraria: "40h",
  instrutor: "Prof. Carlos Silva",
  modulos: [
    {
      id: 1,
      titulo: "Módulo 1: Introdução ao Planejamento e Estruturação de EAP (8h)",
      slides: [
        { id: 1, titulo: "Conceitos Fundamentais de Planejamento", conteudo: "O planejamento de obras é o processo de definir metas, prazos, recursos e métodos executivos para garantir a entrega no prazo e custo contratados.", imagem: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600" },
        { id: 2, titulo: "O Papel do Gerente de Obras", conteudo: "O gestor integra equipes, controla custos, gerencia riscos e garante o cumprimento do escopo utilizando ferramentas dinâmicas de controle.", imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600" },
        { id: 3, titulo: "O que é a EAP (Estrutura Analítica do Projeto)", conteudo: "A EAP/WBS é a decomposição hierárquica e orientada às entregas do trabalho a ser executado pela equipe do projeto.", imagem: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600" },
        { id: 4, titulo: "Decomposição do Escopo em Pacotes de Trabalho", conteudo: "Cada nível da EAP detalha mais o projeto. O menor nível é o pacote de trabalho, onde é possível estimar custos e durações de forma precisa.", imagem: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600" },
        { id: 5, titulo: "Configuração Inicial do MS Project", conteudo: "Ao iniciar o MS Project, é fundamental definir a data de início do projeto, modo de agendamento automático e opções de moeda.", imagem: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600" },
        { id: 6, titulo: "Definindo Calendários de Trabalho na Obra", conteudo: "Crie calendários personalizados considerando turnos de trabalho, folgas de final de semana, feriados e paralisações previstas.", imagem: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600" },
        { id: 7, titulo: "Inserindo Tarefas e Marcos (Milestones)", conteudo: "Marcos são eventos de duração zero que indicam momentos chave, como 'Término da Fundacional' ou 'Habite-se concedido'.", imagem: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600" },
        { id: 8, titulo: "Agrupamento e Hierarquia de Tarefas", conteudo: "Utilize o recurso de recuo de tarefas no MS Project para organizar a estrutura idêntica à EAP aprovada.", imagem: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600" },
        { id: 9, titulo: "Identificação de Riscos no Escopo Inicial", conteudo: "Mapeie antecipadamente os serviços que possuem maior incerteza executiva para prever folgas adequadas no cronograma.", imagem: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600" },
        { id: 10, titulo: "Validação da EAP com a Equipe de Engenharia", conteudo: "A EAP não deve ser feita de forma isolada; valide os prazos e métodos com os mestres de obras e engenheiros de campo.", imagem: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600" }
      ],
      exerciciosSubjetivos: [
        "1. Explique a diferença entre escopo do produto e escopo do projeto na construção civil.",
        "2. Qual a importância do nível de detalhamento da EAP em obras prediais?",
        "3. Descreva como os feriados locais afetam o calendário no MS Project.",
        "4. O que caracteriza um 'Marco' no planejamento e qual sua duração?",
        "5. Como a falta de definição do escopo impacta o custo final da obra?",
        "6. Defina o conceito de Pacote de Trabalho na EAP.",
        "7. Qual a diferença entre tarefas fixas por duração e por trabalho?",
        "8. Como estruturar a EAP para uma obra de pavimentação?",
        "9. Por que não devemos poluir a EAP com tarefas extremamente pequenas?",
        "10. Como alinhar a EAP aos custos do orçamento orçamentário?"
      ],
      exerciciosObjetivos: [
        { id: 1, pergunta: "A EAP é uma ferramenta utilizada para:", opcoes: ["A) Calcular o BDI da obra", "B) Decompor o escopo do projeto em partes menores", "C) Dimensionar vigas de concreto", "D) Emitir a ART do projeto"], correta: 1 },
        { id: 2, pergunta: "Um marco (milestone) no MS Project possui duração de:", opcoes: ["A) 1 dia", "B) 8 horas", "C) Zero dias", "D) 0.5 dias"], correta: 2 },
        { id: 3, pergunta: "O que representa o menor nível de uma EAP?", opcoes: ["A) Fase", "B) Pacote de trabalho", "C) Atividade operacional", "D) Entregável global"], correta: 1 },
        { id: 4, pergunta: "O calendário padrão do MS Project assume quantas horas de trabalho por dia?", opcoes: ["A) 6 horas", "B) 8 horas", "C) 10 horas", "D) 12 horas"], correta: 1 },
        { id: 5, pergunta: "Para agrupar tarefas sob uma etapa principal no MS Project, utiliza-se a opção de:", opcoes: ["A) Vinculação", "B) Indentação (Recuo)", "C) Filtro avançado", "D) Linha de Base"], correta: 1 },
        { id: 6, pergunta: "Qual destas opções NÃO deve constar na EAP?", opcoes: ["A) Serviços de escavação", "B) Lista diária de presença dos operários", "C) Instalação de estrutura metálica", "D) Pintura e acabamento"], correta: 1 },
        { id: 7, pergunta: "O modo de agendamento recomendado no MS Project para evitar erros é:", opcoes: ["A) Agendado Manualmente", "B) Agendado Auto (Automático)", "C) Sem Agendamento", "D) Agendamento Fixo"], correta: 1 },
        { id: 8, pergunta: "A EAP deve ser organizada por:", opcoes: ["A) Ordem alfabética de tarefas", "B) Entregas e fases do projeto", "C) Nome dos fornecedores", "D) Data de pagamento"], correta: 1 },
        { id: 9, pergunta: "Qual o benefício de validar a EAP com a equipe de campo?", opcoes: ["A) Reduzir o imposto da obra", "B) Garantir exequibilidade dos prazos", "C) Dispensar o uso de EPIs", "D) Eliminar a necessidade de projetos"], correta: 1 },
        { id: 10, pergunta: "A sigla WBS significa:", opcoes: ["A) Work Breakdown Structure", "B) Work Building System", "C) Web Base System", "D) Weekly Building Schedule"], correta: 0 }
      ]
    },
    {
      id: 2,
      titulo: "Módulo 2: Sequenciamento, Duração e Vínculos de Tarefas (8h)",
      slides: [
        { id: 1, titulo: "Relacionamentos Lógicos entre Tarefas", conteudo: "Entenda os 4 tipos de dependências: Término-para-Início (TI), Início-para-Início (II), Término-para-Término (TT) e Início-para-Término (IT).", imagem: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600" },
        { id: 2, titulo: "Dependência Término-para-Início (TI)", conteudo: "É o vínculo mais comum na construção. A tarefa B só pode iniciar quando a tarefa A for concluída (Ex: Concretagem após a Forma).", imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600" },
        { id: 3, titulo: "Atrasos e Avanços (Lag e Lead)", conteudo: "O tempo de cura do concreto é um exemplo clássico de Atraso (Lag). A tarefa subsequente aguarda x dias sem consumir trabalho.", imagem: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600" },
        { id: 4, titulo: "Estimativa de Duração de Tarefas", conteudo: "A duração depende da quantidade de serviço e da produtividade da equipe (Ex: $Dura\text{ç}\tilde{a}o = \frac{\text{Quantidade}}{\text{Equipe} \times \text{Produtividade}}$).", imagem: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600" },
        { id: 5, titulo: "Técnica PERT para Estimativas", conteudo: "Calcula a duração esperada usando a fórmula: $TE = \frac{O + 4M + P}{6}$ (Otimista, Mais Provável e Pessimista).", imagem: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600" },
        { id: 6, titulo: "Gráfico de Gantt no MS Project", conteudo: "Visualização em barras horizontais que representa o cronograma no tempo, permitindo identificar interdependências operacionais.", imagem: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600" },
        { id: 7, titulo: "Caminho Crítico (CPM - Critical Path Method)", conteudo: "Sequência de tarefas sem folga que determina a duração total da obra. Qualquer atraso nessas tarefas atrasará a obra.", imagem: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600" },
        { id: 8, titulo: "Identificando Folgas (Livre e Total)", conteudo: "Folga Total é o tempo que uma tarefa pode atrasar sem atrasar a data final do projeto. Folga Livre não afeta a tarefa sucessora.", imagem: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600" },
        { id: 9, titulo: "Restrições de Datas no MS Project", conteudo: "Evite usar restrições como 'Deve Iniciar Em'. Dê preferência por sequenciamentos lógicos para manter o cronograma dinâmico.", imagem: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600" },
        { id: 10, titulo: "Ajuste e Otimização do Cronograma", conteudo: "Realize a compressão do cronograma utilizando técnicas de Crashing (adicionar recursos) ou Fast-Tracking (paralelizar tarefas).", imagem: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600" }
      ],
      exerciciosSubjetivos: [
        "1. Explique a diferença entre dependência Término-para-Início (TI) e Início-para-Início (II).",
        "2. Dê um exemplo prático de aplicação de tempo de Latência (Lag) na construção civil.",
        "3. Como é calculado o tempo esperado na técnica PERT?",
        "4. O que acontece com a data de término da obra se uma tarefa do Caminho Crítico atrasar 2 dias?",
        "5. O que é Folga Livre e como ela difere da Folga Total?",
        "6. Qual o risco de aplicar muitas restrições rígidas de data no MS Project?",
        "7. O que é a técnica de Fast-Tracking no planejamento de obras?",
        "8. Explique o conceito de Crashing e qual seu principal impacto no projeto.",
        "9. Como identificar visualmente o Caminho Crítico no Gráfico de Gantt?",
        "10. Por que a cura do concreto deve ser cadastrada como latência e não como consumo de mão de obra?"
      ],
      exerciciosObjetivos: [
        { id: 1, pergunta: "O vínculo Término-para-Início (TI) significa que:", opcoes: ["A) As tarefas iniciam juntas", "B) A sucessora só inicia após o término da antecessora", "C) As tarefas terminam juntas", "D) A antecessora só inicia quando a sucessora termina"], correta: 1 },
        { id: 2, pergunta: "Qual a consequência de atrasar uma tarefa no Caminho Crítico?", opcoes: ["A) Nenhuma, pois há folga", "B) O custo da obra cai", "C) O término global da obra é adiado", "D) O MS Project fecha automaticamente"], correta: 2 },
        { id: 3, pergunta: "O tempo de espera para cura de uma laje antes da desforma deve ser inserido como:", opcoes: ["A) Nova tarefa com 10 pedreiros", "B) Atraso/Latência (Lag) no vínculo", "C) Restrição de data fixa", "D) Marco de encerramento"], correta: 1 },
        { id: 4, pergunta: "A técnica de comprimir o cronograma paralelizando tarefas que seriam em sequência chama-se:", opcoes: ["A) Crashing", "B) Fast-Tracking", "C) Levelling", "D) Overallocation"], correta: 1 },
        { id: 5, pergunta: "Tarefas com folga total igual a zero pertencem ao:", opcoes: ["A) Escopo secundário", "B) Caminho Crítico", "C) Calendário de folgas", "D) Grupo de riscos leves"], correta: 1 },
        { id: 6, pergunta: "A fórmula da estimativa PERT atribui maior peso para o valor:", opcoes: ["A) Otimista", "B) Pessimista", "C) Mais Provável", "D) Médio simples"], correta: 2 },
        { id: 7, pergunta: "Se a tarefa A tem vínculo II com a tarefa B, significa que:", opcoes: ["A) B termina quando A termina", "B) B inicia quando A inicia", "C) B só inicia após A terminar", "D) A depende do término de B"], correta: 1 },
        { id: 8, pergunta: "A Folga Livre de uma tarefa é o tempo que ela pode atrasar sem:", opcoes: ["A) Atrasar o fim do projeto", "B) Atrasar o início da tarefa sucessora", "C) Aumentar o custo do material", "D) Alterar o calendário geral"], correta: 1 },
        { id: 9, pergunta: "No MS Project, o Caminho Crítico é destacado por padrão na cor:", opcoes: ["A) Azul", "B) Verde", "C) Vermelho", "D) Amarelo"], correta: 2 },
        { id: 10, pergunta: "Adicionar mais operários para reduzir a duração de uma tarefa é a técnica de:", opcoes: ["A) Fast-Tracking", "B) Crashing", "C) Smoothing", "D) Filtering"], correta: 1 }
      ]
    },
    {
      id: 3,
      titulo: "Módulo 3: Alocação de Recursos e Gestão de Custos (8h)",
      slides: [
        { id: 1, titulo: "Tipos de Recursos no MS Project", conteudo: "O programa classifica recursos em três categorias: Trabalho (mão de obra e equipamentos), Material (consumíveis) e Custo (despesas fixas/viagens).", imagem: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600" },
        { id: 2, titulo: "Cadastrando a Planilha de Recursos", conteudo: "Defina taxas padrão (R$/h), taxas de hora extra e custos por uso para cada profissional ou equipamento alocado.", imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600" },
        { id: 3, titulo: "Atribuição de Materiais às Tarefas", conteudo: "Associe materiais como cimento ($m^3$), aço ($kg$) e tijolos ($unid$) com suas respectivas taxas de consumo por tarefa.", imagem: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600" },
        { id: 4, titulo: "Superalocação de Recursos", conteudo: "Ocorre quando um recurso de Trabalho é atribuído a múltiplas tarefas que exigem mais horas do que sua capacidade diária.", imagem: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600" },
        { id: 5, titulo: "Nivelamento de Recursos (Resource Leveling)", conteudo: "Ajusta o cronograma adiando ou dividindo tarefas para resolver superalocações sem exceder a jornada de trabalho.", imagem: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600" },
        { id: 6, titulo: "Tipos de Tarefas: Duração, Trabalho e Unidade Fixa", conteudo: "Compreenda a equação básica: $\text{Trabalho} = \text{Dura}\text{ç}\tilde{a}\text{o} \times \text{Unidades}$. Altere conforme a característica da equipe.", imagem: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600" },
        { id: 7, titulo: "Determinação do Orçamento Base do Projeto", conteudo: "Com recursos e materiais alocados, o MS Project calcula automaticamente o custo total previsto por etapa e global.", imagem: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600" },
        { id: 8, titulo: "Análise de Custo Fixo por Tarefa", conteudo: "Atribua despesas indiretas ou contratações de empreiteiros como custo fixo diretamente no pacote de trabalho.", imagem: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600" },
        { id: 9, titulo: "Curva S Física e Financeira", conteudo: "Representação gráfica do acúmulo de custos/avanços ao longo do tempo. É a ferramenta essencial para o controle executivo.", imagem: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600" },
        { id: 10, titulo: "Fechamento da Linha de Base Financeira", conteudo: "Após aprovar o orçamento e prazos, salve a Linha de Base para registrar a referência oficial de comparação.", imagem: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600" }
      ],
      exerciciosSubjetivos: [
        "1. Diferencie os tipos de recursos 'Trabalho', 'Material' e 'Custo' no MS Project.",
        "2. Como o sistema identifica que um pedreiro está superalocado?",
        "3. O que faz a função Nivelamento de Recursos (Resource Leveling)?",
        "4. Escreva a equação fundamental que relaciona Trabalho, Duração e Unidades.",
        "5. Qual o impacto de marcar uma tarefa como 'Duração Fixa'?",
        "6. Como gerar o gráfico da Curva S financeira no planejamento?",
        "7. O que é a Linha de Base (Baseline) e qual sua importância?",
        "8. Como cadastrar o consumo de cimento por metro cúbico de concretagem?",
        "9. Qual a diferença entre Taxa Padrão e Taxa de Hora Extra?",
        "10. O que ocorre com os custos se aumentarmos a duração de uma tarefa do tipo 'Unidades Fixas'?"
      ],
      exerciciosObjetivos: [
        { id: 1, pergunta: "Cimento, areia e aço são cadastrados no MS Project como recursos do tipo:", opcoes: ["A) Trabalho", "B) Material", "C) Custo", "D) Despesa"], correta: 1 },
        { id: 2, pergunta: "Engenheiros e serventes são cadastrados como recursos do tipo:", opcoes: ["A) Trabalho", "B) Material", "C) Custo", "D) Unidade"], correta: 0 },
        { id: 3, pergunta: "A superalocação ocorre quando um recurso:", opcoes: ["A) Ganha mais que o teto da empresa", "B) Requer mais horas no dia do que as disponíveis no calendário", "C) Fica sem trabalhar por 2 dias", "D) É alocado em tarefas de categorias diferentes"], correta: 1 },
        { id: 4, pergunta: "A equação fundamental do MS Project é:", opcoes: ["A) Custo = Preço x Lucro", "B) Trabalho = Duração x Unidades", "C) Duração = Custo / Pessoas", "D) Folga = Prazo - Trabalho"], correta: 1 },
        { id: 5, pergunta: "A Curva S tem esse nome porque:", opcoes: ["A) É um padrão criado por Steve Jobs", "B) O gráfico acumulado de custos costuma formar uma letra S", "C) Significava 'Systemic Structure'", "D) Mede o solo da fundação"], correta: 1 },
        { id: 6, pergunta: "Para salvar o orçamento oficial aprovado como referência, deve-se salvar a:", opcoes: ["A) Macro do sistema", "B) Linha de Base (Baseline)", "C) Tabela de Filtros", "D) Exportação PDF"], correta: 1 },
        { id: 7, pergunta: "O custo de uma taxa de licença da prefeitura deve ser cadastrado como:", opcoes: ["A) Material", "B) Custo", "C) Trabalho", "D) Equipamento"], correta: 1 },
        { id: 8, pergunta: "Ao aplicar o Nivelamento de Recursos automático, o MS Project pode:", opcoes: ["A) Excluir tarefas", "B) Adiar o início de tarefas com folga", "C) Demitir funcionários", "D) Alterar a taxa horária"], correta: 1 },
        { id: 9, pergunta: "Quantas Linhas de Base o MS Project permite salvar por projeto?", opcoes: ["A) Apenas 1", "B) Até 11", "C) Ilimitadas", "D) Nenhuma"], correta: 1 },
        { id: 10, pergunta: "Se uma tarefa de Duração Fixa tem seu Trabalho aumentado, o que acontece com as Unidades?", opcoes: ["A) Diminuem", "B) Aumentam", "C) Permanecem iguais", "D) Zetam"], correta: 1 }
      ]
    },
    {
      id: 4,
      titulo: "Módulo 4: Acompanhamento, Controle e Medições da Obra (8h)",
      slides: [
        { id: 1, titulo: "Inserção de Dados de Avanço Real", conteudo: "Atualize o cronograma periodicamente inserindo a % Concluída, Duração Real e Duração Restante de cada serviço.", imagem: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600" },
        { id: 2, titulo: "Definição da Data de Status", conteudo: "A Data de Status indica o dia exato do fechamento da medição da obra. Todos os cálculos de desvio usam essa referência.", imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600" },
        { id: 3, titulo: "Comparação: Previsto vs. Realizado", conteudo: "Utilize o modo de exibição 'Gantt de Acompanhamento' para ver visualmente a barra da Linha de Base sob a barra de avanço real.", imagem: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600" },
        { id: 4, titulo: "Análise do Valor Agregado (EVA)", conteudo: "Conceito fundamental que integra escopo, tempo e custo através das variáveis: VP (Valor Planejado), VA (Valor Agregado) e CR (Custo Real).", imagem: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600" },
        { id: 5, titulo: "Índice de Desempenho em Prazos (IDP / SPI)", conteudo: "Calculado por $SPI = \frac{VA}{VP}$. Se $SPI > 1$, a obra está adiantada; se $SPI < 1$, está atrasada.", imagem: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600" },
        { id: 6, titulo: "Índice de Desempenho em Custos (IDC / CPI)", conteudo: "Calculado por $CPI = \frac{VA}{CR}$. Se $CPI > 1$, a obra está abaixo do orçamento (economia); se $CPI < 1$, está estourando custos.", imagem: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600" },
        { id: 7, titulo: "Variação de Prazos e Custos (VPR e VCT)", conteudo: "Avalie em valores monetários o quanto a obra está desviada da referência inicial ($VPR = VA - VP$ e $VCT = VA - CR$).", imagem: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600" },
        { id: 8, titulo: "Reprogramação de Tarefas Atrasadas", conteudo: "Utilize a ferramenta de replanejamento para mover o trabalho não concluído para frente da Data de Status.", imagem: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600" },
        { id: 9, titulo: "Medições de Empreiteiros e Terceirizados", conteudo: "Registre a medição física realizada no campo para liberar pagamentos proporcionais ao progresso validado.", imagem: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600" },
        { id: 10, titulo: "Relatórios de Desempenho Semanais/Mensais", conteudo: "Gere relatórios sintéticos e visuais para diretoria e investidores evidenciando os indicadores chave de desempenho (KPIs).", imagem: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600" }
      ],
      exerciciosSubjetivos: [
        "1. Para que serve a Data de Status no controle de obras?",
        "2. Defina os conceitos de Valor Planejado (VP), Valor Agregado (VA) e Custo Real (CR).",
        "3. Como interpretar um índice $SPI = 0,85$ em uma medição?",
        "4. O que significa um índice $CPI = 1,12$ para o caixa da obra?",
        "5. Qual a diferença entre Gantt Gráfico e Gantt de Acompanhamento?",
        "6. Como reprogramar automaticamente serviços não executados que ficaram no passado em relação à Data de Status?",
        "7. Escreva a fórmula da Variação de Custos (VCT).",
        "8. Por que a % concluída física pode ser diferente da % concluída financeira?",
        "9. Qual a importância do diário de obra na atualização do cronograma?",
        "10. O que deve ser feito se o SPI do Caminho Crítico cair abaixo de 0,80?"
      ],
      exerciciosObjetivos: [
        { id: 1, pergunta: "A Data de Status representa:", opcoes: ["A) A data do término do contrato", "B) O dia de referência da medição do progresso", "C) O dia do pagamento do salário", "D) A data de início do projeto"], correta: 1 },
        { id: 2, pergunta: "Se o SPI (IDP) de uma obra for igual a 1,0, significa que:", opcoes: ["A) A obra está 100% concluída", "B) A obra está exatamente no prazo previsto", "C) A obra está falida", "D) A obra está 10 dias adiantada"], correta: 1 },
        { id: 3, pergunta: "Se o CPI (IDC) for igual a 0,80, conclui-se que:", opcoes: ["A) Para cada R$ 1,00 gasto, agregou-se R$ 0,80 de valor (Estouro de custo)", "B) A obra economizou 20%", "C) A obra terminou adiantada", "D) Os materiais foram comprados com desconto"], correta: 0 },
        { id: 4, pergunta: "A fórmula do SPI é:", opcoes: ["A) VA / CR", "B) VA / VP", "C) VP / CR", "D) CR - VA"], correta: 1 },
        { id: 5, pergunta: "O Valor Agregado (VA) reflete:", opcoes: ["A) O quanto foi gasto no banco", "B) O valor orçado do trabalho efetivamente realizado", "C) O valor total do contrato com a prefeitura", "D) O lucro líquido da construtora"], correta: 1 },
        { id: 6, pergunta: "O gráfico que sobrepõe a Linha de Base e o progresso real é o:", opcoes: ["A) Gantt Simples", "B) Gantt de Acompanhamento", "C) Diagrama de Rede", "D) Quadro Kanban"], correta: 1 },
        { id: 7, pergunta: "Se o valor $VA = R\$ 50.000$ e o $VP = R\$ 50.000$, a Variação de Prazos ($VPR$) é:", opcoes: ["A) R$ 10.000", "B) Zero", "C) R$ -5.000", "D) R$ 100.000"], correta: 1 },
        { id: 8, pergunta: "Para reprogramar tarefas não concluídas para a data atual, utiliza-se a função:", opcoes: ["A) Atualizar Projeto (Update Project)", "B) Salvar Como", "C) Apagar Filtros", "D) Excluir Marcos"], correta: 0 },
        { id: 9, pergunta: "A sigla EVA em gerenciamento de projetos significa:", opcoes: ["A) Enterprise Value Analysis", "B) Earned Value Analysis (Análise do Valor Agregado)", "C) Environment Valuation Act", "D) Earned Velocity Action"], correta: 1 },
        { id: 10, pergunta: "Em uma medição, o Custo Real (CR) é obtido através de:", opcoes: ["A) Estimativas teóricas do MS Project", "B) Notas fiscais e comprovantes de pagamentos efetivados", "C) Média das notas dos alunos", "D) Multiplicação do prazo por 2"], correta: 1 }
      ]
    },
    {
      id: 5,
      titulo: "Módulo 5: Relatórios Avançados, Curvas de Acompanhamento e Dashboards (8h)",
      slides: [
        { id: 1, titulo: "Geração de Relatórios Nativos", conteudo: "O MS Project possui relatórios gráficos internos configuráveis para Visão Geral do Custo, Recursos e Trabalho.", imagem: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600" },
        { id: 2, titulo: "Exportação de Dados para o Excel", conteudo: "Aprenda a exportar tabelas de medição e histogramas de recursos em formato `.xlsx` para tratamentos específicos.", imagem: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600" },
        { id: 3, titulo: "Integração do MS Project com Power BI", conteudo: "Conecte seus arquivos `.mpp` ao Power BI para criar dashboards executivos dinâmicos e automatizados.", imagem: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600" },
        { id: 4, titulo: "Histograma de Mão de Obra", conteudo: "Análise gráfica do pico de operários na obra mês a mês para planejar alojamentos, refeições e EPIs.", imagem: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600" },
        { id: 5, titulo: "Curva S de Trabalho (Homem-Hora)", conteudo: "Acompanhe o consumo acumulado de horas de trabalho ($HH$) para avaliar a produtividade global da obra.", imagem: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600" },
        { id: 6, titulo: "Personalização de Campos e Fórmulas", conteudo: "Crie campos customizados com fórmulas e sinalizadores coloridos (semáforos green/yellow/red) para alertar desvios.", imagem: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600" },
        { id: 7, titulo: "Relatório de Linha de Base vs. Real", conteudo: "Apresente auditorias completas demonstrando onde ocorreram os gargalos executivos no projeto.", imagem: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600" },
        { id: 8, titulo: "Encerramento do Cronograma e Lessons Learned", conteudo: "Ao concluir a obra, arquive a versão final para alimentar o banco de dados de produtividade de futuros projetos.", imagem: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600" },
        { id: 9, titulo: "Apresentação para Stakeholders e Clientes", conteudo: "Formatando visões resumidas e amigáveis para clientes finais que não possuem conhecimento técnico em MS Project.", imagem: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600" },
        { id: 10, titulo: "Boas Práticas e Erros Comuns no MS Project", conteudo: "Resumo das melhores práticas: evitar vínculos manuais quebrados, manter a Data de Status atualizada e não alterar a Baseline sem aditivos.", imagem: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600" }
      ],
      exerciciosSubjetivos: [
        "1. Quais as vantagens de integrar o MS Project ao Power BI para a diretoria da construtora?",
        "2. O que revela um Histograma de Mão de Obra com picos muito elevados e repentinos?",
        "3. Como criar um campo personalizado do tipo 'Semáforo' para indicar tarefas atrasadas?",
        "4. O que mede a Curva S expressa em Homem-Hora (HH)?",
        "5. Qual a importância de registrar as Lições Aprendidas (Lessons Learned) ao fim da obra?",
        "6. Como exportar a tabela de custos de tarefas para o Excel?",
        "7. Por que não se deve alterar a Linha de Base sem formalização de um aditivo contratual?",
        "8. Como apresentar o cronograma de forma simplificada para um cliente leigo?",
        "9. Cite 3 erros comuns cometidos por planejadores iniciantes no MS Project.",
        "10. O que deve conter o relatório final de encerramento do cronograma?"
      ],
      exerciciosObjetivos: [
        { id: 1, pergunta: "O Histograma de Recursos serve para visualizar:", opcoes: ["A) O lucro mensal do engenheiro", "B) A distribuição da carga de trabalho ou quantidade de recursos ao longo do tempo", "C) A espessura das vigas de concreto", "D) O modelo 3D da arquitetura"], correta: 1 },
        { id: 2, pergunta: "Para alertar visualmente os gestores sobre tarefas críticas atrasadas, utiliza-se:", opcoes: ["A) Impressão em papel colorido", "B) Campos Personalizados com Marcadores Gráficos (Semáforos)", "C) Formatação de disco", "D) Exclusão de linhas"], correta: 1 },
        { id: 3, pergunta: "A integração do MS Project com o Power BI é feita através de:", opcoes: ["A) Envio de cartas", "B) Conexão com arquivos .MPP ou bases em nuvem/Excel", "C) Captura de tela por foto", "D) Mensagens de áudio"], correta: 1 },
        { id: 4, pergunta: "As Lições Aprendidas de uma obra servem para:", opcoes: ["A) Aumentar o imposto do próximo ano", "B) Melhorar a precisão de estimativas e processos em projetos futuros", "C) Punir os pedreiros que faltaram", "D) Alterar a planta baixa arquivada"], correta: 1 },
        { id: 5, pergunta: "A Curva S em Homem-Hora (HH) permite controlar:", opcoes: ["A) A produtividade e alocação de equipes de trabalho", "B) A resistência do concreto", "C) O consumo de água na obra", "D) A temperatura do canteiro"], correta: 0 },
        { id: 6, pergunta: "Quando um aditivo de prazo é assinado pelo cliente, o planejador deve:", opcoes: ["A) Excluir o projeto", "B) Salvar uma nova Linha de Base (ex: Baseline 1) referente ao aditivo", "C) Fechar a construtora", "D) Desinstalar o software"], correta: 1 },
        { id: 7, pergunta: "Qual formato nativo de arquivo pertence ao MS Project?", opcoes: ["A) .XLSX", "B) .MPP", "C) .DWG", "D) .PDF"], correta: 1 },
        { id: 8, pergunta: "Um relatório visual executivo deve priorizar:", opcoes: ["A) Todas as 5.000 tarefas detalhadas", "B) Indicadores sintéticos (KPIs), Curva S e prazos de marcos principais", "C) O código-fonte do software", "D) A foto de todos os operários"], correta: 1 },
        { id: 9, pergunta: "Em qual guia do MS Project encontramos a opção de relatórios nativos?", opcoes: ["A) Tarefa", "B) Exibir", "C) Relatório", "D) Formato"], correta: 2 },
        { id: 10, pergunta: "A principal regra ao finalizar o acompanhamento da obra é:", opcoes: ["A) Garantir que todas as tarefas concluídas tenham 100% de avanço e datas reais inseridas", "B) Apagar todos os custos", "C) Deixar as tarefas em aberto", "D) Alterar o nome dos alunos"], correta: 0 }
      ]
    }
  ],
  provaFinal: [
    { id: 1, pergunta: "1. A Estrutura Analítica do Projeto (EAP) tem como finalidade principal:", opcoes: ["A) Calcular o BDI e os impostos incidentes sobre a obra", "B) Decompor o escopo total do projeto em partes menores e gerenciáveis", "C) Realizar o dimensionamento estrutural dos elementos de concreto", "D) Emitir a Anotação de Responsabilidade Técnica (ART)"], correta: 1 },
    { id: 2, pergunta: "2. No MS Project, um Marco (Milestone) é definido como uma atividade que possui:", opcoes: ["A) Duração fixa de 1 dia de trabalho", "B) Duração de 8 horas e consumo de materiais", "C) Duração igual a zero e representa um evento chave", "D) Custo fixo atrelado obrigatoriamente a um empreiteiro"], correta: 2 },
    { id: 3, pergunta: "3. O Caminho Crítico (CPM) de um cronograma de obra representa:", opcoes: ["A) A sequência de tarefas de menor custo financeiro", "B) A sequência de tarefas sem folga que determina a duração total da obra", "C) O conjunto de tarefas executadas exclusivamente por subempreiteiros", "D) As tarefas que possuem folga livre superior a 30 dias"], correta: 1 },
    { id: 4, pergunta: "4. Qual a consequência de ocorrer um atraso de 3 dias em uma tarefa pertencente ao Caminho Crítico?", opcoes: ["A) Nenhum impacto, pois o sistema absorve o atraso automaticamente", "B) A data de término global da obra será adiada em exatos 3 dias", "C) O custo com materiais será reduzido proporcionalmente", "D) A Linha de Base será atualizada sem autorização"], correta: 1 },
    { id: 5, pergunta: "5. Na alocação de recursos, materiais como concreto ($m^3$) e aço ($kg$) são cadastrados como:", opcoes: ["A) Recursos do tipo Trabalho", "B) Recursos do tipo Material", "C) Recursos do tipo Custo", "D) Recursos do tipo Despesa Fixa"], correta: 1 },
    { id: 6, pergunta: "6. A superalocação de um recurso do tipo Trabalho ocorre quando:", opcoes: ["A) O recurso recebe um salário superior à média de mercado", "B) O recurso é demandado por mais horas do que sua capacidade disponível no período", "C) O recurso trabalha em duas obras de empresas diferentes", "D) O material é estocado em quantidade excessiva no canteiro"], correta: 1 },
    { id: 7, pergunta: "7. A Linha de Base (Baseline) do MS Project deve ser salva quando:", opcoes: ["A) O planejamento, custos e prazos forem aprovados antes do início da execução", "B) A obra estiver 50% concluída para corrigir os erros do planejador", "C) Ocorrer a entrega final das chaves aos proprietários", "D) O software solicitar a atualização da licença"], correta: 0 },
    { id: 8, pergunta: "8. A Data de Status em um processo de controle de obras representa:", opcoes: ["A) A data limite para o pagamento do financiamento bancário", "B) O dia de corte/referência adotado para medir o progresso real da obra", "C) A data em que o software foi instalado no computador", "D) A data de emissão do alvará de construção"], correta: 1 },
    { id: 9, pergunta: "9. Na Análise do Valor Agregado (EVA), a variável Valor Agregado (VA) expressa:", opcoes: ["A) O valor total das notas fiscais pagas aos fornecedores no período", "B) O valor orçado correspondente ao trabalho efetivamente realizado na obra", "C) O valor total do contrato de compra e venda do imóvel", "D) A margem de lucro estimada pela construtora"], correta: 1 },
    { id: 10, pergunta: "10. Se em uma medição o Índice de Desempenho em Prazos ($SPI$) for igual a 0,85, conclui-se que:", opcoes: ["A) A obra está adiantada em relação ao cronograma previsto", "B) A obra está executando o projeto com ritmo mais lento do que o planejado (atrasada)", "C) O custo da obra está 15% abaixo do orçamento inicial", "D) Todos os operários estão trabalhando em ritmo acelerado"], correta: 1 },
    { id: 11, pergunta: "11. Se em uma medição o Índice de Desempenho em Custos ($CPI$) for igual a 1,15, conclui-se que:", opcoes: ["A) A obra está estourando o orçamento em 15%", "B) A obra está sendo executada com economia de custos em relação ao valor agregado", "C) Os salários dos engenheiros foram reduzidos em 15%", "D) O prazo final da obra foi estendido"], correta: 1 },
    { id: 12, pergunta: "12. A técnica de compressão de cronograma denominada Fast-Tracking consiste em:", opcoes: ["A) Adicionar mais trabalhadores para acelerar uma tarefa executada em sequência", "B) Realizar em paralelo tarefas que originalmente seriam executadas em sequência", "C) Reduzir a qualidade dos materiais para acelerar a cura", "D) Excluir o controle de qualidade do canteiro"], correta: 1 },
    { id: 13, pergunta: "13. O tempo de cura do concreto deve ser inserido no MS Project como:", opcoes: ["A) Uma tarefa com alocação de 10 pedreiros", "B) Um tempo de atraso/latência (Lag) no vínculo de dependência", "C) Um custo fixo de R$ 1.000,00", "D) Uma restrição de data do tipo 'Deve Terminar Em'"], correta: 1 },
    { id: 14, pergunta: "14. A fórmula simplificada da estimativa PERT para calcular a duração esperada é:", opcoes: ["A) $TE = \frac{O + M + P}{3}$", "B) $TE = \frac{O + 4M + P}{6}$", "C) $TE = O + 2M + P$", "D) $TE = \frac{P - O}{2}$"], correta: 1 },
    { id: 15, pergunta: "15. A Curva S é uma representação gráfica essencial no planejamento porque mostra:", opcoes: ["A) A topografia e o perfil do terreno da obra", "B) O acúmulo de custos ou de progresso físico ao longo do tempo", "C) A variação diária da temperatura no canteiro", "D) O fluxo de veículos na entrada da obra"], correta: 1 },
    { id: 16, pergunta: "16. A Folga Total de uma tarefa é o tempo que ela pode atrasar sem:", opcoes: ["A) Aumentar a taxa de hora extra da equipe", "B) Atrasar a data de término final do projeto", "C) Atrasar o início da tarefa imediatamente sucessora", "D) Alterar a cor das barras do Gráfico de Gantt"], correta: 1 },
    { id: 17, pergunta: "17. A funcionalidade Nivelamento de Recursos (Resource Leveling) do MS Project atua:", opcoes: ["A) Demitindo recursos superalocados para economizar custos", "B) Resolvendo superalocações de trabalho ao adiar ou dividir tarefas com folga", "C) Aumentando automaticamente o valor das horas extras dos funcionários", "D) Comprando mais materiais no mercado"], correta: 1 },
    { id: 18, pergunta: "18. Na relação de dependência Início-para-Início (II) entre as tarefas A e B:", opcoes: ["A) A tarefa B só pode iniciar quando a tarefa A for concluída", "B) A tarefa B só pode iniciar quando a tarefa A tiver início", "C) As duas tarefas devem obrigatoriamente terminar no mesmo instante", "D) A tarefa A depende do término da tarefa B"], correta: 1 },
    { id: 19, pergunta: "19. O Histograma de Mão de Obra é uma ferramenta gráfica utilizada para:", opcoes: ["A) Medir a espessura da camada de revestimento", "B) Visualizar a distribuição do número de trabalhadores ao longo dos meses da obra", "C) Calcular o consumo de energia elétrica dos equipamentos", "D) Registrar as advertências aplicadas aos operários"], correta: 1 },
    { id: 20, pergunta: "20. Quando um aditivo contratual aprova um novo prazo e valor para a obra, o planejador deve:", opcoes: ["A) Excluir o arquivo original do MS Project", "B) Salvar uma nova versão da Linha de Base (Baseline) para o escopo aditivado", "C) Continuar comparando com a Linha de Base antiga sem alterações", "D) Zerar o avanço de todas as tarefas executadas"], correta: 1 }
  ]
};