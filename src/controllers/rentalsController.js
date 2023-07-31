import { db } from "../database/database.connection.js";

async function getRentals(req, res) {
  try {
    const rentals = await db.query("SELECT * FROM rentals");
    res.send(rentals.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function postRentals(req, res) {}
async function endRentals(req, res) {}
async function deleteRentals(req, res) {}

export { getRentals, postRentals, endRentals, deleteRentals };
