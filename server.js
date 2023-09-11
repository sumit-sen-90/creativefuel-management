require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path")
require("./config/database").connect();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


//User routes
const userRouter = require("./routes/testRoutes");
app.use("/test", userRouter);

const testTypeRouter = require("./routes/testTypeRoutes");
app.use("/test-type", testTypeRouter);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
