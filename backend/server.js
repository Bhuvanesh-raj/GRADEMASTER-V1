const dotenv=require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const PORT=process.env.PORT || 3600;
const cors=require("cors");
const verifyJWT = require("./middleware/verifyJWT");
const verifyRoles = require("./middleware/verifyRoles");
const rolesList=require("./config/rolesList");
const cookieparser=require("cookie-parser");
app.use(cookieparser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const corsOptions = {
    origin:["http://172.20.10.4:3000","http://192.168.227.1:3000","http://localhost:3000"],
    // origin: ['celadon-cendol-c0aba0.netlify.app','localhost:3000'],
    credentials: true
    // optionsSuccessStatus:true // This allows the server to accept cookies from the client
};


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected successfully")).catch(()=>console.log("err occured in connecting db"));
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use("/login",require("./routes/login"));
app.use("/register",require("./routes/register"));
// app.use(verifyJWT);  
app.use("/newgpa",require("./routes/newgpa"));
app.use("/adminsearch",require("./routes/adminsearch"));
// app.use("/refresh",require("./routes/refreshtoken"));
app.use("/addgpa",require("./routes/addgpa"));
app.use("/getTemplate",require("./routes/getTemplate"));
app.use("/addplatform",require("./routes/addplatform"));
app.use("/savegpa",require("./routes/savegpa"));
app.use("/getusergpadata",require("./routes/getusergpadata"));
app.use("/finduser",require("./routes/finduser"));
app.use("/contact", require('./routes/contact'));

app.listen(PORT,()=>{
    console.log(rolesList);
    console.log(`server started at Port ${PORT}`)
});