const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://collegeProject20003:itsallright@cluster0.tlokbgq.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("connection stablished"))
.catch((e)=>{
    console.log(e);
});