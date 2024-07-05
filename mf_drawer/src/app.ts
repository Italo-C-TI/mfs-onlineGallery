const favoriteCountElement = document.getElementById('favorite-count');
const videoLinkElement = document.getElementById('video-link');
const favoriteLinkElement = document.getElementById('favorite-link');

async function loadFavoriteVideos() {
    try {
        const response = await fetch('http://localhost:3004/api/favorites');
        if (!response.ok) {
            throw new Error('Failed to load favorite videos');
        }
        const data = await response.json();
        return data.favorites;
    } catch (error: any) {
        console.error('Error loading favorite videos:', error.message);
        return [];
    }
}

function getRoute() {
    return window.location.pathname;
}

function updateFavoriteCount() {
    loadFavoriteVideos()
        .then(favorites => {
            const count = favorites.length;
            const favoriteCountElement = document.getElementById('favorite-count');
            if (favoriteCountElement) favoriteCountElement.textContent = `${count}`;
        })
        .catch(error => {
            console.error('Error updating favorite count:', error.message);
        });
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
