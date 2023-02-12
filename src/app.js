import express, { json } from "express";
import cors from "cors";
import gameRoute from "./routers/gamesRoute.js";
import customerRoute from "./routers/customersRoute.js";
import rentalsRoute from "./routers/rentalsRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(json());

app.use([gameRoute, customerRoute, rentalsRoute]);

app.listen(PORT, () => console.log("Server On"));
