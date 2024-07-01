import express from "express";

const app = express();
const PORT = 8080;

app.get('/api/videos', async (req: any, res: any) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${query}&key=${apiKey}`);
    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`BFF server is running on http://localhost:${PORT}`);
});
