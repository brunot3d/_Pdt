const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);


//socket.io
io = require('socket.io').listen(http);

io.on('connect', function(socket){
  console.log('usuario conectado');
  socket.on('hit', function(hit){
    socket.broadcast.emit('acesso', hit)
  });

});


//mongosse
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pdt', {useMongoClient: true});



app.set('view engine', 'ejs');
app.set("views", "./app/views");
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended:true}));

const indexRoute = require('../app/routes/index')(app);
const dshboardRoute = require('../app/routes/dshboard')(app);
const randomRoute = require('../app/routes/random')(app);
const zeraViews = require('../app/routes/zeraViews')(app);
const apagaLog = require('../app/routes/apagaLog')(app);



module.exports = http;
