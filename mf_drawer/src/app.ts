const favoriteCountElement = document.getElementById('favorite-count');
const videoLinkElement = document.getElementById('video-link');
const favoriteLinkElement = document.getElementById('favorite-link');

function getFavoriteCount() {
    return 5;
}

function getRoute() {
    return window.location.pathname;
}

function updateFavoriteCount() {
    const count = getFavoriteCount();
    if (favoriteCountElement) favoriteCountElement.textContent = `${count}`;
}

function highlightCurrentRoute() {
    const route = getRoute();
    if ((route === '/videos' || route === '/') && videoLinkElement) {
        videoLinkElement.classList.add('active');
    } else if (route === '/favoritos' && favoriteLinkElement) {
        favoriteLinkElement.classList.add('active');
    }
}

updateFavoriteCount();
highlightCurrentRoute();
