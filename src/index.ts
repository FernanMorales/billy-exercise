import express, { Application } from 'express';
import morgan from 'morgan';
import Router from './routes';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const app: Application = express();

app.use(morgan('tiny'));
app.use(express.static('public'));

app.use(
	'/docs',
	swaggerUi.serve,
	swaggerUi.setup(undefined, {
		swaggerOptions: {
			url: '/swagger.json',
		},
	})
);

app.use(Router);

app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});