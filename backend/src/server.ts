import "dotenv/config";
import path from "path";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import configViewEngine from "./config/viewEngine";
import apiRoutes from "./routes/api";
import { getHomepage } from "./controllers/homeController";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); //cho phép các request từ các nguồn khác nhau
app.use(express.json()); //phân tích các request có payload định dạng JSON
app.use(express.urlencoded({ extended: true })); //phân tích các request có payload được mã hóa URL, từ các form HTML

//code mo hinh MVC, thiết lập view engine cho ứng dụng
configViewEngine(app);

app.use("/v1/api", apiRoutes);
app.use("/", getHomepage);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Đường dẫn tuyệt đối đến thư mục views

const mongoUri = process.env.MONGO_DB_URI;
if (!mongoUri) {
  console.error("MONGO_DB_URI is not defined");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
