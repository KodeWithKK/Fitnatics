import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { createOrderSchema } from "./schemas/payment.schema.js";

const testSchema = asyncHandler(async (req, res) => {
  const { data } = req.body;
  const { error } = await resolveSchema(createOrderSchema, data);
  if (error) return res.status(400).json(new ApiResponse(400, {}, { error }));
  else return res.status(200).json(new ApiResponse());
});

export { testSchema };
