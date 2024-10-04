import mongoose from "mongoose";
import "dotenv/config";
import config from "../config.js"
import { logger } from '../utils/logger.js'




export const initMongoDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(config.MONGO_URL);
        logger.info ("from connection.js - Conectado a la base de datos mongo")
    } catch (error) {
        console.log(error);
    }
};
