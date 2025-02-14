const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConfig");
const dotenv = require("dotenv").config()

connectDB()

const port = process.env.PORT || 5000;
const app = express()



app.use(express.json())
// contact apis
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on post ${port}`))