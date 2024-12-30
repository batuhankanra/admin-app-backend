import dotenv from 'dotenv';

dotenv.config();
export default {
    "API_URL":process.env.API_URL || 3000,
    "DB_URL":process.env.DB_URL || 'mongodb://localhost:27017/test',
    "JWT_SECRET":process.env.JWT_SECRET


}