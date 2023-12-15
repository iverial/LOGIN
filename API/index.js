const app = require("./src/app.js")
const connectDB = require("./src/db.js")

const PORT = 3001;

connectDB()
app.listen(PORT, () => {
    console.log("listening on port", PORT);
})

