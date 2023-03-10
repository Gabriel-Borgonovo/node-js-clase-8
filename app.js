import cookieParser from 'cookie-parser';
import express from 'express';
import usuarioRoute from './routes/usuarios.route.js'; 
import viewsRoute from './routes/views.route.js';
import fileDirName from './utils/fileDirName.js';
import { uploader } from './utils/uploader.js';
import helpers from './lib/helpers.handlebars.js';
import { create } from 'express-handlebars';

import configureSocket from './socket/configure-socket.js';
const {__dirname} = fileDirName(import.meta);

const app = express();


//handlebars partials settings
const hbs = create({
    partialsDir: [
        'views/partials'
    ],
    helpers,
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**Cookie parser middleware de tercero */

app.use(cookieParser());

/**************************************** */

/***Usando y configurando handlebars */

app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

/********************************* */


app.use(express.static(__dirname + '/public'));

app.use('/', viewsRoute);

app.use('/api/usuarios', usuarioRoute);



/**Middleware para el manejo de errores */

app.use((error, req, res, next) => {
    console.error({error});
    res.status(500).send({error: 'Error del servidor no controlado.'});
});
   
/****************************************** */

const port = 8080;
const httpServer = app.listen(port, () => 
    console.log(`Servidor express escuchando en el puerto ${port}`)
);

configureSocket(httpServer); 

/**01:15:19 websocket 2*/ 
