import express from "express";
import { upload_file } from "#controllers/fileController";
import { getUsers } from "#controllers/userController";
const router = express.Router();

// health check route
router.get("/", (req, res) => {
  res.send("Ping success");
});

// redact test route
router.post("/upload", upload_file);

router.get("/users", getUsers);

export { router };
