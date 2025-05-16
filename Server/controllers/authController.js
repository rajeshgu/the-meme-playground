import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel  from '../models/userModel.js'

export const register =async (req,res)=>{
  const {name , email , password } = req.body

  if(!name || !email || !password){
    return res.json({success:false , message: "missing details"})
  }

   try{
        const existinguser = await userModel.findOne({email})
        if(existinguser){
          return res.json({success:false, message:"user already exists"})
        }
      const hashedPassword = await bcrypt.hash(password,10)  
       
       const user =new userModel({name, email,password:hashedPassword})
       await user.save()
            
       const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn : '7d'
       })
   
        res.cookie('token',token , {
            httpOnly:true ,
            secure: process.env.NODE_ENV ==='production',
            sameSite: process.env.NODE_ENV ==='production'? 'none':"strict",
            maxAge : 7*24*60*60*1000
        })
        return res.json({success:true})
   }catch(e){
     res.json({success:false, message:e.message})
   }
}


export const login =async (req,res)=>{
      
    const {email,password} = req.body

    if(!email || !password){
       res.json({seccess:false, message:'Email and Password is required'})
    } 
    try{
      const user = await  userModel.findOne({email})
       if(!user){
        res.json({seccess:false, message:'Invalid Email'})
       }
          const isMatch = await bcrypt.compare(password , user.password)
         
          if(!isMatch){
            res.json({seccess:false, message:'Invalid password'})
          }
      
          const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn : '7d'
           })
       
            res.cookie('token',token , {
                httpOnly:true ,
                secure: process.env.NODE_ENV ==='production',
                sameSite: process.env.NODE_ENV ==='production'? 'none':"strict",
                maxAge : 7*24*60*60*1000
            })

      return res.json({success:true})
    }catch(e){
      res.json({seccess:false, message:e.message})
    }
}


export const logout =async (req,res)=>{
    try
    {
      res.clearCookie("token",{
        httpOnly:true ,
        secure: process.env.NODE_ENV ==='production',
        sameSite: process.env.NODE_ENV ==='production',
      })
  return res.json({success:true , message:'Logged Out'})
    }catch(e){
        res.json({success:false,message:e.message})
    }
}