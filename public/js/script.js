const socket = io(); 


/***Chat hecho por el profe */

const d = document;
const chatbox = d.getElementById('chat-box');
const btnSendMsg = d.getElementById('btn-msg');
const mensajes = d.getElementById('mensajes');
const btnClean = d.getElementById('clean-chat')

let user;

Swal.fire({
    title: 'Identificate wacho',
    text:'Quien sos vo?',
    input: 'text',
    imageUrl:'https://www.mubis.es/media/articles/11038/110788/datos-de-dos-tontos-todavia-mas-tontos-en-blu-ray-original.jpg',
    inputValidator: (value) => {
        return !value && 'Que te haces el misterioso. Pone tu nombre.'
    },
    allowOutsideClick: false,
}).then((result) => {
    user = result.value
    console.log('Usuario: ', {user});
    socket.emit('new_user', {user});
});

socket.on('messageLogs', data => {
    
    console.log('data ', data);

    const messages = data.map((message) => {
        return `<p class="p-mensajes-chat">${message.user} dice: ${message.message}</p>`
    });

    mensajes.innerHTML = messages;
});

socket.on('user_connected', data => {
    swal.fire({
        title: 'Nuevo usuario conectado',
        text: `${data.user} se acaba de conectar`,
        toast: true,
        position: 'top-right'
    })
});


d.addEventListener('click', (e) => {
    if(e.target === btnSendMsg){
        e.preventDefault();
        if(chatbox.value.trim().length > 0){
            socket.emit('message', {
                user: user,
                message: chatbox.value,
            });

            chatbox.value = ''
        }
    }

});