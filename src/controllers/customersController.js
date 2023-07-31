import { db } from "../database/database.connection.js";

async function getCustomers(req, res) {
  const { cpf, offset, limit, order, desc } = req.query;

  let sqlQuery = ` `;
  const sqlQueryParams = [];

  if (cpf) {
    sqlQueryParams.push(cpf + "%");
    sqlQuery += `WHERE cpf LIKE $${sqlQueryParams.length} `;
  }

  if (offset) {
    sqlQueryParams.push(offset);
    sqlQuery += `OFFSET $${sqlQueryParams.length} `;
  }

  if (limit) {
    sqlQueryParams.push(limit);
    sqlQuery += `LIMIT $${sqlQueryParams.length} `;
  }

  try {
    const customers = await db.query(
      `SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers ${sqlQuery};`,
      sqlQueryParams
    );

    res.send(customers.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getCustomersByID(req, res) {
  const { id } = req.params;
  try {
    const customer = await db.query(
      `SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday 
      FROM customers WHERE id = $1;`,
      [id]
    );
    if (customer.rows.length === 0) return res.sendStatus(404);

    res.send(customer.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const customer = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [
    cpf,
  ]);
  if (customer.rows.length > 0)
    return res.status(409).send("CPF already registered");

  await db.query(
    `INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4);`,
    [name, phone, cpf, birthday]
  );
  res.sendStatus(201);
}

async function putCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;
  const customer = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [
    cpf,
  ]);
  if (customer.rows.length > 0 && customer.rows[0].id !== Number(id))
    return res.status(409).send("CPF already registered");
  await db.query(
    `UPDATE customers SET "name"= $1, "phone"= $2, "cpf"= $3, "birthday"= $4 WHERE id = $5;`,
    [name, phone, cpf, birthday, id]
  );
  res.sendStatus(200);
}

export { getCustomers, getCustomersByID, postCustomers, putCustomers };
