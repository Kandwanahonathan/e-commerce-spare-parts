const mysql=require('mysql2')//import the library help you connect to the database
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"spare_parts"

})//here we just take the the object for the database

conn.connect((err)=>{
    if (err) {
        console.log("enable to connect",err);
        
    }
    else{
        console.log("connected successfully");
        
    }
})

module.exports=conn;