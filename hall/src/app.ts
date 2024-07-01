function loadMicroFrontend(containerId: string, url: string) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
            } else {
                console.error(`Container ${containerId} not found.`);
            }
        })
        .catch(err => console.error('Error loading micro-frontend:', err));
}


if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        loadMicroFrontend('mf_drawer_container', 'http://localhost:3004/mf_drawer');
        loadMicroFrontend('mf_videos_container', 'http://localhost:3004/mf_videos');
    });
}