import multer from "multer";

const memoryStorage = multer.memoryStorage();

export const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
}).any();
