"use strict";
function loadMicroFrontend(containerId, url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        }
        else {
            console.error(`Container ${containerId} not found.`);
        }
    })
        .catch(err => console.error('Error loading micro-frontend:', err));
}
if (typeof window !== 'undefined') {
    console.log("asdka;dksa");
    window.addEventListener('load', () => {
        loadMicroFrontend('mf_drawer_container', 'http://localhost:3001');
        loadMicroFrontend('mf_videos_container', 'http://localhost:3002');
    });
}
