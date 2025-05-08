import { Application } from "express";
import { applyHelmet } from "./security/helmet.middleware";
import { applyCors } from "./security/cors.middleware";
import { applyRateLimiter } from "./security/rateLimiter.middleware";
import { applySanitizer } from "./security/sanitizer.middleware";
import { applyHpp } from "./security/hpp.middleware";

/**
 * Applies all security-related middlewares in the correct order.
 */
export async function applySecurity(app: Application): Promise<void> {
  applyHelmet(app);
  applyCors(app);
  await applyRateLimiter(app);
  applySanitizer(app);
  applyHpp(app);
}
