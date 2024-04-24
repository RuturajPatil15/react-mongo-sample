const express = require("express");
const Router = express.Router();
const User = require("../Models/Users");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret = "IamRuturajPatilWebDeveloper"

Router.post(
    "/signupuser",
    [
      //validation
      body("email").isEmail(),
      // name must be at least 5 chars long
      body("name").isLength({ min: 5 }),
      // password must be at least 5 chars long
      body("password", "password at least 8 characters long").isLength({ min: 8 }),
      body("confirmpassword", "password at least 8 characters long").isLength({ min: 8 })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const salt = await bcrypt.genSalt(10);
      let securePassword = await bcrypt.hash(req.body.password, salt);
      let securePassword2 = await bcrypt.hash(req.body.confirmpassword, salt);
  
      try {
        const data = new User({
          name: req.body.name,
          email: req.body.email,
          password: securePassword,
          confirmpassword: securePassword2,
        });
        
        if(req.body.password !== req.body.confirmpassword){
            return res.status(400).json({ errors: "Try logging with correct Password" });
          }

        // data.save();
        const userData = await data.save();
        req.body.name = userData.name;
        req.body.email = userData.email;
        req.body.password = userData.password;
        req.body.confirmpassword = userData.confirmpassword;

        console.log(data);
        res.json({ success: true });
      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
    }
  );
  
  //Login Data
  Router.post(
    "/loginuser",
    [
      //validation
      body("email").isEmail(),
      // password must be at least 5 chars long
      body("password", "password at least 8 characters long").isLength({ min: 8 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
      }
  
      let email = req.body.email;
      try {
        let userData = await User.findOne({ email });
        if(!userData){
          return res.status(400).json({ errors: "Try logging with correct Email address" });
        }
  
        //bcrypt ka use karke password compare kiya 
        const passwordCompare = await bcrypt.compare(req.body.password, userData.password)
        if(!passwordCompare){
          return res.status(400).json({ errors: "Try logging with correct Password" });
        }
    
        //userdata se id liya or oo user me save kiya(ye payload data)
        const data = {
         user:{
          id: userData.id
         }
        }
  
        const authToken = jwt.sign(data,jwtSecret); 
        return res.json({ success: true ,authToken: authToken});
      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
    }
  );
  
  module.exports = Router;