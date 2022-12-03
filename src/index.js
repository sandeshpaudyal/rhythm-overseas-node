import cors from "cors";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import "./env";
import * as errorHandler from "./middlewares/errorHandler";
import json from "./middlewares/json";
import routes from "./routes";
import logger, { logStream } from "./utils/logger";
// Passport Config
import passport from "passport";
require("./config/passport")(passport);
const multer = require("multer");

// turn on this to store file locally
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({ storage });

const app = express();

// check if uploads folder is not there and create one
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const APP_PORT =
  (process.env.NODE_ENV === "test"
    ? process.env.TEST_APP_PORT
    : process.env.APP_PORT) ||
  process.env.PORT ||
  "3000";
const APP_HOST = process.env.APP_HOST || "0.0.0.0";

app.set("port", APP_PORT);
app.set("host", APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(cors());
app.use(helmet());
app.use(morgan("tiny", { immediate: true, stream: logStream })); // logs for request
app.use(morgan("tiny", { immediate: false, stream: logStream })); // logs for response

// use multer for file upload
app.use(upload.any());

const publicDir = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(publicDir));

app.use(express.json());
app.use(errorHandler.bodyParser);
app.use(json);

// API Routes
app.use("/api", routes);

// Error Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get("port"), app.get("host"), () => {
  logger.info(
    `Server started at http://${app.get("host")}:${app.get("port")}/api`
  );
});

// Catch unhandled rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled rejection", err);
  process.exit(1);
});

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught exception", err);
  process.exit(1);
});

export default app;
