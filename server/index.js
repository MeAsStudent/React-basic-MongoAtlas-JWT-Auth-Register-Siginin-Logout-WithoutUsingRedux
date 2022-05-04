const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose=require("mongoose")

dotenv.config({ path : './config.env' })

app.use(express.json());
app.use(require('./router/auth'));

mongoose.connect(process.env.DB)
.then(()=>console.log("database is connected successfully"))
.catch((err)=>console.log("err is",err))

const port=process.env.PORT
app.listen(port,()=>console.log(`server is running on port ${port}`))
