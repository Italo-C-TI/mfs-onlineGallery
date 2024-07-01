import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 8080;

app.use(cors({
    origin: 'http://localhost:8000'
}));
app.use(express.json());


app.use('/mf_drawer', async (req, res) => {
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

app.use('/mf_videos', async (req, res) => {
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
