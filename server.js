const express = require('express')
const app = express()

//route
app.get('/',(req, res) => {
    res.send('hello api')
  
})

app.listen(3000,() => {
 console.log('Node Api is running on port 3000')
} )