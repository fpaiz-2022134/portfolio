'use strict'

import jwt from 'jsonwebtoken'

const secretKey = '@llaveSuperSecretaDeIN6AV@'

export const generateJwt = async(payload)=>{
    try {
        return jwt.sign(payload, secretKey, {
            expiresIn: '3h',  //Tiempo de expiración
            algorithm:'HS256' //Encripta la llave luego de identidad de sesión
        })

    } catch (err) {
        console.log(err)
        return err
    }
}