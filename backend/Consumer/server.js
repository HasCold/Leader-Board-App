const express = require ("express");
const cors = require ("cors");
const {Server} = require ("socket.io");
const http = require ("http");
const Redis = require ("ioredis");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());  // To accept the JSON data from frontend
// app.use(express.urlencoded({extended: true}));

// const _io = new Server(app.listen(5000, () => {
//     console.log('Consumer running on port 5000');
// }), {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });
const _io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

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
    const groupInfo = await redisClient.xinfo("GROUPS", streamName);
    if(groupInfo.length === 0){
        redisClient.xgroup("CREATE", streamName, groupName, '$', (err) => {
            if(err){
            console.error("CREATE Err :", err);
            } 
            console.log(`Consumer group is created succesfully with name as ${groupName} corresponding to stream ${streamName}`)
        });
    }
}

// Function Invoke
createConsumerGrp().then(() => {
    listenToMessages();
});


// XREADGROUP GROUP group consumer [COUNT count] [BLOCK milliseconds]   [NOACK] STREAMS key [key ...] id [id ...]
// . If the ID is the special ID > then the command will return only new messages never delieverd to other consumers so far and as the side effect will update the consumer group's last ID. 

function listenToMessages(){

    try {
    redisClient.xreadgroup("GROUP", groupName, "ConsumerName", "BLOCK", "500", "STREAMS", streamName, ">", (err, result) => {  // The BLOCK will be 500 so that the thread will process the data(messages) stream after you take some break in between the thread will then continue your process after 500 ; It also helps in avoiding the Long Polling by the user

        if(err){
            console.log("READ Err :-", err);
            setTimeout(() => {
                listenToMessages();
            }, 1000);
            return;
        }

        if(result && result.length > 0){
            const stream = result[0];
            const messageId = stream[1][0][0];
            const message = stream[1][0][1];
            console.log("Message :-", message);
            // console.log("Result :-", stream[1][0][1]);  // Result :- [ 'playerId 81', '52' ]
        redisClient.xack(streamName, groupName, messageId, async (err) => {  // ack means message perfectly processed
            if(err){
                console.error("Message Not Processed :-", err);
            }else{
                const data = await redisClient.hget("players", message[0]);
                const player = JSON.parse(data);   // Our data is serialize(Converting the data in that format which is easily stored, acceptable, secure, transmitted or reconstructed later) so we do the JSON.parse

                const substrID = message[0].substring("playerId".length).trim();

                if(player.playerId === substrID){
                // message[1] contains score and we are aggregating the existing score with the score that we recieved in the message.
                player.score = player.score + Number(message[1]);
                await redisClient.hset("players", `playerId ${player.playerId}`, JSON.stringify(player));
                _io.emit("player-event", player);
                
                // _io.on("connection", (socket) => {
                //     console.log("User is connected");
                    
                    // socket.on("event:player-event", (data) => {
                        //     console.log("Player event:", data);
                        //     // Handle player event here
                        // });
            // });
        }}
            listenToMessages();
        });
    }else{
        listenToMessages();        
    }
})} catch (error) {
    console.error("Error :- ", error.message);  
}}

app.post("/processData", (req, res) => {
    console.log(req.body);
    res.send("Data Recieved");
});

server.listen(5000, () => {
    console.log('Consumer Server is running on port 5000');
})