import { Application, Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";
import { isProd, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } from "../../config";

export async function applyRateLimiter(app: Application): Promise<void> {
  if (isProd) {
    const redisClient = createClient({ url: process.env.REDIS_URL });
    await redisClient.connect();
    const limiterRedis = new RateLimiterRedis({
      storeClient: redisClient,
      points: RATE_LIMIT_MAX,
      duration: RATE_LIMIT_WINDOW_MS / 1000,
      blockDuration: 60,
    });
    app.use(async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.ip) {
          return next();
        }
        await limiterRedis.consume(req.ip);
        next();
      } catch {
        res.status(429).json({ message: "Too many requests" });
      }
    });
  } else {
    app.use(
      rateLimit({
        windowMs: RATE_LIMIT_WINDOW_MS,
        max: RATE_LIMIT_MAX,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Request limit reached (dev).",
      })
    );
  }
}
