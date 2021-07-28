const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const SALT=10;

router.get("/signup", (req, res, next) => {
    res.render("signup.hbs");
  });


router.post("/signup", async (req,res,next) => {
    try {
        const user= req.body;

        if (!user.password || !user.email) {
            res.render("auth/signup.hbs", {
                errorMessage:"Provide an email and/or a password",
            });
            return;
        }
        const foundUser= await User.findOne({username:username.username});

        if(foundUser){
            res.render("auth/signup.hbs", {
                errorMessage:"Oups error",
            });
            return;
        }
        const hashedPassword = bcrypt.hashSync(user.password,SALT);
        user.password = hashedPassword;
    
        const createdUser = await User.create(user);
    
        res.redirect("/auth/signin");
      } 
      catch (error) {
        next(error);
      }  
    });