import multer from "multer";
import path from "path";

// ref: https://javascript.plainenglish.io/upload-files-from-multiple-fields-using-multer-ee9a28d0f57c

// Set up storage for uploaded files
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

// Create the multer instance
const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 1, // 1MB file size limit
    files: 2, // files per request
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)) {
      return cb(new Error("Invalid Image Type"));
    }
    cb(undefined, true);
  },
});

export { upload };
