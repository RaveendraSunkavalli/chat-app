const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
process.env.PWD = process.cwd();
const publicPath = process.env.PWD + '\\public';
console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    });
    // socket.on('createEmail',(newEmail)=>{
    //     console.log("Create email",newEmail);
    // });
    // socket.emit('newMessage',{
    //     from:"screen.r@gmail.com",
    //     text:"vbskjbsdbkjs",
    //     createdAt:new Date().getTime(),
    // });
    socket.on('createMessage',(message)=>{
        console.log(message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime(),
        });
    });
    
})




server.listen(port,()=>console.log(`connected at ${port}`))

