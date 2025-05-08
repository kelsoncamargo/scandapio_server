// server.ts

import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { errors } from "celebrate";

import router from "./router";
import { applySecurity } from "./middlewares/security.middleware";

dotenv.config();

export const server = express();

server.use(express.json({ limit: "2mb" }));

(async () => {
  try {
    await applySecurity(server);

    server.use("/", router);

    server.use(errors({ statusCode: 401 }));

    server.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err);
        const status = err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ message });
      }
    );

    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () =>
      console.log(`Application running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
