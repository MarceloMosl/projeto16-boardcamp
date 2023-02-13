import dayjs from "dayjs";
import { db } from "../config/database.js";

export async function getRentals(req, res) {
  const rents = await db.query(`SELECT json_build_object(
    'id', rentals.id,
    'customerId', rentals."customerId",
    'gameId', rentals."gameId",
    'rentDate', rentals."rentDate",
    'daysRented', rentals."daysRented",
    'returnDate', rentals."returnDate",
    'originalPrice', rentals."originalPrice",
    'delayFee', rentals."delayFee",
    'customer', json_build_object(
        'id', customers.id,
        'name', customers.name
    ),
    'game', json_build_object(
        'id', games.id,
        'name', games.name
    )) FROM rentals JOIN customers ON rentals."customerId" = customers.id
    JOIN games ON rentals."gameId" = games.id;
    `);

  const rentsPromise = [];
  await rents.rows.map((a) => rentsPromise.push(a.json_build_object));

  res.send(rentsPromise);
}

export async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  const customerExist = await db.query(
    `SELECT * FROM customers WHERE id = $1`,
    [customerId]
  );

  const gameExist = await db.query(`SELECT * FROM games WHERE id = $1`, [
    gameId,
  ]);

  if (gameExist.rows.length === 0 || customerExist.rows.length === 0)
    return res.sendStatus(400);

  const gameInRent = await db.query(
    `SELECT * FROM rentals where "gameId" = $1`,
    [gameId]
  );

  if (gameExist.rows[0].stockTotal == gameInRent.rows.length)
    return res.sendStatus(400);

  try {
    await db.query(
      `insert into rentals
          ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
          values ($1,$2,$3,$4,$5,$6, $7)`,
      [
        customerId,
        gameId,
        dayjs().format("YYYY/MM/DD"),
        daysRented,
        null,
        daysRented * gameExist.rows[0].pricePerDay,
        null,
      ]
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.send(error);
  }
}

export async function endRent(req, res) {
  const { id } = req.params;

  const rent = await db.query(`SELECT * FROM rentals where id = $1`, [id]);

  if (rent.rows.length == 0) return res.sendStatus(404);

  if (rent.rows[0].returnDate !== null) return res.sendStatus(400);

  const delayFeeCont = dayjs().diff(rent.rows[0].rentDate, "day");

  const costPerDay = rent.rows[0].originalPrice / rent.rows[0].daysRented;

  try {
    await db.query(
      `update rentals set "returnDate" = $1 "delayFee" = $2 WHERE id = $3`,
      [dayjs().format("YYYY/MM/DD"), delayFeeCont * costPerDay, id]
    );
    return res.sendStatus(200);
  } catch (error) {
    return res.send(error);
  }
}
