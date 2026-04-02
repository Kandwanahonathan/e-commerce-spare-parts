const express=require('express');
const app=express()
const cors=require('cors')



app.use(express.json())
app.use(cors())
const userRoute=require('./controller.js')

app.use('/user',userRoute)
app.listen(5000,()=>{
    console.log("server is running on http://localhost:5000");
    
})

