import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesController.js";
import validateSchema from "../middlewares/validateSchema.js";
import schemaGame from "../schemas/game.js";

export const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateSchema(schemaGame), postGames);

export default gamesRouter;
