const express = require ("express");
const cors = require ("cors");
const dotenv = require ("dotenv");
const Redis = require ("ioredis");

dotenv.config();

const client = new Redis({
    password: process.env.REDIS_CLIENT_PASSWORD,
    host: process.env.REDIS_CLIENT_HOST,
    port: process.env.REDIS_CLIENT_PORT
})

const app = express();

app.use(cors());
app.use(express.json());  // To accept the JSON data from frontend

const streamName = "myStream";

app.post("/prod/api/addPlayer", async (req, res) => {
    const data = req.body;
    console.log("Player Info ______", req.body);
    try {
        await client.xadd(streamName, "player", "*", JSON.stringify(data));
        res.status(200).json({
            sucess: true,
            message: "Player Added Successfully"
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            sucess: false,
            message: `Error in adding player ${error.message}`
        })
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Producer Server is running on ${PORT}`)
});