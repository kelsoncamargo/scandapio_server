import cors from "cors";
import { Application } from "express";
import { CORS_ORIGINS } from "../../config";


const raw = process.env.CORS_ORIGINS ?? "";
export const NEW_CORS_ORIGINS = raw
  .split(",")           // vira array
  .map((u) => u.trim()) // tira espaços
  .filter((u) => u);    // remove strings vazias

export function applyCors(app: Application): void {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || NEW_CORS_ORIGINS.includes(origin)) {
          return callback(null, true);
        }
        callback(new Error("CORS origin not allowed"));
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
      optionsSuccessStatus: 200,
      maxAge: 24 * 60 * 60,
    })
  );
}
