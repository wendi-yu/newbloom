import asyncHandler from "express-async-handler";
import runRedaction from "#services/modelService";
import { fileStringHash } from "#services/backendFileService";

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
  res.send({ redactions: redactions, id: fileId });
  next();
});
