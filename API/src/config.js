require("dotenv").config();

const TOKEN_SECRET = process.env.JWT_KEY

module.exports = {TOKEN_SECRET}