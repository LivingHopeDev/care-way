"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = uploadFiles;
const multer_1 = __importDefault(require("multer"));
const middlewares_1 = require("../middlewares");
// File filter for profile picture
const fileFilterPix = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new middlewares_1.BadRequest("Only image files are allowed for profile picture!"));
    }
};
// File filter for documents
const fileFilterDoc = (req, file, cb) => {
    const allowedMimeTypes = [
        "application/pdf", // PDF files
        "application/msword", // .doc files
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx files
        "text/plain", // .txt files
        "application/vnd.ms-excel", // .xls files
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx files
        "application/vnd.ms-powerpoint", // .ppt files
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx files
        "application/rtf", // RTF files
        "application/json", // JSON files
        "application/xml", // XML files
        "text/csv", // CSV files
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new middlewares_1.BadRequest("Only document files are allowed!"));
    }
};
// Multer configuration
const upload = (0, multer_1.default)({
    dest: "uploads/",
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "profileImage") {
            fileFilterPix(req, file, cb);
        }
        else if (file.fieldname === "docs") {
            fileFilterDoc(req, file, cb);
        }
        else {
            cb(new middlewares_1.BadRequest("Invalid file field!"));
        }
    },
});
// Middleware to handle file uploads
function uploadFiles(req, res, next) {
    const uploadMiddleware = upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "docs", maxCount: 3 },
    ]);
    uploadMiddleware(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            return next(new middlewares_1.BadRequest(`File upload failed: ${err.message}`));
        }
        else if (err) {
            return next(new middlewares_1.BadRequest(`An error occurred: ${err.message}`));
        }
        // Check if profileImage is uploaded
        if (!req.files || !("profileImage" in req.files)) {
            return next(new middlewares_1.BadRequest("Profile picture is required!"));
        }
        // Check if at least one document is uploaded
        if (!req.files || !("docs" in req.files)) {
            return next(new middlewares_1.BadRequest("At least one document is required!"));
        }
        next();
    });
}
