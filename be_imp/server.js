const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const { dbMiddleware, connectDB } = require("./config/db");

//Load env vars
dotenv.config({ path: "./config/.env" });

//connect db
connectDB();

//Route files
const users = require("./routes/users");
const auth = require("./routes/auth");
const tables = require("./routes/tables");

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

// Enable CORS
// const corsOptions = {
//   origin: "http://localhost:5173", // Allow only this origin
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };
app.use(cors());

//Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
//add conn to req
app.use(dbMiddleware);
app.use("/api/v1/tables", tables);

//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
