import { Router } from "express";
import { FileManager } from '../data/db.js';
const usuarioManager = new FileManager('./data/data.json');  
import { validarUsuario, validarUsuarioParcial } from '../data/validacion.js';
import { avatarUploader } from "../utils/avatarUploader.js";

const route = Router();

/**Aplicación de middleware en ruteo a modo de ejemplo */

route.use(async (req, res, next) => {
    console.log(req.url, Date.now());
    next();
});

/************************************************ */


route.get('/', async (req, res) => {
    const query = req.query;
    const entries = Object.entries(query);

    const todosLosUsuarios = await usuarioManager.getAll();

    if(entries.length === 0){
        return res.send({usuarios: todosLosUsuarios});
    }

    
    const filtrados = todosLosUsuarios.filter((user) => {
        return entries.every(([clave, valor]) => user[clave] == valor);
    });

    res.send({usuarios: filtrados});

});

route.get('/:idUsuario', async(req, res) => {
    const idUsuario = req.params.idUsuario;
    const usuario = await usuarioManager.get(idUsuario);

    if(!usuario){
        res.status(404).send({error: `Usuario con id ${idUsuario} no encontrado`});
        return;
    }
    res.send(usuario);
});


route.post('/', avatarUploader.single('file'), async(req, res) => {
    const usuario = req.body;
    const file = req.file?.filename;

    console.log({usuario, file});

    const esValido = validarUsuario(usuario);

    if(!esValido){
        res.status(400).send({
            error: 'Datos inválidos',
        });
        return;
    }

    const id = await usuarioManager.crear({...usuario, thumbnail: file});
    console.log(usuario);
    res.status(201).send({id});
});


route.put('/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;

    const usuario = await usuarioManager.get(idUsuario);

    if(!usuario){
        res.status(404).send({error: `Usuario con id ${idUsuario} no encontrado`});
        return;
    }

    const nuevosDatos = req.body;
    const esValido = validarUsuario(nuevosDatos);

    if(!esValido){
        res.status(400).send({
            error: 'Datos inválidos',
        });
        return;
    }
   
    await usuarioManager.modificar(idUsuario, nuevosDatos);

    res.send({ok: true});
} );


route.patch('/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;

    const usuario = await usuarioManager.get(idUsuario);

    if(!usuario){
        res.status(404).send({error: `Usuario con id ${idUsuario} no encontrado`});
        return;
    }

    const nuevosDatos = req.body;
    const esValido = validarUsuarioParcial(nuevosDatos);

    if(!esValido){
        res.status(400).send({
            error: 'Datos inválidos',
        });
        return;
    }
   
    await usuarioManager.modificar(idUsuario, nuevosDatos);
    res.send({ok: true}); 
} );

route.delete('/:idUsuario', async (req, res) => {
    const idUsuario = req.params.idUsuario;

    const usuario = await usuarioManager.get(idUsuario);

    if(!usuario){
        res.status(404).send({error: `Usuario con id ${idUsuario} no encontrado`});
        return;
    }

    await usuarioManager.eliminar(idUsuario);

    res.send({ok: true});
    
});

export default route;