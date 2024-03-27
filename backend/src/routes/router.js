import express from "express";
import { upload_file, updateFile, getFile } from "#controllers/fileController";
import { getUsers } from "#controllers/userController";
const router = express.Router();

// health check route
router.get("/", (req, res) => {
  res.send("Ping success");
});

// redact test route
router.post("/file/upload", upload_file);
router.post("/file/update", updateFile);
router.get("/file/", getFile);

router.get("/users", getUsers);

export { router };
