import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin.startsWith('http://localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());
app.use('/mf_drawer', async (req: express.Request, res: express.Response) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://mf_drawer:8080${req.url}`,
            data: req.body,
            headers: req.headers
        });
        res.send(response.data);
    } catch (error: any) {
        res.status(error?.response ? error.response?.status : 500).send(error?.message);
    }
});

app.use('/mf_videos', async (req: express.Request, res: express.Response) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://mf_videos:8080${req.url}`,
            data: req.body,
            headers: req.headers
        });
        res.send(response.data);
    } catch (error: any) {
        res.status(error?.response ? error.response?.status : 500).send(error?.message);
    }
});

app.get('/api/videos', async (req: express.Request, res: express.Response) => {
    try {
        const apiKey = process.env.YOUTUBE_API_KEY;
        const query = req.query.query as string;
        console.log("req", req)
        console.log("query", query)

        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        console.log("apiKey", apiKey)
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                type: 'video',
                maxResults: 10,
                q: query,
                key: apiKey
            }
        });

        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Error fetching videos' });
    }
});

let favoriteVideos: string[] = [];
app.use(express.json());
app.post('/api/favorite/:videoId', (req: express.Request, res: express.Response) => {
    const { videoId } = req.params;

    if (favoriteVideos.includes(videoId)) {
        return res.status(400).json({ error: 'Video already favorited' });
    }
    favoriteVideos.push(videoId);
    res.status(200).json({ message: 'Video favorited successfully' });
});

app.get('/api/favorites', (req: express.Request, res: express.Response) => {
    res.status(200).json({ favorites: favoriteVideos });
});

app.listen(PORT, () => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    console.log("apiKey:", apiKey)
    console.log(`BFF server is running on http://localhost:${PORT}`);
});
