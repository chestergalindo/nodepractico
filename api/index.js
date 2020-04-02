const express = require ('express')
const app = express()
const config = require ('../config')
const user = require ('../components/user/network')


// Router
app.use('/api/user',user)

app.listen (config.api.port, ()=>{
  console.log('puerto listend in port', config.api.port)
})
