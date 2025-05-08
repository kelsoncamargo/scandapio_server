import { Application, Request, NextFunction } from "express";
import xss from "xss";

function sanitize(obj: any): any {
  if (typeof obj === "string") return xss(obj);
  if (Array.isArray(obj)) return obj.map(sanitize);
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, sanitize(v)])
    );
  }
  return obj;
}

export function applySanitizer(app: Application): void {
  app.use((req: Request, _res, next: NextFunction) => {
    if (req.body) req.body = sanitize(req.body);
    next();
  });
}
