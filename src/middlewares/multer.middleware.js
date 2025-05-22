// import multer from "multer";
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/public/temp");
//   },
//   filename: function (req, file, cb) {
//     //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({ storage});
import multer from "multer";
import path from "path";
import fs from "fs";

// Get absolute path to "public/temp"
const uploadPath = path.join(process.cwd(), "public", "temp");

// Ensure folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // ✅ Correct path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // You can add a timestamp here if needed
  },
});

export const upload = multer({ storage });
