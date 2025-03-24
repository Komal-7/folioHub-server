const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const allRoutes = require("./routes/routes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/v1", allRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));