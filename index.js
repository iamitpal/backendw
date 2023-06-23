const express = require("express")
const cors = require("cors")
const connection = require("./config/db")
const userRouter = require("./routes/user.routes")
const CsvParser = require("json2csv").Parser

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Homepage is here")
})

app.use("/api", userRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connection
    console.log(`Successfully connected with Database`)
  } catch (error) {
    console.log(`Error`, error)
  }
  console.log(`Server is running on`, process.env.PORT)
})
