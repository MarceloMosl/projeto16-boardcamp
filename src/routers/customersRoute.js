import { Router } from "express";
import {
  getCustomers,
  postCustomers,
  updateCustomers,
} from "../controllers/costumersCont.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import schemaCustomer from "../schemas/customerSchema.js";

const customerRoute = Router();

customerRoute.get("/customers/:id", getCustomers);
customerRoute.get("/customers", getCustomers);
customerRoute.post("/customers", validateSchema(schemaCustomer), postCustomers);
customerRoute.put(
  "/customers/:id",
  validateSchema(schemaCustomer),
  updateCustomers
);

export default customerRoute;
