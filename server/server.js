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
    })
    
})




server.listen(port,()=>console.log(`connected at ${port}`))

