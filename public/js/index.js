

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

socket.on('newLocationMessage',function (msg) {
    var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My Current position</a>')
    li.text(`${msg.from}: `);
    a.attr('href',msg.url);
    li.append(a);
    $('#message').append(li);

})

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    var messageText=jQuery('[name=message]');
    socket.emit('createMessage',{
        from:"user",
        text:messageText.val()
    },function(){
        messageText.val('');
    })
})

var locationButton=jQuery('#sendLocation');
locationButton.on('click',function () {
    if(!navigator.geolocation){
        return alert('not supporting');
    }
    locationButton.attr('disabled','disabled').text("Sending location.....")
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text("send location")
        console.log(position);
        socket.emit('createLocationmessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },function () {
        locationButton.removeAttr('disabled').text("send location")
        alert('unable to connect');
    })
})