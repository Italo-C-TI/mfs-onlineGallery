function loadMicroFrontend(containerId: string, url: string) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
                const script = document.createElement('script');
                script.src = `${url.replace('/index.html', '')}/app.js`;
                script.type = 'text/javascript';
                script.onload = () => console.log(`Script ${script.src} carregado com sucesso.`);
                script.onerror = () => console.error(`Erro ao carregar o script ${script.src}`);
                container.appendChild(script);
            } else {
                console.error(`Container ${containerId} not found.`);
            }
        })
        .catch(err => console.error('Error loading micro-frontend:', err));
}

function getRoute() {
    return window.location.pathname;
}

if (typeof window !== 'undefined') {
    const route = getRoute();
    window.addEventListener('load', () => {
        loadMicroFrontend('mf_drawer_container', 'http://localhost:3004/mf_drawer');
        if (route === "/videos" || route === "/favoritos") {
            loadMicroFrontend('mf_videos_container', 'http://localhost:3004/mf_videos');
        }
    });
}