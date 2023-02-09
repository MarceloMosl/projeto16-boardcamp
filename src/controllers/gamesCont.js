import { db } from "../config/database.js";

export async function getGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games");

    res.send(games.rows);
  } catch (error) {
    res.send(error);
  }
}

export async function postGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  const gameExist = await db.query(
    `SELECT * FROM games WHERE name = '${name}'`
  );

  if (gameExist.rows.length !== 0) return res.sendStatus(409);

  if (stockTotal <= 0 || pricePerDay <= 0 || name == "")
    return res.sendStatus(400);

  try {
    await db.query(
      `insert into games (name, image, "stockTotal", "pricePerDay") values ($1,$2,$3,$4)`,
      [name, image, stockTotal, pricePerDay]
    );
    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
}
