const express = require('express');
const User = require('./Schema/userSchema');
const cors = require('cors');
require('./db/config')
const app = express();
app.use(express.json())
app.use(cors())
app.use(require('./Router/router'))
app.get('/',(req,res)=>{
    res.send('Lets Start the project')
})



app.listen(4000,()=>{
    console.log("server is running on 4000");
})
