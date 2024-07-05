import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from 'dotenv';
import { Video } from "./types";
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
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
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

let favoriteVideos: Video[] = [];
app.use(express.json());

app.post('/api/favorite/', (req: express.Request, res: express.Response) => {
    try {
        const { video } = req.body;
        const videoIndex = favoriteVideos.findIndex(v => v?.id?.videoId === video?.id?.videoId);

        if (videoIndex === -1) {
            favoriteVideos.push(video);
            return res.status(200).json({ message: 'Video favorited successfully' });
        } else {
            return res.status(400).json({ error: 'Video already favorited' });
        }
    } catch (error: any) {
        return res.status(error?.response ? error.response?.status : 500).send(error?.message);
    }
});


app.delete('/api/favorite/:videoId', (req: express.Request, res: express.Response) => {
    try {
        const { videoId } = req.params;
        const videoIndex = favoriteVideos.findIndex(v => v?.id?.videoId === videoId);

        if (videoIndex === -1) {
            return res.status(400).json({ error: 'Video already unfavorited' });
        }

        favoriteVideos.splice(videoIndex, 1);
        res.status(200).json({ message: 'Video unfavorited successfully' });
    } catch (error: any) {
        res.status(error?.response ? error.response?.status : 500).send(error?.message);

    }
});


app.get('/api/favorites', (req: express.Request, res: express.Response) => {
    try {
        res.status(200).json({ favorites: favoriteVideos });
    } catch (error: any) {
        res.status(error?.response ? error.response?.status : 500).send(error?.message);
    }
});

app.listen(PORT, () => {
    console.log(`BFF server is running on http://localhost:${PORT}`);
});
