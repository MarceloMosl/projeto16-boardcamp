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
