const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://AdityaVerma:vermaaytida151730@cluster0.3gssvoz.mongodb.net/login"
  )
  .then(() => {
    try {
      console.log("Connection Established");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  });
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const userModel = mongoose.model("Login", userSchema);
module.exports = userModel;
