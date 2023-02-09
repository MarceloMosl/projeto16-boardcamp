import express, { json } from "express";
import cors from "cors";
import gameRoute from "./routes/gamesRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(json());

app.use([gameRoute]);

app.listen(PORT, () => console.log("Server On"));
