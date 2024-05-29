import multer from "multer";
import path from "path";

const storageConfigration = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = uniqueSuffix + ext;
    cb(null, name);
  },
});

export const upload = multer({ storage: storageConfigration });
