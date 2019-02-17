const path =require('path');
const http=require('http');

const express=require('express');
const app=express();
var server=http.createServer(app);
const socketIO=require('socket.io');


const port= process.env.PORT||3000


var io=socketIO(server);

const staticPath=path.join(__dirname,'../public')

app.use(express.static(staticPath));

const {getMessage}=require('./util/message');


io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    });
    socket.emit('newMessage',getMessage('admin','Welcome to chat'))
    socket.broadcast.emit("newMessage",getMessage('admin','new User joined'));
    
    // socket.on('createEmail',(newEmail)=>{
    //     console.log("Create email",newEmail);
    // });
    // socket.emit('newMessage',{
    //     from:"screen.r@gmail.com",
    //     text:"vbskjbsdbkjs",
    //     createdAt:new Date().getTime(),
    // });
    // socket.broadcast.emit('newMessage',{
    //         from:"screen.r@gmail.com",
    //         text:"vbskjbsdbkjs",
    //         createdAt:new Date().getTime(),
    // })
    socket.on('createMessage',(message,callback)=>{
        console.log(message);
        io.emit('newMessage',getMessage(message.from,message.text));
        callback('This is from string');
    });
    
})




server.listen(port,()=>console.log(`connected at ${port}`))

