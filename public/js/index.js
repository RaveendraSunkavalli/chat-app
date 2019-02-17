

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
    console.log("New Message:",message);
    var li=jQuery("<li></li>");
    li.text(`${message.from}:${message.text}`);
    $('#message').append(li);
    
})

// socket.emit('createMessage',{
//     from:"Ravi",
//     text:"hai"
// },function (msg) {
//     console.log('got it ',msg);
// })

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',{
        from:"user",
        text:jQuery('[name=message]').val()
    },function(){

    })
})