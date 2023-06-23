const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const userModel = mongoose.model("users", UserSchema)

module.exports = userModel
