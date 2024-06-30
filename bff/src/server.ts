import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const PORT = 8080;

app.use('/mf_drawer', express.static(path.join(__dirname, '../../mf_drawer/dist')));
app.use('/mf_videos', express.static(path.join(__dirname, '../../mf_videos/dist')));

app.get('/api/videos', async (req, res) => {
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