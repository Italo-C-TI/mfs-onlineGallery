import express from 'express';
import path from 'path';

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '../dist')));

const serveIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
};

app.get('/', serveIndex);
app.get('/videos', serveIndex);
app.get('/favoritos', serveIndex);

app.listen(port, () => {
    console.log(`Hall listening at http://localhost:${port}`);
});