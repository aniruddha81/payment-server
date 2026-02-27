import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { handleError } from "./middlewares/errorHandling.middleware.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { MAIN_SERVER_URL } from "./Constants.js";

const app = express();

app.use(
  cors({
    origin: [MAIN_SERVER_URL],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(morgan("dev"));

//routes declaration
app.use(
  "/api/v1/users",
  asyncHandler(async (req, res) => {
    res
      .status(200)
      .json(new ApiResponse(200, null, "Users fetched successfully"));
  })
);

// Error handling middleware
app.use(handleError);

export { app };
