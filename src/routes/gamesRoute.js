import { Router } from "express";
import { getGames } from "../controllers/gamesCont.js";

const gameRoute = Router();

gameRoute.get("/games", getGames);

export default gameRoute;
