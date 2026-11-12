const GITHUB_USER = 'nanasichero';

async function iniciarAplicacao() {
    const gridElement = document.getElementById('projects-grid');
    const loadingElement = document.getElementById('loading');

    try {
        console.log("Buscando repositórios para:", nanasichero);
        
        const response = await fetch(`https://api.github.com/users/${nanasichero}/repos?sort=updated&per_page=50`);
        
        if (!response.ok) {
            throw new Error(`Erro na API do GitHub: ${response.status}`);
        }

        const repos = await response.json();
        
        // Remove o elemento de carregamento com segurança
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        // Filtra para remover o próprio repositório da central
        const filteredRepos = repos.filter(repo => {
            const nomeRepo = repo.name.toLowerCase();
            return nomeRepo !== nanasichero.toLowerCase() && nomeRepo !== `${GITHUB_USER.toLowerCase()}.github.io`;
        });

        if (filteredRepos.length === 0) {
            gridElement.innerHTML = '<p class="message">Nenhum projeto público encontrado no seu perfil.</p>';
            return;
        }

        gridElement.innerHTML = ''; // Limpa o grid

        filteredRepos.forEach(repo => {
            const siteUrl = repo.homepage ? repo.homepage : `https://${nanasichero}.github.io/${repo.name}/`;
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
        console.error("Erro detalhado:", error);
        if (loadingElement) {
            loadingElement.innerHTML = `<span style="color: #ef4444;">Erro ao carregar projetos. Verifique o console (F12).</span>`;
        }
    }
}
