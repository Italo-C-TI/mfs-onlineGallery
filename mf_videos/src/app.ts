interface Video {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
}

async function favoriteVideo(video: Video) {
    try {
        const response = await fetch(`http://localhost:3004/api/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ video })
        });
        if (!response.ok) {
            throw new Error('Failed to favorite video');
        }
        console.log('Video favorited successfully');
        return response;
    } catch (error: any) {
        console.error('Error favoriting video:', error.message);
    }
}

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

document.getElementById('searchBtn')!.addEventListener('click', async () => {
    const query = (document.getElementById('search') as HTMLInputElement).value;

    try {
        const favoriteVideos = await loadFavoriteVideos();

        const response = await fetch(`http://localhost:3004/api/videos?query=${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }
        const data = await response.json();

        const videos = data.items.map((video: Video) => {
            const isFavorite = favoriteVideos.some((favVideo: Video) => favVideo.id.videoId === video.id.videoId);
            return `
                <div class="video">
                    <h3>${video.snippet.title}</h3>
                    <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    <a class="favorite-btn ${isFavorite ? 'active' : ''}" onclick='toggleFavorite(${JSON.stringify(video)}, this)'>
                        ${isFavorite ? "<i class='material-icons' style='font-size:36px'>star</i>"
                    : "<i class='material-icons' style='font-size:36px'>star_border</i>"}
                    </a>
                </div>
            `;
        }).join('');
        document.getElementById('videos')!.innerHTML = videos;

    } catch (error: any) {
        console.error('Error fetching videos:', error.message);
    }
});

async function toggleFavorite(video: Video, btn: HTMLElement) {
    const isFavorited = btn.classList.contains('active');

    if (!isFavorited) {
        try {
            const response = await favoriteVideo(video);
            if (response?.ok) {
                btn.classList.add('active');
                btn.innerHTML = "<i class='material-icons' style='font-size:36px'>star</i>";
            }
        } catch (error: any) {
            console.error('Failed to favorite video:', error.message);
        }
    } else {
        try {
            const response = await fetch(`http://localhost:3004/api/favorite/${video?.id?.videoId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to remove from favorites');
            }
            btn.classList.remove('active');
            btn.innerHTML = "<i class='material-icons' style='font-size:36px'>star_border</i>";
        } catch (error: any) {
            console.error('Failed to remove from favorites:', error.message);
        }
    }
    updateFavoriteCount();
}

async function displayFavoriteVideos() {
    const searchContainer = document.getElementById('search-container');
    const title = document.getElementById('title');

    if (searchContainer) searchContainer.style.display = 'none';
    if (title) title.style.display = 'block';

    try {
        const favoriteVideos = await loadFavoriteVideos();

        const videos = favoriteVideos.map((video: Video) => {
            return `
                <div class="video">
                    <h3>${video.snippet.title}</h3>
                    <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    <a class="favorite-btn active" onclick='toggleFavorite(${JSON.stringify(video)}, this)'>
                        <i class='material-icons' style='font-size:36px'>star</i>
                    </a>
                </div>
            `;
        }).join('');
        document.getElementById('videos')!.innerHTML = videos;

    } catch (error: any) {
        console.error('Error fetching favorite videos:', error.message);
    }
}


if (window.location.pathname === '/favoritos') {
    displayFavoriteVideos();
}
