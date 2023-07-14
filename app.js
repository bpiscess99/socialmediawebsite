// // making server with the help of nodejs instead of expressjs

// const http = require("http");
// const server = http.createServer((req, res) => {
//     console.log("server created");
//     res.end("hello world")

// });

// server.listen(5000, "localhost", () => {
//     console.log("server is running on 5000")
// }); // mostly ports are busy that's we use 3000 or 5000 port 

// making server with the help of express

// const express = require("express");
// const data = require("./data");
// const app = express();
// const PORT = 5000
// const cors = require("cors");

// app.use(cors());



// app.get("/", (req, res) => {
//     res.json(data);
// });
// app.get("/about", (req, res) => {
//     res.json("About Page");
// });

// app.listen(PORT, () => {
//     console.log(`server is running on ${PORT}`);
// });

const dotenv = require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute")
const cors = require("cors");
const errorHandler = require("./Middleware/errorMiddleware");
const bodyParser = require("body-parser")
// const cookieParser = require("cookie-parser")
const postRoute = require("./routes/postRoute")
const path = require("path")



const app = express();

// Middleware
app.use(express.json()); // this is necessary because through this detail will show in json & should be up before below 
// app.use(cookieParser());
app.use(express.urlencoded({extended: false})); // this is necessary otherwise there would request error in insomia
app.use(cors()) // if our frontend in localhost:3000 & backend localhost 5000. it will help to start our server in browser other we will get the error
app.use(bodyParser.json()) // it will help us to send the request from frontend to data base

// Routes Middleware

app.use("/api/users", userRoute); // this path for adding the detail in data base through insomnia or thunderclient
app.use("/api/createpost", postRoute)

// Routes (once we will write frontend deployement code here then below file we will skip)
// app.get("/", (req, res) => {
//    res.send("Hello Server")
// });


// serving the frontend folder (once we will change in frontend npm run build folder again we will run)
app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err){
            res.status(500).send(err)
        }
    )
})


// errorMiddleware

app.use(errorHandler);

// connect to Mongodb
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI) 
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    })
})
.catch((err) => console.log(err))




