import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesController.js";
import validateSchema from "../middlewares/validateSchema.js";

export const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", postGames);

export default gamesRouter;
