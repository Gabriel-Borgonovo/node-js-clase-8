import fs from 'fs';
import { randomUUID } from 'crypto';
import e from 'express';

export class FileManager{
    constructor(path){
        this.path = path;
    }

    async crear(entidad){
        const id = randomUUID();
        const entidadesYaCargadas = await this.getAll();
        const nuevasEntidades = [...entidadesYaCargadas, {id, ...entidad}];
        const datosStr = JSON.stringify(nuevasEntidades, null, 2);
        await fs.promises.writeFile(this.path, datosStr);
        return id;
    }

    async getAll(){
        try{
            const entidades = await fs.promises.readFile(this.path);
            return JSON.parse(entidades);
        }catch(err){
            console.error(err);
            return [];
        }
    }

    async get(id){
        const todasLasEntidades = await this.getAll();
        const entidadCargada = todasLasEntidades.find((entidad) => entidad.id === id);
        return entidadCargada;
    }

    async modificar(id, datos){
        const entidadCargada = await this.get(id);
        if(!entidadCargada){
            throw new Error('Entidad no encontrada');
        }

        const todasLasEntidades = await this.getAll();

        const entidadModificada = {...entidadCargada, ...datos};

        const entidadesSinLaEntidad = todasLasEntidades.filter((e) => e.id !== id);

        const nuevasEntidades = [...entidadesSinLaEntidad, entidadModificada];

        const datosStr = JSON.stringify(nuevasEntidades, null, 2);

        await fs.promises.writeFile(this.path, datosStr);
    }


    async eliminar(id){
        const todasLasEntidades = await this.getAll();

        const entidadesSinLaEntidad = todasLasEntidades.filter((e) => e.id !== id);

        const datosStr = JSON.stringify(entidadesSinLaEntidad, null, 2);

        await fs.promises.writeFile(this.path, datosStr);
    }

}






/****************testing********************* */
const user1 = {
    nombre: 'Gabriel',
    apellido: 'Borgonovo',
}
const user2 = {
    nombre: 'Gabriela',
    apellido: 'Arias',
}
const user3 = {
    nombre: 'Brenda',
    apellido: 'Peralta',
}
const user4 = {
    nombre: 'Joan',
    apellido: 'Sayas',
}
const user5 = {
    nombre: 'Maxi',
    apellido: 'Leal',
}

async function main(){
    const userManager = new FileManager('./data/data.json');
    await userManager.crear(user1);
    await userManager.crear(user2);
    await userManager.crear(user3);
    await userManager.crear(user4);
    await userManager.crear(user5);
}

//main();