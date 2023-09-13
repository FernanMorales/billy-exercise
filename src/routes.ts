import express from 'express';
import Controller from './controller';
import { EventService } from './service';
import { Client } from 'pg';
import * as bodyParser from 'body-parser';

const router = express.Router();
let controller: Controller;

router.use(async (_req, _res, next) => {
    const pgClient = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    })
    await pgClient.connect();
	const service = new EventService(pgClient);
    controller = new Controller(service);
	next();
});

router.use(bodyParser.json());

router.get('/event/:id', async (req, res, next) => {
	const { id } = req.params;
    try {
        const response = await controller.getEventById(Number(id));
        return res.send(response);
    } catch (error) {
        next(error);
    }
});

router.get('/events', async (_req, res, next) => {
    const saleStartDate = _req.query.start?.toString();
    const timeStamp = saleStartDate ? Number(saleStartDate) : undefined;
	try {
        const response = await controller.getEvents(timeStamp);
	    return res.send(response);
    } catch (error) {
        next(error);
    }
});

router.post('/event/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await controller.updateEvent(Number(id), req.body);
        return res.send(response);
    } catch (error) {
        next(error);
    }
});

export default router;