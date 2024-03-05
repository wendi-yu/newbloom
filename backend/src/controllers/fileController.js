import asyncHandler from "express-async-handler"
import runRedaction from "#services/modelService";

// Handle file upload
export const upload_file = asyncHandler(async (req, res, next) => {
    // TODO: implement encryption/decryption of req.body["text"]
    const redactions = await runRedaction(req.body["text"])
        .catch(e => {
            res.status(400).json({ message: "ML model error" })
            next(e)
        });
    // TODO: implement other file upload actions (eg assign id, register it)
    res.send({ "redactions": redactions })
    next()
});