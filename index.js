const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"boost"
})

app.get("/details",(req,res) =>{
    const sql ="SELECT * FROM userlogs"

    db.query(sql,(err,data) =>{
        if(err) {
            return res.json(err)
        }
        else{
            return res.json(data)
        }
    })
})



app.post("/login",(req,res) =>{
    const sql = "SELECT * FROM userlogs WHERE name = ? && password = ?"
    const values = [
        req.body.name,
        req.body.password
    ]
    db.query(sql,values,(err,data) =>{
        if(err) return res.send(err)
        if(data.length > 0){
            return res.send("success")
        }else{
            return res.send("failed")
        }
    })
})


app.post("/registers",(req,res) =>{
    const sql = "INSERT INTO userlogs (name,email,password) VALUES(?,?,?) "
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,values,(err,result) =>{
        if(err) return res.send(err)
        return res.send("success")
    })

})


app.listen(3000,()=>{
    console.log("server running at port:3000....")
})

