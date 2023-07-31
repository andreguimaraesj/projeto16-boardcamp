import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { db } from "../database/database.connection.js";

dayjs.extend(advancedFormat);
// dayjs(birthday).format("x");

async function getRentals(req, res) {
  try {
    const rentals = await db.query("SELECT * FROM rentals");
    res.send(rentals.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const consumer = await db.query(`SELECT * FROM customers WHERE id= $1`, [
      customerId,
    ]);
    if (consumer.rows.length === 0) return res.sendStatus(404);

    const game = await db.query(`SELECT * FROM game WHERE id= $1`, [gameId]);
    if (game.rows.length === 0) return res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function endRentals(req, res) {}
async function deleteRentals(req, res) {}

export { getRentals, postRentals, endRentals, deleteRentals };
