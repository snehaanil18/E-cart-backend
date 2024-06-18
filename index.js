require('dotenv').config(); //Loads .env file contents into process.env by default.

const express = require('express')
const cors = require('cors')

const db = require('./Connection/db')

const ecartServer = express();

const router = require('./Router/router')

ecartServer.use(cors())
ecartServer.use(express.json())
ecartServer.use(router)

const port = 3000 || process.env.PORT 

ecartServer.listen(port,() => {
    console.log('E-Cart server listening on port '+port);
})

ecartServer.get('/',(req,res) => {
    res.send('E-Cart Server Started');
})