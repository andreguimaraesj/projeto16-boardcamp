import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { db } from "../database/database.connection.js";

dayjs.extend(advancedFormat);

async function getRentals(req, res) {
  try {
    const rentals = await db.query(`
    SELECT rentals.*, TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate",
    TO_CHAR(rentals."returnDate", 'YYYY-MM-DD') AS "returnDate",
    json_build_object('id',customers.id, 'name',customers.name) AS customer,
    json_build_object('id',games.id, 'name',games.name) AS game
    FROM rentals
    JOIN customers  ON rentals."customerId"=customers.id
    JOIN games ON rentals."gameId"=games.id;
    `);

    res.send(rentals.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const consumer = await db.query(`SELECT * FROM customers WHERE id= $1;`, [
      customerId,
    ]);
    if (consumer.rows.length === 0) return res.sendStatus(404);

    const game = await db.query(`SELECT * FROM games WHERE id= $1;`, [gameId]);
    if (game.rows.length === 0) return res.sendStatus(404);

    const rented = await db.query(
      `SELECT COUNT(*) FROM rentals WHERE "gameId"= $1 AND "returnDate" IS NULL;`,
      [gameId]
    );

    if (Number(rented.rows[0].count) >= Number(game.rows[0].stockTotal))
      return res.status(400).send("There is no stock available");

    await db.query(
      `INSERT INTO rentals (
      "customerId",
      "gameId",
      "rentDate",
      "daysRented",
      "returnDate",
      "originalPrice",
      "delayFee"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        customerId,
        gameId,
        dayjs().format("YYYY-MM-DD"),
        daysRented,
        null,
        daysRented * game.rows[0].pricePerDay,
        null,
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function endRentals(req, res) {
  const { id } = req.params;
  try {
    const rental = await db.query(`SELECT * FROM  rentals WHERE "id"= $1;`, [
      id,
    ]);
    if (rental.rows.length === 0) return res.sendStatus(404);
    if (rental.rows[0].returnDate !== null)
      return res.status(400).send("This rent is already Closed");
    const pricePerDay =
      Number(rental.rows[0].originalPrice) / Number(rental.rows[0].daysRented);
    const returnDay = Date.now();

    const delayDays = Math.floor(
      (returnDay - dayjs(rental.rows[0].rentDate).format("x")) /
        (1000 * 60 * 60 * 24) -
        Number(rental.rows[0].daysRented)
    );

    await db.query(
      `UPDATE rentals SET "returnDate"= $1, "delayFee"= $2 WHERE "id" = $3;`,
      [
        dayjs(returnDay).format("YYYY-MM-DD"),
        delayDays < 0 ? 0 : delayDays * pricePerDay,
        id,
      ]
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteRentals(req, res) {
  const { id } = req.params;
  try {
    const rental = await db.query(`SELECT * FROM rentals WHERE "id" = $1;`, [
      id,
    ]);
    if (rental.rows.length === 0) return res.sendStatus(404);

    if (rental.rows[0].returnDate === null)
      return res.status(400).send("This rent is NOT Closed");

    await db.query(`DELETE FROM rentals WHERE "id" = $1;`, [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export { getRentals, postRentals, endRentals, deleteRentals };
