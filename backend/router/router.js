const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
// schema 
const AllUser = require("../db/schema");

//reading the json format
router.use(express.json());

// ==========================
//       SIGN UP
// ==========================

router.post('/signup',async(req,res)=>{
    try{
        var {name, email, usertype, password, cpassword} = req.body;
        if(!name || !email || !usertype || !password || !cpassword){
            return res.status(422).json({error:"plz fill all the fields"});
        }
        
        console.log(req.body);
        const userexist = await AllUser.findOne({email:email});
        if(userexist){
            return res.status(422).json({error:"user already exist"});
        }
        if(password!==cpassword){
            return res.status(422).json({error:"password doesn't match"});
        }

        const alluser = new AllUser({name,email,usertype,password,cpassword});
        await alluser.save();
        res.status(201).json({error:"user registered successfully!"});

    }catch(err){
        res.send(err).status(400);
    }
})


router.post('/login',async(req,res)=>{
    try{
        const {email,password,usertype} = req.body;
        if(!email || !password || !usertype){
            return res.json({error:"please fill the field"});
        }
        const userLoginFind = await AllUser.findOne({email:email});
        if(!userLoginFind){
            return res.json({error:"invalid details"});
        }

        const isMatch = await bcrypt.compare(password,userLoginFind.password);
        if(isMatch){
            res.json({message:"login successfully"});
        }else{
            res.json({error:"invalid details"});
        }

    }catch(e){
        res.status(400).send(e);
    }
})


module.exports = router;