

var socket=io();
socket.on('connect',function(){
    console.log("connected to server");
    socket.emit('createEmail',{
        fr:"nkjbjhb"
    });
     
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});


socket.on('newEmail',function (email) {
    console.log("new email",email);
});


socket.on('newMessage',function(message) {
    console.log(message);
    
})
