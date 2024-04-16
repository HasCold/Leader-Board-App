const express = require ("express");

const app = express();

app.use(express.json());  // To accept the JSON data from frontend

app.post("/processData", (req, res) => {
    console.log(req.body);
    res.send("Data Recieved");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Consumer Server is running on ${PORT}`)
});