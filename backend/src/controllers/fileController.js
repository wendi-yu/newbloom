import asyncHandler from "express-async-handler";
import runRedaction from "#services/modelService";
import { fileStringHash } from "#services/backendFileService";
import db from "#database/db";

// Handle file upload
export const upload_file = asyncHandler(async (req, res, next) => {
  // TODO: implement encryption/decryption of req.body["text"]
  const text = req.body["text"];
  const redactions = await runRedaction(text).catch((e) => {
    res.status(400).json({ message: "ML model error" });
    next(e);
  });
  // TODO: implement other file upload actions (eg assign id, register it)
  const fileId = await fileStringHash(text);
  await db.upsertFile(fileId, redactions).catch((e) => {
    // res.status(400).json({ message: "File registration failed" });
    // next(e);
    console.error("file registration failed", e);
  });
  res.send({ redactions: redactions, id: fileId });
  next();
});

export const updateFile = asyncHandler(async (req, res, next) => {
  const fileId = req.body["fileId"];
  const { accepts, rejects, suggestions, comments, comment_indices } =
    req.body["state"];

  await db
    .upsertFile(
      fileId,
      suggestions,
      accepts,
      rejects,
      comments,
      comment_indices
    )
    .catch((e) => {
      res.status(400).json({ message: "File registration failed" });
      next(e);
    });
  res.send({ success: true });
  next();
});

export const getFile = asyncHandler(async (req, res, next) => {
  const fileId = req.query.fileId;
  const file = await db.getFile(fileId).catch((e) => {
    res.status(400).json({ message: "Failed to get file" });
    next(e);
  });

  res.send({
    file: file,
  });
  next();
});
