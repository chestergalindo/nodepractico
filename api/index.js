const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const config = require ('../config')
const user = require ('../components/user/network')
const auth = require ('../components/auth/network')

app.use(bodyParser.json())
// Router
app.use('/api/user',user)
app.use('/api/auth',auth)

app.listen (config.api.port, ()=>{
  console.log('puerto listend in port', config.api.port)
})
