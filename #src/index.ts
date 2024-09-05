import express, { Request, Response } from "express";
import cors from "cors";

import path from "path";
global.uploadDir = path.join(__dirname, "uploads_files");

const app = express();

app.use(cors({
    origin: '*',
    methods: '*'
}));

app.options('*', cors());

// app.use("/api/attendees", userRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "API`s not found",
    });
});

const PORT = 3625;


app.listen(PORT, () => {
    console.log("Сервер запущен на порту: " + PORT);
});
