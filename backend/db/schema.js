const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const allUserDataSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
})

allUserDataSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.password,12);
    }
    next();
})

const alluser = mongoose.model("AllUser",allUserDataSchema);
module.exports = alluser;