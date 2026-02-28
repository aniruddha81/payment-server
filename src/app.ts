import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { MAIN_SERVER_URL } from "./Constants.js";
import { handleError } from "./middlewares/errorHandling.middleware.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { asyncHandler } from "./utils/asyncHandler.js";

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins for development; adjust in production
    // credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(morgan("dev"));

//routes declaration
app.post(
  "/pay-api/meal-payment",
  asyncHandler(async (req, res) => {
    const { studentId, amount, totalQuantity, paymentMethod } = req.body;

    const transactionId = `TXN-${studentId}-${amount}-${totalQuantity}-${paymentMethod}-${Date.now()}`;

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { transactionId },
          "Meal payment endpoint is working"
        )
      );
  })
);

app.get("/", (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, null, "Meal Payment API is working"));
});

// Error handling middleware
app.use(handleError);

export { app };
