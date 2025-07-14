import logger from "./util/logger.js"
import express from "express"
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/dbConfig.js";
import morgan from "morgan"
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config()

connectDB()

const port = process.env.PORT || 5000;
const app = express()

const morgenFormat = ":method :url :status :response-time ms"

app.use(morgan(morgenFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3],
            };

            logger.info(JSON.stringify(logObject))
        }

    }
}));

app.use(express.json())
// contact apis
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on post ${port}`))