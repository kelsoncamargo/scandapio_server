import express from "express";
import router from "./router";
import bodyParser from "body-parser";
import { errors } from "celebrate";
import cors from "cors";
export const server = express();
import dotenv from "dotenv";

dotenv.config();
server.use(bodyParser.json({ limit: "2mb" }));
server.use(cors());
server.use("/", router);
server.use(errors({ statusCode: 401 }));

server.listen(8000, () => console.log(`Application running on port ${8000}`));