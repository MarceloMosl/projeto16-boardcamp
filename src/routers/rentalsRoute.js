import { Router } from "express";
import {
  deleteRent,
  endRent,
  getRentals,
  postRentals,
} from "../controllers/rentsCont.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import schemaRental from "../schemas/rentalsSchema.js";

const rentalsRoute = Router();

rentalsRoute.get("/rentals", getRentals);
rentalsRoute.post("/rentals", validateSchema(schemaRental), postRentals);
rentalsRoute.post("/rentals/:id/return", endRent);
rentalsRoute.delete("/rentals/:id", deleteRent);

export default rentalsRoute;
