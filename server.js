var express = require('express');
var app = express();
var fs  = require('fs');
var path = require("path");
const os = require('os');
var cors = require('cors')
var kix = require('./kix/jay')
const TOKEN = require('./config/security');

const kixer= new kix();


app.use(cors())

app.get('/keys', function (req, res) {
    const auth  = req.headers.auth ? req.headers.auth : '' ;
    if(kixer.u(auth) !== TOKEN ){
        res.send('You are not Authorized to connect.')
    }
    var absolutePath = path.resolve(os.homedir()+"/.ssh/authorized_keys");
    var keys = fs.readFileSync(absolutePath)
    res.send(keys);
 })

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})