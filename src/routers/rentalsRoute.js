import { Router } from "express";
import { getRentals, postRentals } from "../controllers/rentsCont.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import schemaRental from "../schemas/rentalsSchema.js";

const rentalsRoute = Router();

rentalsRoute.get("/rentals", getRentals);
rentalsRoute.post("/rentals", validateSchema(schemaRental), postRentals);

export default rentalsRoute;
