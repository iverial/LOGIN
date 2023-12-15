const mongoose = require("mongoose");
const app = require("./app");

const user = "";
const password = "";
const uri = "";

const connectDB = async () => {
  try {
    await mongoose
  .connect("mongodb://127.0.0.1:27017/login-desdecero", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console(e));
  } catch (error) {
    console.log({error: error.message})
  }
  
}

module.exports = connectDB

