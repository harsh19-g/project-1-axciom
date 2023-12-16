const express = require("express");
const app = express();
const PORT = 3000;


require('./db/connect');
 
const router = require("./router/router");
app.use(router);

app.listen(PORT,()=>{
    console.log("running at "+PORT);
})