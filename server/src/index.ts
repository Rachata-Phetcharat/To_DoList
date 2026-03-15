import express, { Application } from "express";
import todoRoutes from "./routes/todo.routes";
import cors from "cors";

const app: Application = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", todoRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
