const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500", // Update this to your client's origin
        methods: ["GET", "POST"]
    }
});

const users = {};
io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        console.log('new user enter:',name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });
})