var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "http://127.0.0.1:8000",
        credentials: true
    }
});
var users = [];
var Redis = require('ioredis');
var redis = new Redis();

http.listen(8008, function () {
    console.log(`listening on 8005 port`);
});

redis.subscribe('private-channel', function(){
    console.log("subscribe to private channel")
})

redis.on('message', function(channel, message){
    message = JSON.parse(message);
    if(channel === 'private-channel'){
        let data = message.data.data;
        let receiver_id = data.receiver_id;
        let event = message.event;

        io.to(`${users[receiver_id]}`).emit(channel + ':' + message.event, data);
    }
})

io.on('connection', function(socket){
    socket.on("user_connected", function(user_id){
        users[user_id] = socket.id;
        io.emit('updateUserStatus', users);
        console.log("user connected " + user_id )
    });

    socket.on('disconnect', function(){
        var i = users.indexOf(socket.id);
        users.splice(i, 1, 0);
        io.emit('updateUserStatus', users);
        console.log(users)
    });
});
