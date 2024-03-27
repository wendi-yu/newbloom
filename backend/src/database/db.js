import pkg from "pg";
import { DATABASE_URL } from "#configs/constants";

const { Pool } = pkg;
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const getUsers = () => {
  return pool.query("SELECT * FROM users;");
};

const upsertFile = async (
  fileId,
  suggestions,
  accepts = [],
  rejects = [],
  comments = [],
  comment_indices = []
) => {
  const res = await pool.query(
    `INSERT INTO files (file_id, suggestions, accepts, rejects, comments, comment_indices) VALUES ('${fileId}', '${JSON.stringify(
      suggestions
    )}', '${JSON.stringify(accepts)}', '${JSON.stringify(
      rejects
    )}', '${JSON.stringify(comments)}', '${JSON.stringify(
      comment_indices
    )}') ON CONFLICT (file_id) DO UPDATE SET suggestions = EXCLUDED.suggestions, accepts = EXCLUDED.accepts, rejects = EXCLUDED.rejects, comments = EXCLUDED.comments, comment_indices = EXCLUDED.comment_indices;`
  );

  return res;
};

const getFile = async (fileId) => {
  const res = await pool.query(`SELECT * FROM files WHERE file_id='${fileId}'`);
  return res.rows[0];
};

export default {
  getFile,
  getUsers,
  upsertFile,
};
