import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((record) => record === undefined)) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, { description: "All fields required!!" }));
  }

  const user = await User.findOne({ email })?.select("-_id -__v");

  if (!user) {
    const userCreated = await User.create({ email, password });

    if (!userCreated) {
      return res.status(400).json(
        new ApiResponse(
          400,
          {},
          {
            description: "Something went wrong while creating account!!",
          }
        )
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: {
            email,
            password,
            accountSetupRequired: true,
          },
        },
        "Account Successfully Created!"
      )
    );
  }

  return res.status(200).json(
    new ApiResponse(200, {
      user,
    })
  );
});

const gettingStarted = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  return res.status(200).json(new ApiResponse(200, {}));
});

export { loginHandler, gettingStarted };
