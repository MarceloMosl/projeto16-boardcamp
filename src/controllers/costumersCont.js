import { db } from "../config/database.js";

export async function getCustomers(req, res) {
  const { id } = req.params;

  if (id) {
    try {
      const customers = await db.query(
        `SELECT * FROM customers WHERE id = ${id}`
      );
      if (customers.rows.length === 0) {
        return res.sendStatus(404);
      }
      return res.send(customers.rows[0]);
    } catch (error) {
      return res.send(error);
    }
  }

  try {
    const customers = await db.query("SELECT * FROM customers");

    return res.send(customers.rows);
  } catch (error) {
    return res.send(error);
  }
}

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  const cpfExist = await db.query(
    `SELECT * FROM customers WHERE cpf = '${cpf}'`
  );

  if (cpfExist.rows.length !== 0) return res.sendStatus(409);

  try {
    await db.query(
      `INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`,
      [name, phone, cpf, birthday]
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function updateCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;

  const customerExist = await db.query(
    `SELECT * FROM customers WHERE id = ${id}`
  );

  if (!customerExist) return res.sendStatus(409);

  const cpfExist = await db.query(
    `SELECT * FROM customers WHERE cpf = '${cpf}'`
  );

  if (
    cpfExist.rows.length !== 0 &&
    customerExist.rows[0].cpf !== cpfExist.rows[0].cpf
  )
    return res.sendStatus(409);

  try {
    await db.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4  WHERE id = $5`,
      [name, phone, cpf, birthday, id]
    );
    return res.send("Ok");
  } catch (error) {
    return res.send(error);
  }

  // if (cpfExist.rows.length !== 0) return res.sendStatus(409);
}
