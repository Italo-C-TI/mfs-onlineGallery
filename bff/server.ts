import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import { YouTubeResponse } from './types'; // Certifique-se de ajustar o caminho conforme necessário

const app = express();
const API_KEY = 'segredo_de_estado';

app.use(express.static('public'));

app.get('/api/videos', async (req: Request, res: Response) => {
    const query = req.query.query as string;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${API_KEY}`);
    const data = (await response.json()) as YouTubeResponse;
    res.json(data);
});

app.listen(80, () => {
    console.log('BFF listening on port 80');
});