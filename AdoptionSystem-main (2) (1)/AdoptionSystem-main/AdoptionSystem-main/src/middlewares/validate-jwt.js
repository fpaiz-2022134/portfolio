'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

//NOTA: PRIMERO SOLICITUD Y LUEGO RESPUESTA
export const validateJwt = async(req, res, next) => {
    try {
        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        //Obtener el token de los headers
        let {token} = req.headers
        /// Verificar si viene el token
        
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        //Obtener el uid que envión el token
        let {uid} = jwt.verify(token, secretKey)
        //Validar si el usuario aún existe en la BD
        let user = await User.findOne({_id: uid})
            if(!user) return res.status(404).send({message: "User Not Found - Unauthorized"})
        // Ok del Middleware
    req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message: 'Invalid token or expired'})
    }
}


//api.post('/test', test)
//Objeto express + Método + URI + Handler


export const isAdmin = async(req, res, next) =>{
    try {
        
        let {role} = req.user
        if(!role || role !== 'ADMIN') return res.status(401).send({message: `You dont have acces | ${username}`})
        next()

        /* //Obtenemos el username
        let {token} = req.headers
        //Obtenemos los datos a traves del username
        let data = await User.findOne({token})
        //Trycatch para validar
        if(!data) return res.status(404).send({message: 'User not found'})
        //Verificamos que este user sea admin
        if(data.role !=='admin') return res.status().send({message: 'Is not an admin'})
        // Ok del middleware
    next()
    return res.send({message: 'User is an admin'}) */

    } catch (err) {  
        console.error(err)
        return res.status(401).send({message: 'Unauthorized role'})
    }
}

