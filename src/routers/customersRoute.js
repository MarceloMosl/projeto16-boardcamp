import { Router } from "express";
import { getCustomers, postCustomers } from "../controllers/costumersCont.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import schemaCustomer from "../schemas/customerSchema.js";

const customerRoute = Router();

customerRoute.get("/customers/:id", getCustomers);
customerRoute.get("/customers", getCustomers);
customerRoute.post("/customers", validateSchema(schemaCustomer), postCustomers);

// validateSchema(schemaCustomer),

export default customerRoute;
