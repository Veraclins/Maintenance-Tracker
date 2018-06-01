import { } from 'dotenv/config';
import methodOverride from 'method-override';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';


const app = express();
const { PORT = 3000 } = process.env;

// Middlewares
app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev', {
  skip: () => app.get('env') === 'test',
}));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes handler
app.all('/', (req, res) => {
  res.redirect('/api/v1');
});
app.use('/api/v1', routes);


/* eslint-disable no-console */
export const server = app.listen(PORT, () => console.log(`The server is live on port ${PORT}`));

export default app;
