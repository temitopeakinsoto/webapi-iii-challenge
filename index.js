const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', (req, res) => {
    res.status(200).json({
        message: "Hello, World!"
    })
})

app.listen(process.env.PORT || 5000, () => {
  console.log("server running on port " + (process.env.PORT || 5000));
});
