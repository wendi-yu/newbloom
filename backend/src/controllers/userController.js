import * as db from "#database/db";

export const getUsers = async (req, res, next) => {
  const r = await db.getUsers().catch((e) => {
    res.status(400).json({ message: "ML model error" });
    next(e);
  });
  res.send(r.rows);
};
