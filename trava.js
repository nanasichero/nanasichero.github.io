// 🔑 SENHA CONFIGURADA
const SENHA_CORRETA = 'nanasichero'; 

function verificarSenha() {
    const senhaDigitada = prompt('🔒 Esta é uma central protegida.\nDigite a senha de acesso:');

    if (senhaDigitada === SENHA_CORRETA) {
        // Atualiza o texto abaixo da animação enquanto busca os dados
        const textElement = document.querySelector('#loading .message');
        if (textElement) {
            textElement.textContent = 'Carregando projetos do GitHub...';
        }
        
        if (typeof iniciarAplicacao === 'function') {
            iniciarAplicacao();
        }
    } else {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #0f172a; color: #f8fafc; font-family: sans-serif; text-align: center;">
                <div>
                    <h1 style="color: #ef4444; margin-bottom: 10px;">Acesso Negado</h1>
                    <p style="color: #94a3b8;">Senha incorreta. Atualize a página para tentar novamente.</p>
                </div>
            </div>
        `;
    }
}

verificarSenha();
