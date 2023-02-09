import express, { json } from "express";
import cors from "cors";
import gameRoute from "./routers/gamesRoute.js";
import customerRoute from "./routers/customersRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(json());

app.use([gameRoute, customerRoute]);

app.listen(PORT, () => console.log("Server On"));
