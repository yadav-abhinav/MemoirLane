import "dotenv/config";
import express from "express";
import connect from "./db/connection";
import authRoutes from "./routes/auth.routes";
import verifyJWT from "./middlewares/jwt";
import { CustomRequest } from "./entities/auth.entity";

await connect();
const port = process.env.PORT ?? 8080;
const app = express();

app.use(express.json());
app.use(authRoutes);

app.get("/", verifyJWT, (req, res) => {
  const email = (req as CustomRequest).email
  res.send(`Hello ${email}`);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
