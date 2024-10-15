import express, { Request, Response } from "express";
import cors from "cors";

import path from "path";
global.uploadDir = path.join(__dirname, "uploads_files");

import { fileRouter } from "./routes/fileRouter";
import sequelize from "./config/db";
import { userRouter } from "./routes/userRouter";
import { skillRouter } from "./routes/skillRouter";

const app = express();

app.use(
    cors({
        origin: "*",
        methods: "*",
    })
);

app.use(express.json());

app.options("*", cors());

app.use("/api/files", fileRouter);
app.use("/api/user", userRouter);
app.use("/api/skills", skillRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "API`s not found",
    });
});

const PORT = process.env.PORT || 3625;

sequelize.sync({alter: true}).then(() => {
    app.listen(PORT, () => {
        console.log("Сервер запущен на порту: " + PORT);
    });
});

