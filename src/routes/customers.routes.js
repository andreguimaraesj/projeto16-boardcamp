import { Router } from "express";
import {
  getCustomers,
  getCustomersByID,
  postCustomers,
  putCustomers,
} from "../controllers/customersController.js";
import validateSchema from "../middlewares/validateSchema.js";
import schemaCustomer from "../schemas/customer.js";

export const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersByID);
customersRouter.post(
  "/customers/",
  validateSchema(schemaCustomer),
  postCustomers
);
customersRouter.put(
  "/customers/:id",
  validateSchema(schemaCustomer),
  putCustomers
);

export default customersRouter;
