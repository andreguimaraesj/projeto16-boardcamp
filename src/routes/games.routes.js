import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesController.js";
import validateSchema from "../middlewares/validateSchema.js";

export const gamesRouter = Router();

gamesRouter.get("/game", getGames);
gamesRouter.post("/post", postGames);

export default gamesRouter;
