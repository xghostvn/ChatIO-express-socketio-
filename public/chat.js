
$(function(){

        var socket = io.connect('http://localhost:3000');

        var username = $('#username');
        var chatroom = $('#chatroom');
        var send_username = $('#send_username');
        var send_message = $('#send_message');
        var message = $('#message');
        var feedback = $('#feedback');

        send_message.click(function(){
                socket.emit('new_messages',{message :message.val()});
        });


        socket.on('new_messages',(data)=>{
                console.log('send messages');
                chatroom.append("<p class='message'>"+data.username + ":" + data.message + "</p>");

        });

        send_message.click(function(){

                var new_username = username.val();
                        if(new_username){
                                socket.emit('change_username',{username:new_username});
                        };

             
        });

        socket.on('change_username',(data)=>{
                chatroom.append("<p class='message'>"+data.username + "change username to" +data.new_username+ "</p>");   
        });


        message.bind('keypress',()=>{
                socket.emit('typing',{username:username.val()});
        });

        socket.on('typing',(data)=>{
                     feedback.html('<p><i>'+data.username + "is typing a message....." +"<i></p>");   
        });



        





});

