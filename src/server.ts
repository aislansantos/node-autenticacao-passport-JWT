import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import apiRoutes from './routes/routes';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.use(passport.initialize());

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status && err.message) {
        return res.status(err.status).json({ error: err.message });
    }
    return res.status(400).json({ error: "Ocorreu algum erro." }); // Bad Request
}
server.use(errorHandler);

server.listen(process.env.PORT);