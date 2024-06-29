import { Video } from "./types";

document.getElementById('searchBtn')!.addEventListener('click', () => {
    const query = (document.getElementById('search') as HTMLInputElement).value;
    fetch(`/api/videos?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const videos = data.items.map((video: Video) => `
                <div class="video">
                    <h3>${video.snippet.title}</h3>
                    <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    <button onclick="toggleFavorite('${video.id.videoId}')">⭐</button>
                </div>
            `).join('');
            document.getElementById('videos')!.innerHTML = videos;
        });
});

function toggleFavorite(videoId: string) {
}