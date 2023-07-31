import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";

async function getGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games");
    res.send(games.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function postGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  const game = await db.query(`SELECT * FROM customers WHERE name = $1;`, [
    name,
  ]);
  if (game.rows.length > 0)
    return res.status(409).send("Game already registered");
  await db.query(
    `INSERT INTO customers (name, image, stockTotal, pricePerDay ) VALUES ($1, $2, $3, $4)`,
    [name, image, stockTotal, pricePerDay]
  );
  res.sendStatus(201);
}

export { getGames, postGames };
