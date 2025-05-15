import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser  from 'cookie-parser'
import  connectDB from './config/mongodb.js'
import authRous from './routes/authRouts.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true}))


app.get("/",(req,res)=>{
 res.json()
})

app.use("/api/auth" , authRous)

app.listen(port, ()=>{console.log(`Server Started on ${port}`)
})