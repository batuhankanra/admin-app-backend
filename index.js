import express from 'express';
import config from './src/config/index.js';
import cors from 'cors';
import DBCONNECTION from './src/db/index.js';

const app = express();
app.use(express.json());
app.use(cors())
 DBCONNECTION.connect(config.DB_URL)

app.listen(config.API_URL, () => {
    console.log('Server is running on port ',config.API_URL);
})