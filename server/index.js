import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import uploadRouter from "./route/upload.router.js";
import subCategoryRouter from "./route/subCategory.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
import addressRouter from "./route/address.route.js";
import orderRouter from "./route/order.route.js";

const app = express();

// Configure CORS to allow development (localhost) and the configured frontend
// when credentials are used. When credentials: true is set, Access-Control-Allow-Origin
// cannot be '*' and must be an exact origin.
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  // some dev setups use http://localhost:5173 or http://localhost:5174 or https
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:5173/",
  "http://localhost",
  "http://127.0.0.1",
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      // If no origin (e.g. curl, Postman, or mobile/native requests), allow it
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS policy: Origin not allowed"), false);
    },
  })
);

// Development debug: log the origin and whether it is allowed so you can inspect CORS decisions.
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    const origin = req.headers.origin || "no-origin";
    const allowed = allowedOrigins.includes(origin) || !req.headers.origin;
    console.log(
      `[CORS DEBUG] Request origin: ${origin} -> ${allowed ? "ALLOWED" : "REJECTED"}`
    );
    next();
  });
}
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(compression()); // Add compression middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  ///server to client
  response.json({
    message: "Server is running " + PORT,
  });
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running", PORT);
  });
});
