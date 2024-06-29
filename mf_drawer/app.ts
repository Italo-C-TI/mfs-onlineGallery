document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const path = target.getAttribute('href') || '/';
        window.history.pushState({}, path, window.location.origin + path);
        loadContent(path);
    });
});

function loadContent(path: string) {
    fetch(path)
        .then(response => response.text())
        .then(html => {
            const content = document.getElementById('content');
            if (content) content.innerHTML = html;
        });
}

window.onpopstate = () => {
    loadContent(window.location.pathname);
};

loadContent(window.location.pathname);