const GITHUB_USER = 'nanasichero';

async function iniciarAplicacao() {
    const gridElement = document.getElementById('projects-grid');
    const loadingElement = document.getElementById('loading');

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=50`);
        
        if (!response.ok) {
            throw new Error('Não foi possível carregar os repositórios.');
        }

        const repos = await response.json();
        loadingElement.style.display = 'none';

        const filteredRepos = repos.filter(repo => repo.name.toLowerCase() !== `${GITHUB_USER}` && repo.name.toLowerCase() !== `${GITHUB_USER}.github.io`);

        if (filteredRepos.length === 0) {
            gridElement.innerHTML = '<p class="message">Nenhum projeto encontrado.</p>';
            return;
        }

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
        console.error(error);
        loadingElement.textContent = 'Erro ao carregar os projetos. Verifique se o repositório é público.';
    }
}
