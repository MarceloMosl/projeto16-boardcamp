import express, { json } from "express";
import cors from "cors";
import { db } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(json());

app.get("/teste", async (req, res) => {
  const tst = await db.query("SELECT * FROM customers");

  res.send(tst.rows);
});

app.listen(PORT, () => console.log("Server On"));
