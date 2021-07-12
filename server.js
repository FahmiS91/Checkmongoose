const express=require('express')
const app=express()

const personRouter=require('./routes/personRouter')


const mongoose=require('mongoose')
require('dotenv').config({ path: './config.env' })
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('connected to data base ')).catch((error)=>console.log(error.message))

app.use(express.json())

app.use('/person',personRouter)

const PORT=process.env.PORT || 4000
app.listen(PORT,error=>error ? console.log(error):console.log("server runing on port",PORT))







