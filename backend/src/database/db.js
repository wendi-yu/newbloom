import pkg from "pg";
import { DATABASE_URL } from "#configs/constants";

const { Pool } = pkg;
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const getUsers = () => {
  return pool.query("SELECT * FROM users;");
};
