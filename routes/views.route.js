import { Router } from "express";
import { FileManager } from '../data/db.js';
const usuarioManager = new FileManager('./data/data.json');   

const route = Router();

route.get('/', (req, res) => { 

    const {role} = req.query;
    const food = [
        {
            nombre: 'Manzana',
            precio: 520
        },
        {
            nombre: 'pera',
            precio: 400
        },{
            nombre: 'Durazno',
            precio: 650
        },{
            nombre: 'Frutilla',
            precio: 890
        },
    ]

    res.render('index', {
        nombre: {name:'Gabriel'}, 
        title: 'programación backend',
        admin: role === 'admin',
        food,
        styles: 'styles',
    });
});


route.get('/register', (req, res) => {
    res.render('register', {styles: 'styles'});
});

route.get('/chat', (req, res) => {
    res.render('chat', {styles: 'styles'});
});

route.get('/users/:id', async (req, res) => {
    const user = await usuarioManager.get(req.params.id);
    if(!user){
        res.render('notFound', {
            styles: 'styles',
            entidad: 'usuario',
        });
        return;
    }
    res.render('viewUsuario', {
        styles: 'styles', 
        user,
    });
});

export default route;