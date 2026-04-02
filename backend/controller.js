const conn=require('./conn.js')
const express=require('express')
const route=express.Router()

 route.post('/register',(req,res)=>{
    const{name,email,password}=req.body;
    const role="customer";
    const sql="INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)";

    conn.query(sql,[name,email,password,role],(err,result)=>{
        if (err) 
            return res.status(501).json({message:"your insert failed",Error:err})
            return res.json(result)
    })
})

/// Login to api i think you may first look to the reg
route.post('/login',(req,res)=>{
    const{email,password}=req.body
    const sql="SELECT *FROM users WHERE email=? AND password=?";
    conn.query(sql,[email,password],(err,result)=>{
       if (err) {
        return res.status(501).json({message:"failed to inserted"})
       }
       if (result.length===0) {
        return res.status(401).json({message:"unauthorized access"})
       }
       const user=result[0]
            res.json({
                message:`welcome ${user.name}`,
                user:{
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    
                }
            })
        })

})
module.exports=route;