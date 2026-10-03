import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app);

const ALLOWED_ORIGIN = "http://localhost:5173";

app.use(express.json());

// Sync Express CORS to prevent cookie errors later
app.use(cors({
    origin: ALLOWED_ORIGIN,
    credentials: true
}));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "all okay"
    });
});


export { app,ALLOWED_ORIGIN};