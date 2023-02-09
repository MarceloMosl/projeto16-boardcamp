import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesCont.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import gameSchema from "../schemas/gameSchema.js";

const gameRoute = Router();

gameRoute.get("/games", getGames);
gameRoute.post("/games", validateSchema(gameSchema), postGames);

export default gameRoute;
