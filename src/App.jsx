/**
 * Aplicação Web-Aluno - Painel / Certificado
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mapeamento de Elementos do DOM
    const btnAdmin = document.getElementById('btnAdmin');
    const btnImprimir = document.getElementById('btnImprimir');
    const btnSair = document.getElementById('btnSair');

    // 2. Registro de Eventos nos Botões

    // Ação do Botão Imprimir / PDF
    if (btnImprimir) {
        btnImprimir.addEventListener('click', () => {
            window.print();
        });
    }

    // Ação do Botão Painel Admin
    if (btnAdmin) {
        btnAdmin.addEventListener('click', () => {
            // Redireciona para a rota de admin usando Hash
            window.location.hash = '#/admin';
            navegarPara('/admin');
        });
    }

    // Ação do Botão Sair
    if (btnSair) {
        btnSair.addEventListener('click', () => {
            const confirmar = confirm("Deseja realmente sair da sessão?");
            if (confirmar) {
                // Limpa dados de sessão se houver
                localStorage.removeItem('usuarioLogado');
                // Redireciona para a tela inicial/login
                window.location.hash = '#/login';
                alert("Sessão encerrada com sucesso.");
            }
        });
    }

    // 3. Sistema Simples de Roteamento (Hash Router)
    function navegarPara(rota) {
        switch (rota) {
            case '/admin':
                console.log("Navegando para o Painel Admin...");
                // Aqui você pode alternar a exibição de div's ou carregar o módulo de admin
                break;
            case '/login':
                console.log("Navegando para a Tela de Login...");
                break;
            default:
                console.log("Exibindo Certificado...");
                break;
        }
    }

    // Escuta alterações diretas na URL (#/admin, #/login)
    window.addEventListener('hashchange', () => {
        const rotaAtual = window.location.hash.replace('#', '') || '/';
        navegarPara(rotaAtual);
    });

    // Executa a verificação da rota ao carregar a página
    const rotaInicial = window.location.hash.replace('#', '') || '/';
    navegarPara(rotaInicial);
});