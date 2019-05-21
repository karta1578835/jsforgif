var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// 加入線上人數計數
var onlineCount = 0;

/*app.get('/', function(req, res){
  res.sendFile(__dirname + '/index-chat0.html');
});*/

app.get ('/', function (req, res){
  res.sendFile(__dirname + '/index-chat02.html');
});

app.get ('/change', function (req, res){
  let name = req.query.name;
  console.log (name + ' is on ...');
  res.sendFile(__dirname + '/index-chat0.html');
});


io.on('connection', function(socket){  // connection is same as connect
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
///////////////////
    // 有連線發生時增加人數
    onlineCount++;
    // 發送人數給網頁
    io.emit("online", onlineCount);
 
    socket.on("greet", () => {
		socket.emit("greet", onlineCount);
    });
 
    socket.on('disconnect', () => {
        // 有人離線了，扣人
        onlineCount = (onlineCount < 0) ? 0 : onlineCount-=1;
        io.emit("online", onlineCount);
    });
///////////////////////
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});