require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const configViewEngine = require("./config/viewEngine")
const apiRoutes = require("./routes/api")
const connection = require("./config/database")
const {getHomepage} = require("./controllers/homeController")

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());//phân tích các request có payload định dạng JSON
app.use(express.urlencoded({extended: true})); //phân tích các request có payload được mã hóa URL, từ các form HTML

//code mo hinh MVC, thiết lập view engine cho ứng dụng
configViewEngine(app)

app.use("/v1/api", apiRoutes)
app.use("/", getHomepage)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Đường dẫn tuyệt đối đến thư mục views


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
