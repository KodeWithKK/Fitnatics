import dayjs from "dayjs";
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

const testDayjs = asyncHandler(async (req, res) => {
  const data = {
    timeZone: dayjs.tz.guess(), // Asia/Calcutta
    customDate: dayjs("30/06/2024", "DD/MM/YYYY")
      .tz("Asia/Calcutta")
      .toString(),
    addDate: dayjs().add(3, "month").toString(),
    findAge: dayjs().diff(dayjs("20/08/2003", "DD/MM/YYYY"), "year", true),
  };

  return res.status(200).json(new ApiResponse(200, data));
});

export { testSchema, testDayjs };
