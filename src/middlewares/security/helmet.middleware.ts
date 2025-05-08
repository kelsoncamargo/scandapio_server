import helmet from "helmet";
import { Application } from "express";

export function applyHelmet(app: Application): void {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
        },
      },
      hsts: { maxAge: 90 * 24 * 60 * 60, includeSubDomains: true },
      referrerPolicy: { policy: "no-referrer-when-downgrade" },
    })
  );
}
