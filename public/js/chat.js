


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

function scrolltoBottom() {
    var message=$('#message');
    var newMessage=message.children('li:last-child')
    var clientHeigth=message.prop('clientHeigth');
    var scrollTop= message.prop('scrollTop');
    var scrollHeight= message.prop('scrollHeight');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();
    
    if(clientHeigth+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight);
        message.scrollTop(scrollHeight);
        
}

socket.on('newEmail',function (email) {
    console.log("new email",email);
});


socket.on('newMessage',function(message) {
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=$('#message-template').html();
    var html=Mustache.render(template, {
        text:message.text,
        from:message.from,
        createdAt:formattedTime
        
    })
    
    $('#message').append(html);
    scrolltoBottom();
    
})

// socket.emit('createMessage',{
//     from:"Ravi",
//     text:"hai"
// },function (msg) {
//     console.log('got it ',msg);
// })

socket.on('newLocationMessage',function (message) {
    var formattedTime=moment(message.createdAt).format('h:mm a')
    var template=$('#location-message-template').html();
    var html=Mustache.render(template, {
        url:message.url,
        from:message.from,
        createdAt:formattedTime
        
    })
    
    // $('#message').append(html);
    // var li=jQuery('<li></li>');
    // var a=jQuery('<a target="_blank">My Current position</a>')
    // li.text(`${formattedTime}:${msg.from}: `);
    // a.attr('href',msg.url);
    // li.append(a);
     $('#message').append(html);
     scrolltoBottom();

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
        //console.log(position);
        socket.emit('createLocationmessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },function () {
        locationButton.removeAttr('disabled').text("send location")
        alert('unable to connect');
    })
})