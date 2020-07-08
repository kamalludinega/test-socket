var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/testsocket', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/testsocket', function (req, res) {
  console.log(req.body.data);
  const data = req.body.data
  if (io) {
    io.emit('testsocket', data);
    return res.json({ error: false, data })
  }
  return res.json({ error: true, data })
});

io.on('connection', function (socket) {
  console.log('user connected')
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
