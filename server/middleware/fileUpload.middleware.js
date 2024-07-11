import { upload } from "./multer.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

function setupAccountImgUpload(req, res, next) {
  try {
    upload.fields([
      {
        name: "avatar",
        maxCount: 1,
      },
      {
        name: "gymLogo",
        maxCount: 1,
      },
    ])(req, res, function (err) {
      if (err) {
        const errObj = {};

        if (err.message === "Invalid Image Type") {
          errObj.title = err.message;
          errObj.message = "Please upload a valid image";
        } else {
          errObj.title = err.message;
          errObj.message = "Something went wrong while uploading the image";
        }

        res.status(400).json(new ApiResponse(400, {}, errObj));
      } else next();
    });
  } catch (error) {
    console.log("errorrororororororoor");
  }
}

export { setupAccountImgUpload };
