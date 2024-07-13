import "./config";
import cors from "cors";
import express from "express";
import connect from "./db/connection";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import verifyJWT from "./middleware/jwt";
import authRoutes from "./routes/auth.routes";
import mediaRoutes from "./routes/media.routes";
import requestLogger from "./middleware/logger";
import errorHandler from "./middleware/errHandler";

await connect();
const port = process.env.PORT ?? 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(requestLogger);
app.use("/media", verifyJWT, mediaRoutes);
app.use(authRoutes);

app.get("/", verifyJWT, (req, res) => {
  res.send(`Hello ${req.email}`);
});

app.use(errorHandler);
app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`);
});
