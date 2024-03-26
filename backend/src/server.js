import dotenv from "dotenv";
dotenv.config();

import express from "express";
import drugRouter from "./routers/drug.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";
import { dbconnect } from "./config/database.config.js";

dbconnect();

const PORT = 5000;

const app = express();
app.use(express.json());

app.use("/api/drugs", drugRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(PORT, () => {
  console.log("listening on port" + PORT);
});
