import express from "express";
import cors from "cors";
import drugRouter from './routers/drug.router.js'

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["https://localhost:3000"],
  })
);

app.use("/api/drugs", drugRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("listening on port" + PORT);
});
