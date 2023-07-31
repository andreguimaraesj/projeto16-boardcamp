import { Router } from "express";
import {
  getCustomers,
  getCustomersByID,
  postCustomers,
  putCustomers,
} from "../controllers/customersController.js";
import validateSchema from "../middlewares/validateSchema.js";

export const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersByID);
customersRouter.post("/customers/", postCustomers);
customersRouter.put("/customers/:id", putCustomers);

export default customersRouter;
