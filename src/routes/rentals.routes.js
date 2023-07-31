import { Router } from "express";
import {
  deleteRentals,
  endRentals,
  getRentals,
  postRentals,
} from "../controllers/rentalsController.js";
import validateSchema from "../middlewares/validateSchema.js";

export const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", postRentals);
rentalsRouter.post("/rentals/:id/return", endRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
