const path =require('path');
const http=require('http');
const socketIO=require('socket.io');
const express=require('express');
const port= process.env.PORT||3000
const app=express();
var server=http.createServer(app);
var io=socketIO(server);
const staticPath=path.join(__dirname,'../public')

app.use(express.static(staticPath));

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    });
    socket.on('createEmail',(newEmail)=>{
        console.log("Create email",newEmail);
    });
    socket.emit('newMessage',{
        from:"screen.r@gmail.com",
        text:"vbskjbsdbkjs",
        createdAt:new Date().getTime(),
    });
    socket.on('createMessage',(message)=>{
        console.log(message);
        
    })
    
})




server.listen(port,()=>console.log(`connected at ${port}`))

