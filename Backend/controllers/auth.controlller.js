import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utills/error.js";
import jwt from "jsonwebtoken";

export const signup = async(req,res,next)  =>{

  const {username,email,password} = req.body; 
  const hashedPassword = bcryptjs.hashSync(password,10); //hash the password
  const newUser =new User({  //create a new user
    username,
    email,
    password:hashedPassword
  });  
  try{
    await  newUser.save();
    res.json({
      message: 'User created successfully'
    });
  }catch(error){
    next(error);
  }
 
}
export const signin = async(req,res,next) => {
  const {email,password} = req.body;
  try{
    const validUser =await User.findOne({email});
    if(!validUser){
      return next(errorHandler(404,'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
      return next(errorHandler(401,'Invalid password'));
    }
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    const {password:pass,...rest} = validUser._doc;
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
  }catch(error){
    next(error); 
  }
};

export const google = async(req,res,next) => {
  try{
    const user =await User.findOne({email:req.body.email});
    if(user){
      const token =jwt.sign({id:user._id},process.env.JWT_SECRET);
      const {password:pass,...rest} = user._doc;
      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    }
    else{
      const generatedPassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8); 
      const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
      const newUser = new User({
        username:req.body.name.split('').join('').toLowerCase() + Math.random().toString(36).slice(-4),
        email:req.body.email,
        password:hashedPassword,
        avatar:req.body.photo
      }); 
      await newUser.save();
      const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      const {password:pass,...rest} = newUser._doc;
      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);

    }
  }
  catch(error){
    next(error);
  }
}

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'User has been signed out' });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    // Check if the user exists before attempting to delete
    const userExists = await User.findById(userId);
    if (!userExists) {
      return next(errorHandler(404, 'User not found'));
    }
    
    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    
    // Clear the authentication cookie
    res.clearCookie('access_token');
    
    // Log the deletion for audit purposes
    console.log(`User deleted: ${userId}`);
    
    // Return success response
    res.status(200).json({ 
      success: true,
      message: 'User has been deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    next(error);
  }
};
 