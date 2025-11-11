import multer from "multer";

// Store file in memory instead of saving to disk
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Only accept images
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // optional: limit file size to 5MB
});

export default upload;
