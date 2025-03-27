import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: "session",
        keys: [config.SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 1000, 
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    })
);

app.use(
    cors({
        origin: config.FRONTEND_ORIGIN,
        credentials: true,
    })
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "Hello i'm samar belhajjamor the developer of this application",
    });
});
const PORT = config.PORT || 3000;

const startServer = async () => {
    try {
        await connectDatabase(); // Se connecter à MongoDB
        console.log("✅ Database connected successfully");

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}${BASE_PATH}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to the database:", error);
        process.exit(1); // Quitter l'application en cas d'erreur
    }
};

// 📌 **Démarrer l'application**
startServer();


