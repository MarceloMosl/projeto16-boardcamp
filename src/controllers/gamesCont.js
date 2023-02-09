import { db } from "../config/database.js";

export async function getGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games");

    res.send(games.rows);
  } catch (error) {
    res.send(error);
  }
}
