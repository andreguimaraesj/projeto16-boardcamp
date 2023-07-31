import { Router } from "express";
import {
  deleteRentals,
  endRentals,
  getRentals,
  postRentals,
} from "../controllers/rentalsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import schemaRental from "../schemas/rental.js";

export const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateSchema(schemaRental), postRentals);
rentalsRouter.post("/rentals/:id/return", endRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
