'use strict';

import User from '../user/user.model.js'
import Animal from '../animal/animal.model.js'
import {checkUpdate} from '../utils/validator.js'

export const test = (req, res)=>{
    return res.send({message: 'Function test is running | Animal'})

}


export const save = async (req, res)=>{
    try {
        //Capturar la data
        let data = req.body
        //Validar que el Keeper exista (Buscar a la BD)
        console.log(data.keeper)
        let user = await User.findOne({_id: data.keeper})
         /* console.log(await User.findOne({_id: data.keeper})) */
        if(!user){
            return res.status(404).send({message: 'Keeper not found'})
        }
        //Crear la instancia del Animal

        let animal = new Animal(data)
        //Guardar el Animal
        await animal.save()
        //Respondo al usuario
        return res.send({message: 'Animal saved successfully'})

        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving animal'})
    }
}

export const get = async(req, res)=>{
    try {
        let animals = await Animal.find()
        return res.send(animals)
        if (!animals.length==0) return res.status(404).send({message: 'Not found'})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting animal'})
    }
}

export const update = async(req,res) => {
    try {
        //capturar el id
        let { id } = req.params
        //Capturar la data
        let data = req.body
        //Validar que el Keeper exista (Buscar a la BD)
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have sumbmitted some data that cannot be updated or missing data'})
        //Crear la instancia del Animal
        let updatedAnimal = await Animal.findOneAndUpdate({_id: id},
             data, 
             {new: true}).populate('keeper')
        if(!updatedAnimal){
            return res.status(404).send({message: 'Animal not found'})
        }
        //Respondo al usuario
        return res.send({message: 'Animal updated successfully', updatedAnimal})
    } catch (err) {
        
    }
}

export const deleteA = async(req, res)=>{
    try {
        //X Verificar si tiene una reunión en proceso X
        //Capturar el id
        let {id} = req.params
        //Eliminar (deleteOne (Elimina el registro sin devolver el documento) / findOneAndDelete (Devuelve el documento eliminado.)
        let deletedAnimal = await Animal.deleteOne({_id:id})

        //Validar que se eliminó
        if(deletedAnimal.deletedAccount == 0) return res.status(404).send({message:'Animal not found'});

        //Responder
        return res.send({message: 'Deleted successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting animal'})
        
    }
}

// El doble igual es una igualación abstracta que no importa el tipo de dato pero si la igualdad del valor.
// El triple igual es una igualación estricta que maneja solo el mismo tipo de dato.


export const search = async(req, res) =>{
    try {
        //Obtener el parámetro de búsqueda
        let {search} = req.body
        //Buscar
        let animals = await Animal.find(
            {name: search}
        ).populate('keeper', ['name', 'phone'])
        //Validar la respuesta 
        if(animals.length==0) return res.status(404).send({message: 'Animals not found'})
        //Respondo al usuario
        return res.send({message: 'Animal found', animals})
        //Validar si todo sale bien
    } catch (err) {
        console.error(err)
        
    }
}