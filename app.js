const GITHUB_USER = 'nanasichero';

async function carregarProjetos() {
    const gridElement = document.getElementById('projects-grid');
    const loadingElement = document.getElementById('loading');

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=50`);
        
        if (response.status === 403) {
            throw new Error('Limite de requisições da API do GitHub atingido temporariamente. Aguarde alguns minutos.');
        }

        if (!response.ok) {
            throw new Error(`Não foi possível carregar (Status: ${response.status})`);
        }

        const repos = await response.json();
        
        // Remove a animação de carregamento
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        // Filtra para remover o próprio repositório da central
        const filteredRepos = repos.filter(repo => {
            const nomeRepo = repo.name.toLowerCase();
            return nomeRepo !== GITHUB_USER.toLowerCase() && nomeRepo !== `${GITHUB_USER.toLowerCase()}.github.io`;
        });

        if (filteredRepos.length === 0) {
            gridElement.innerHTML = '<p class="message">Nenhum repositório público encontrado no seu perfil.</p>';
            return;
        }

        gridElement.innerHTML = ''; // Limpa o grid

        // Cria os cards para cada projeto
        filteredRepos.forEach(repo => {
            const siteUrl = repo.homepage ? repo.homepage : `https://${GITHUB_USER}.github.io/${repo.name}/`;
            const repoUrl = repo.html_url;
            const description = repo.description ? repo.description : 'Sem descrição informada.';
            const formattedName = repo.name.replace(/-/g, ' ');

            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <div>
                    <h3>${formattedName}</h3>
                    <p>${description}</p>
                </div>
                <div class="card-footer">
                    <a href="${siteUrl}" class="btn" target="_blank" rel="noopener noreferrer">Acessar Site</a>
                    <a href="${repoUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">Código</a>
                </div>
            `;

            gridElement.appendChild(card);
        });

    } catch (error) {
        console.error("Erro na API:", error);
        if (loadingElement) {
            loadingElement.innerHTML = `<p class="message" style="color: #ef4444;">${error.message}</p>`;
        }
    }
}

// Executa a função automaticamente assim que o script é lido
carregarProjetos();
