
interface YouTubeResponse {
    items: Video[];
}

test('fetches videos', async () => {
    const response = await fetch('http://localhost:8080/api/videos?query=test');
    const data = (await response.json()) as YouTubeResponse;

    expect(data.items).toBeDefined();
    expect(data.items.length).toBeGreaterThan(0);
});