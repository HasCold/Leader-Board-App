const express = require ("express");
const cors = require ("cors");
const dotenv = require ("dotenv");
const Redis = require ("ioredis");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());  // To accept the JSON data from frontend
app.use(express.urlencoded({extended: true}));

const redisClient = new Redis();
redisClient.on("ready", () => {
    console.log("Redis Producer Server is Successfully Running");
})

redisClient.on("error", (error) => {
    console.log(error.message);
})

const streamName = "myStream";

app.post("/api/prod/addPlayer", async (req, res) => {
    try {
        const data = req.body;
        if(!data) return res.status(404).json({"message": "Data not provided"});

        await redisClient.hset("players", data);  
        const dataPlayer = await redisClient.hgetall("players");

        res.status(200).send({
            success: true,
            message: "Player Added Successfully",
            dataPlayer
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            sucess: false,
            message: `Error in adding player ${error.message}`
        })
    }
});

app.post("/api/prod/processData", async (req, res) => {
    const data = req.body;
    console.log("Player Info ______", req.body);
    try {

        if(!data) return res.status(404).json({"message": "Data not provided"});
        await redisClient.xadd(streamName, "*", `player ${data.playerId}`, data.score);  

        res.status(200).send({
            success: true,
            message: "Player Added Successfully"
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            sucess: false,
            message: `Error in adding player ${error.message}`
        })
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Producer Server is running on ${PORT}`)
});


// ---------------------------- REDIS COMMAND ------------------------------

// await client.xadd(streamName, "*", "player", JSON.stringify(data));
// In this modified command:

// "*": This tells Redis to generate a unique ID for the message.
// "player": This is the message ID, which you can set to any value you want. It's typically used for identifying different types of messages within the same stream.
// JSON.stringify(data): This is the actual data you want to add to the stream.
