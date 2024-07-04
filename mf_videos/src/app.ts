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
let favoriteVideos: Video[] = [];

document.getElementById('searchBtn')!.addEventListener('click', () => {
    const query = (document.getElementById('search') as HTMLInputElement).value;
    fetch(`http://localhost:3004/api/videos?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const videos = data.items.map((video: Video) => `
                <div class="video">
                    <h3>${video.snippet.title}</h3>
                    <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    <a class="favorite-btn" onclick="toggleFavorite('${video.id.videoId}', this)">⭐</a>
                </div>
            `).join('');
            document.getElementById('videos')!.innerHTML = videos;
        });
});

function toggleFavorite(videoId: string, btn: HTMLElement) {
    const videoIndex = favoriteVideos.findIndex(video => video.id.videoId === videoId);

    if (videoIndex === -1) {
        const video = findVideoById(videoId);
        if (video) {
            favoriteVideos.push(video);
            btn.classList.add('active');
        }
    } else {
        // Remover dos favoritos se já estiver na lista
        favoriteVideos.splice(videoIndex, 1);
        btn.classList.remove('active');
    }

    updateFavoriteCount();
}

function findVideoById(videoId: string): Video | undefined {
    return {
        id: { videoId },
        snippet: {
            title: `Vídeo ${videoId}`,
            description: `Descrição do vídeo ${videoId}`,
            thumbnails: {
                default: {
                    url: `https://via.placeholder.com/150?text=Video+${videoId}`
                }
            }
        }
    };
}

function updateFavoriteCount() {
    const count = favoriteVideos.length;
    const favoriteCountElement = document.getElementById('favorite-count');
    if (favoriteCountElement) favoriteCountElement.textContent = `${count}`;
}