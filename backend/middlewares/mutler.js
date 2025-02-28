import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory as buffer

export const singleUpload = multer({ storage }).single("file");
