import { Server } from 'socket.io';

const messages = [];

export default function configureSocket(httpServer){
    const io = new Server(httpServer);
    io.on('connection', (socket) => {

        socket.on('message', (data) => {
            messages.push(data);
            io.emit('messageLogs', messages);
        });

        socket.on('new_user', (data) => {
            console.log('new_user', data);
            socket.emit('messageLogs', messages);
            
            socket.broadcast.emit('user_connected', data);
        });

    });
}

/**01:25:43*/