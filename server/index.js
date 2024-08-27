const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const connectDb = require("./utils/db");
const url = require("url");

const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

const BASE_URL = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL;

// const BASE_URL = process.env.BASE_URL;
// if (!BASE_URL) {
//   console.error('Error: BASE_URL is not defined in the environment variables.');
//   process.exit(1);
// }
// const parsedUrl = url.parse(BASE_URL);
// const basePath = parsedUrl.path;

const app = express();

app.use(cors());
app.use(express.json());

app.use(`${BASE_URL}/tasks`, taskRoutes);

const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });
