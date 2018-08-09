var express = require('express');
var app  = express();

const PORT = process.env.PORT || 3000;


app.get('/',(req,res)=>{
        res.render('index.ejs');
})


var server = app.listen(PORT,()=>{
    console.log('server start port 3000');
});





app.use(express.static('public'));
app.set('view engine','ejs');

app.set('views','./views');


var io = require('socket.io')(server);


io.on('connection',(socket)=>{

        console.log('new user connected');
        socket.username = "Anonymous";

        socket.on('new_messages',(data)=>{

                io.sockets.emit('new_messages',{message:data.message,username:socket.username});

        });

        socket.on('change_username',(data)=>{
           
            socket.broadcast.emit('change_username',{username:socket.username,new_username:data.username});
            socket.username=data.username;
                

        });

        socket.on('typing',(data)=>{

                socket.broadcast.emit('typing',{username:data.username});

        });

});


