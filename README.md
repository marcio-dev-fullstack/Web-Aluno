<div align="center">

# 🎓 Web-Aluno | Portal do Aluno EAD

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.39.8-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deploy-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

<p align="center">
  <b>Interface moderna, responsiva e orientada à experiência do usuário para ecossistemas de Ensino a Distância (EAD).</b>
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#️-instalação">Instalação</a> •
  <a href="#-build-e-deploy">Deploy</a>
</p>

</div>

---

## 📌 Sobre o Projeto

O **Web-Aluno** é a aplicação web frontend que compõe o ecossistema de Ensino a Distância (EAD) do grupo **MGRUPO**.

A aplicação foi desenvolvida com foco em **usabilidade, responsividade, desempenho, organização de código e experiência do usuário (UX)**, oferecendo aos estudantes um ambiente centralizado para acompanhamento da jornada acadêmica.

Por meio do portal, o aluno pode acessar recursos educacionais, acompanhar seu desempenho, visualizar disciplinas e módulos, assistir a conteúdos em vídeo e consultar materiais complementares.

### 🎯 Objetivos

- Centralizar as informações acadêmicas do aluno.
- Disponibilizar uma interface simples e intuitiva.
- Facilitar o acesso a videoaulas e materiais didáticos.
- Permitir o acompanhamento do progresso acadêmico.
- Oferecer uma experiência consistente em computadores, tablets e smartphones.
- Integrar autenticação, banco de dados e armazenamento por meio do Supabase.
- Disponibilizar uma estrutura preparada para evolução contínua do ambiente EAD.

---

## ✨ Funcionalidades

### 🔐 Autenticação e Segurança

- Login integrado ao **Supabase Authentication**.
- Controle de sessão do usuário.
- Proteção de áreas restritas do portal.
- Identificação do perfil do usuário.
- Encerramento seguro da sessão.

### 📊 Dashboard Acadêmico

- Visão geral da situação acadêmica.
- Indicadores de progresso.
- Avisos e informações relevantes.
- Acesso rápido às principais áreas do portal.
- Organização das informações em componentes visuais.

### 🎥 Ambiente de Aprendizagem

- Acesso às videoaulas.
- Organização dos conteúdos por disciplinas e módulos.
- Suporte à apresentação de diferentes tipos de materiais.
- Continuidade da jornada de aprendizagem dentro do portal.

### 📈 Indicadores de Progresso

- Acompanhamento da evolução nas disciplinas.
- Identificação de módulos concluídos.
- Visualização do progresso acadêmico.
- Estrutura preparada para indicadores e métricas adicionais.

### 📱 Responsividade

A interface foi planejada para funcionar em diferentes tamanhos de tela:

- 📱 Smartphones
- 📲 Tablets
- 💻 Notebooks
- 🖥️ Desktops

O layout utiliza **Tailwind CSS** para facilitar a criação de componentes responsivos e consistentes.

---

## 🛠️ Tecnologias

| Categoria | Tecnologia | Versão | Finalidade |
| :--- | :--- | :---: | :--- |
| **Frontend** | React.js | 18.2.0 | Construção da interface da aplicação |
| **Build Tool** | Vite | 5.2.0 | Desenvolvimento e geração do build |
| **Estilização** | Tailwind CSS | 3.4.3 | Desenvolvimento da interface responsiva |
| **Backend / BaaS** | Supabase | 2.39.8 | Autenticação, banco de dados e storage |
| **Banco de Dados** | PostgreSQL | — | Persistência dos dados através do Supabase |
| **Hospedagem** | GitHub Pages | — | Publicação da aplicação |
| **Gerenciamento** | npm | — | Instalação e gerenciamento de dependências |
| **Versionamento** | Git / GitHub | — | Controle de versão e colaboração |

---

## 🏗️ Arquitetura da Aplicação

A aplicação segue uma organização baseada em componentes e separação de responsabilidades, facilitando a manutenção e a evolução do projeto.

```text
Web-Aluno/
├── dist/                         # Arquivos compilados para produção
├── node_modules/                 # Dependências instaladas pelo npm
├── public/                       # Arquivos públicos e recursos estáticos
├── src/                          # Código-fonte principal
│   ├── assets/                   # Imagens, ícones e arquivos estáticos
│   ├── components/               # Componentes reutilizáveis da interface
│   ├── pages/                    # Páginas e telas da aplicação
│   ├── services/                 # Serviços, APIs e integração com Supabase
│   ├── App.jsx                   # Componente raiz da aplicação
│   └── main.jsx                  # Ponto de entrada do React
├── .gitignore                    # Arquivos ignorados pelo Git
├── index.html                    # HTML principal da aplicação
├── package.json                  # Dependências e scripts do projeto
├── package-lock.json             # Versões bloqueadas das dependências
├── postcss.config.js             # Configuração do PostCSS
├── tailwind.config.js            # Configuração do Tailwind CSS
└── vite.config.js                # Configuração do Vite
```

> **Observação:** a estrutura acima representa a organização esperada do projeto. Arquivos ou diretórios adicionais podem existir conforme a evolução da aplicação.

---

## 🔄 Fluxo Geral da Aplicação

```text
                    ┌─────────────────────┐
                    │     Usuário/Aluno   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Interface React   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Autenticação       │
                    │  Supabase Auth      │
                    └──────────┬──────────┘
                               │
                     Sessão autenticada
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Dashboard / Portal  │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
      ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
      │ Disciplinas │   │ Videoaulas  │   │ Materiais   │
      └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Progresso Acadêmico │
                    └─────────────────────┘
```

---

## ⚙️ Configuração do Ambiente

### 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de possuir:

- **Node.js 18.0.0 ou superior**
- **npm**
- **Git**
- Conta/projeto configurado no **Supabase**, quando a aplicação utilizar os serviços de backend.

Verifique as versões instaladas:

```bash
node --version
npm --version
git --version
```

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/marcio-dev-fullstack/Web-Aluno.git
```

### 2. Entre no diretório

```bash
cd Web-Aluno
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Após iniciar o servidor, o Vite exibirá no terminal o endereço local da aplicação.

Normalmente:

```text
http://localhost:5173/
```

Caso o projeto esteja configurado para publicação em um subdiretório, o endereço poderá seguir o padrão:

```text
http://localhost:5173/Web-Aluno/
```

---

## 🔑 Variáveis de Ambiente

Caso o projeto utilize variáveis de ambiente para comunicação com o Supabase, recomenda-se criar um arquivo `.env.local` na raiz do projeto.

Exemplo:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

### ⚠️ Segurança

**Nunca publique chaves privadas, service keys ou credenciais administrativas no frontend.**

Variáveis iniciadas por `VITE_` podem ser incorporadas ao bundle do frontend durante o processo de build. Portanto, somente informações que possam ser expostas ao cliente devem ser utilizadas dessa forma.

Também não versionar arquivos com informações sensíveis:

```text
.env
.env.local
.env.*.local
```

Inclua esses arquivos no `.gitignore` quando necessário.

---

## 🧪 Desenvolvimento

Para iniciar o ambiente de desenvolvimento:

```bash
npm run dev
```

Para executar o build de produção:

```bash
npm run build
```

Para visualizar localmente o resultado do build:

```bash
npm run preview
```

---

## 📦 Scripts NPM

Os scripts disponíveis dependem do conteúdo atual do `package.json`. Em uma configuração padrão do projeto, os comandos principais são:

| Comando | Descrição |
| :--- | :--- |
| `npm install` | Instala as dependências |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Executa uma prévia do build |
| `npm run deploy` | Publica a aplicação no GitHub Pages, se configurado |

---

## 🚀 Build e Deploy

O projeto pode ser publicado no **GitHub Pages** utilizando o pacote `gh-pages`, desde que o script de deploy esteja configurado no `package.json`.

O processo normalmente segue:

```text
Código-fonte
     │
     ▼
npm run build
     │
     ▼
Pasta dist/
     │
     ▼
gh-pages
     │
     ▼
GitHub Pages
     │
     ▼
Aplicação publicada
```

### Publicação

Execute:

```bash
npm run deploy
```

Quando o script estiver configurado com `predeploy`, o processo poderá executar automaticamente:

```bash
npm run build
```

antes da publicação da pasta `dist`.

### Exemplo de configuração no `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

> Use a configuração efetivamente presente no `package.json` do projeto. O exemplo acima serve como referência.

---

## 🌐 GitHub Pages e Base Path

Quando uma aplicação Vite é publicada em um repositório específico do GitHub Pages, normalmente é necessário configurar o `base` no `vite.config.js`.

Exemplo:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Web-Aluno/'
})
```

Com essa configuração, a aplicação poderá ser acessada em:

```text
https://marcio-dev-fullstack.github.io/Web-Aluno/
```

> Caso o projeto seja publicado em domínio personalizado ou em outra estrutura, ajuste o valor de `base` conforme o ambiente de produção.

---

## 🗄️ Supabase

O **Supabase** atua como camada de backend da aplicação, podendo fornecer:

- 🔐 Autenticação de usuários;
- 🗃️ Banco de dados PostgreSQL;
- 📁 Storage para arquivos;
- 🔄 APIs para acesso aos dados;
- 🛡️ Row Level Security (RLS);
- ⚡ Integração com aplicações frontend.

### Estrutura recomendada

```text
React
  │
  ├── Supabase Auth
  │
  ├── Supabase Database
  │
  └── Supabase Storage
```

### Segurança do banco

Quando houver dados acadêmicos ou informações relacionadas aos alunos, recomenda-se utilizar **Row Level Security (RLS)** no PostgreSQL/Supabase, garantindo que cada usuário tenha acesso somente aos dados autorizados para seu perfil.

---

## 🔒 Boas Práticas de Segurança

- Não armazenar senhas diretamente no frontend.
- Não versionar arquivos `.env`.
- Não expor `service_role` ou outras chaves administrativas.
- Utilizar políticas RLS no Supabase.
- Validar permissões no backend/BaaS.
- Controlar corretamente as sessões autenticadas.
- Evitar armazenar informações sensíveis no `localStorage`.
- Manter as dependências atualizadas.
- Revisar permissões e políticas do banco periodicamente.

---

## 📱 Responsividade

A interface utiliza classes utilitárias do Tailwind CSS para adaptar os componentes a diferentes breakpoints.

Exemplo:

```jsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
  {/* Cards acadêmicos */}
</div>
```

A estratégia permite desenvolver uma única interface capaz de atender diferentes dispositivos sem a necessidade de manter versões separadas da aplicação.

---

## 🎨 Interface e UX

O projeto prioriza:

- Hierarquia visual clara;
- Navegação simples;
- Componentização;
- Feedback visual para ações do usuário;
- Layout responsivo;
- Consistência visual;
- Acessibilidade;
- Redução da complexidade de navegação.

---

## 🧩 Componentização

A utilização de componentes React permite separar responsabilidades e reutilizar elementos da interface.

Exemplo conceitual:

```text
components/
├── Header/
├── Sidebar/
├── DashboardCard/
├── VideoPlayer/
├── ProgressBar/
├── CourseCard/
├── Notification/
└── Footer/
```

A estrutura pode variar conforme a implementação atual do projeto.

---

## 📚 Possíveis Evoluções

A arquitetura do projeto permite futuras implementações, como:

- 📝 Sistema de avaliações;
- 📜 Emissão de certificados;
- 📅 Calendário acadêmico;
- 💬 Fórum de alunos;
- 🔔 Sistema avançado de notificações;
- 📥 Download de materiais;
- 📊 Relatórios acadêmicos;
- 🏆 Gamificação;
- 💳 Integração com pagamentos;
- 📱 Progressive Web App (PWA);
- 🌐 Internacionalização (i18n);
- ♿ Melhorias adicionais de acessibilidade;
- 🔎 Busca global no ambiente acadêmico;
- 📈 Analytics de aprendizagem.

---

## 🐛 Solução de Problemas

### Erro ao instalar dependências

Remova a pasta `node_modules` e reinstale:

```bash
rm -rf node_modules
npm install
```

No Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Erro no build

Execute:

```bash
npm run build
```

e verifique a primeira mensagem de erro apresentada pelo Vite.

Também pode ser útil verificar:

```bash
npm install
npm run build
```

### Página em branco no GitHub Pages

Verifique principalmente:

1. Configuração de `base` no `vite.config.js`;
2. URL de publicação;
3. Configuração do GitHub Pages;
4. Arquivos gerados na pasta `dist`;
5. Rotas utilizadas pela aplicação;
6. Configurações do Supabase.

---

## 🌿 Fluxo Git Recomendado

### Verificar alterações

```bash
git status
```

### Adicionar arquivos

```bash
git add .
```

### Criar commit

```bash
git commit -m "Atualiza portal do aluno"
```

### Enviar para o GitHub

```bash
git push origin main
```

### Atualizar o projeto local

```bash
git pull origin main
```

---

## 📌 Versionamento

O projeto utiliza **Git** para controle de versão e **GitHub** para hospedagem do código-fonte.

Recomenda-se utilizar mensagens de commit claras e objetivas, por exemplo:

```text
feat: adiciona dashboard acadêmico
fix: corrige autenticação do aluno
style: ajusta responsividade do portal
refactor: reorganiza componentes
docs: atualiza README
chore: atualiza dependências
```

---

## 👨‍💻 Autor

**Márcio Rodrigues de Oliveira**

- 🎓 Analista de Sistemas & Dev Fullstack
- 📚 Professor Conteudista
- 📱 **WhatsApp:** (65) 99610-8749
- ✉️ **E-mail:** atendimento.mgrupo@gmail.com

### 🔗 Links

- **GitHub:** <a href="https://github.com/marcio-dev-fullstack" target="_blank" rel="noopener noreferrer">https://github.com/marcio-dev-fullstack</a>
- **Portal:** <a href="https://mgrupo.online" target="_blank" rel="noopener noreferrer">https://mgrupo.online</a>

---

## 📄 Licença

Este projeto é de uso **exclusivo e privado** para o ecossistema da plataforma **MGRUPO**.

Todos os direitos reservados.

A utilização, cópia, redistribuição ou modificação do código deve ocorrer somente mediante autorização do responsável pelo projeto.

---

## 🏢 MGRUPO

O **Web-Aluno** integra o ecossistema de soluções digitais voltadas à educação e ao Ensino a Distância.

**MGRUPO — Educação, Tecnologia e Conhecimento.**

---

<div align="center">

### 🎓 Web-Aluno

**Portal do Aluno EAD**

Desenvolvido para oferecer uma experiência acadêmica moderna, acessível e responsiva.

⭐ Se este projeto fizer parte do seu ambiente de desenvolvimento, mantenha o código organizado e documentado.

</div>
