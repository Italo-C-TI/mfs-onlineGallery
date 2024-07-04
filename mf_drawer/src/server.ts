import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

const serveIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
};

app.get('*', serveIndex);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server mf_drawer is running on http://localhost:${PORT}`);
});