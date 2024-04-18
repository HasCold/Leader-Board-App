const express = require ("express");
const cors = require ("cors");
const Redis = require ("ioredis");

const app = express();

app.use(cors());
app.use(express.json());  // To accept the JSON data from frontend
app.use(express.urlencoded({extended: true}));

const redisClient = new Redis();

redisClient.on("ready", () => {
    console.log("Redis Consumer Server is Successfully Running")
});

redisClient.on("error", (error) => {
    console.log("Redis Connection Error : ", error.message);
});

// Check Group info using xinfo method
// Create consumer group xgroup
// Read consumer
// xack (Acknowledge method is called mean our data has been processed successfully)

const streamName = "myStream";
const groupName = "consumerGroup";

// XGROUP is used in order to create, destroy and manage consumer groups.
// XREADGROUP is used to read from a stream via a consumer group.
// XACK is the command that allows a consumer to mark a pending message as correctly processed.
async function createConsumerGrp(){
    const groupInfo = await redisClient.xinfo("GROUPS", streamName, )
    if(groupInfo.length === 0){
        redisClient.xgroup("CREATE", streamName, groupName, '$', (err) => {
            if(err) console.error(err);
        })

        console.log(`Consumer group is created succesfully with name as ${groupName} corresponding to streams ${streamName}`)
    }
}

createConsumerGrp();

app.post("/processData", (req, res) => {
    console.log(req.body);
    res.send("Data Recieved");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Consumer Server is running on ${PORT}`)
});