import { Router } from "express";
import { getRentals } from "../controllers/rentsCont.js";

const rentalsRoute = Router();

rentalsRoute.get("/rentals", getRentals);

export default rentalsRoute;
