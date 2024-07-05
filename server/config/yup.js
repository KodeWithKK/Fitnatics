import * as yup from "yup";
import mongoose from "mongoose";

yup.addMethod(yup.string, "isObjectId", function (errorMessage) {
  return this.test(
    "isValidObjectId",
    errorMessage ?? "Invalid ObjectId",
    function (value) {
      return mongoose.Types.ObjectId.isValid(value);
    }
  );
});
