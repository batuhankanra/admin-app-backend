import express from 'express';
import config from './src/config/index.js';
import cors from 'cors';
import DBCONNECTION from './src/db/index.js';
import { router } from './src/routes/index.js';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors())
 DBCONNECTION.connect(config.DB_URL)
 app.use(morgan('dev'))

 app.use('/api', router);
app.listen(config.API_URL, () => {
    console.log('Server is running on port ',config.API_URL);
})