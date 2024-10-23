

import bcrypt from "bcryptjs";
import User from '../models/user.models.js'; // Adjust the path as necessary
import genrateTokenAndSetCookie from "../utils/generateToken.js";

//signup
export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmpassword, gender } = req.body;

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if username already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }



        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);



        // Profile picture URLs based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user object
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        // Save new user to the database
        if(newUser){
         genrateTokenAndSetCookie(newUser._id,res);
        await newUser.save();

        // Respond with user data
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    }else{
        res.status(400).json({error:"Invalid user data"})
    }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};






export const login=async(req,res)=>{
  try{
const {username,password}=req.body;
const user=await User.findOne({username});
const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");

if(!user || !isPasswordCorrect){
    return res.status(400).json({error:'Invalid username or password'});
}


genrateTokenAndSetCookie(user._id,res);


res.status(200).json({
    _id:user._id,
    fullName:user.fullName,
    username:user.username,
    profilePic:user.profilePic,
});
  }
  catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
}


}



export const logout=(req,res)=>{
 try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
 } 
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
 }
}