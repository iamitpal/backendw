const express = require("express")
const userModel = require("../model/users.model")
const CsvParser = require("json2csv").Parser

const userRouter = express.Router()

userRouter.post("/user/add", async (req, res) => {
  try {
    const payload = req.body
    const product = new userModel(payload)
    await product.save()
    res.send({ Msg: "User Added Successfully" })
  } catch (error) {
    res.send({ Msg: "Error while adding Product", error: error.message })
  }
})

userRouter.get("/user", async (req, res) => {
  try {
    let data = await userModel.find()
    res.send(data)
  } catch (error) {
    console.log(error)
    res.send({ err: "Something went wrong in GET" })
  }
})

userRouter.get("/user/exportcsv", async (req, res) => {
  try {
    let users = []

    let data = await userModel.find()

    data.forEach((user) => {
      const { name, email, gender, status } = user

      users.push({ name, email, gender, status })
    })

    const csvFields = ["NAME", "EMAIL", "GENDER", "STATUS"]
    const csvParser = new CsvParser({ csvFields })
    const csvData = csvParser.parse(users)

    res.setHeader("Content-Type", "text/csv")
    res.setHeader("Content-Disposition", "attachment:filename=usersData.csv")
    res.status(200).end(csvData)
  } catch (error) {
    console.log(error)
    res.send({ err: "Something went wrong in GET", error })
  }
})

userRouter.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params //PARAM For Single Data
    const data = await userModel.find({ _id: id })
    res.send(data)
  } catch (error) {
    res.send({ Msg: "Error while adding Product", error: error.message })
  }
})

userRouter.delete("/user/delete/:id", async (req, res) => {
  let id = req.params.id
  try {
    await userModel.findByIdAndDelete({ _id: id })
    res.send({ Msg: `Product w/ id ${id} has been Deleted Successfully` })
  } catch (error) {
    res.send({ Msg: "Error while Deleting Product", error: error.message })
    console.log(error)
  }
})

userRouter.patch("/user/update/:id", async (req, res) => {
  let id = req.params.id
  let payload = req.body
  try {
    await userModel.findByIdAndUpdate({ _id: id }, payload)
    res.send({ Msg: `Product w/ id ${id} has been Updated Successfully` })
  } catch (error) {
    res.send({ Msg: "Error while updating Product", error: error.message })
    console.log(error)
  }
})

module.exports = userRouter
