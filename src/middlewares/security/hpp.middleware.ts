import hpp from "hpp";
import { Application } from "express";

export function applyHpp(app: Application): void {
  app.use(hpp({ whitelist: ["tags", "categories"] }));
}
