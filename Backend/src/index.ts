import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "cookie-session";
import appConfig from "./config/app.config"; // Correction de l'importation

const app = express();
const config = appConfig(); // Appeler la fonction pour récupérer la config
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: "session",
        keys: [config.SESSION_SECRET], // Correction : SESSION_SECRET au lieu de SESION_SECRET
        maxAge: 24 * 60 * 60 * 1000, // 24 heures en millisecondes
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    })
);

// Correction de l'utilisation de `cors`
app.use(
    cors({
        origin: config.FRONTEND_ORIGIN,
        credentials: true,
    })
);

// Correction de la route GET "/"
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "Hello",
    });
});

// Ajout de `app.listen` pour démarrer le serveur
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}${BASE_PATH}`);
});
