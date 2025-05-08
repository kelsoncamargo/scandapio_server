import cors from "cors";
import { Application } from "express";
import { CORS_ORIGINS } from "../../config";

export function applyCors(app: Application): void {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || CORS_ORIGINS.includes(origin)) {
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
