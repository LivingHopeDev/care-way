import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { BadRequest, HttpError } from "../middlewares";

// File filter for profile picture
const fileFilterPix = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new BadRequest("Only image files are allowed for profile picture!"));
  }
};

// File filter for documents
const fileFilterDoc = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
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
  } else {
    cb(new BadRequest("Only document files are allowed!"));
  }
};

// Multer configuration
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "profileImage") {
      fileFilterPix(req, file, cb);
    } else if (file.fieldname === "docs") {
      fileFilterDoc(req, file, cb);
    } else {
      cb(new BadRequest("Invalid file field!"));
    }
  },
});

// Middleware to handle file uploads
export function uploadFiles(req: Request, res: Response, next: NextFunction) {
  const uploadMiddleware = upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "docs", maxCount: 3 },
  ]);

  uploadMiddleware(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return next(new BadRequest(`File upload failed: ${err.message}`));
    } else if (err) {
      return next(new BadRequest(`An error occurred: ${err.message}`));
    }

    // Check if profileImage is uploaded
    if (!req.files || !("profileImage" in req.files)) {
      return next(new BadRequest("Profile picture is required!"));
    }

    // Check if at least one document is uploaded
    if (!req.files || !("docs" in req.files)) {
      return next(new BadRequest("At least one document is required!"));
    }

    next();
  });
}
