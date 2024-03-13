import express from "express";
import cors from "cors";
import drugRouter from "./routers/drug.router.js";
import userRouter from "./routers/user.router.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["https://localhost:3000"],
  })
);

app.use("/api/drugs", drugRouter);
app.use("/api/users", userRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("listening on port" + PORT);
});
