'use strict'
//Rutas del usuario
 
import express from 'express'
import { validateJwt, isAdmin} from '../middlewares/validate-jwt.js'
import { test, register, login, update, deleteU } from './user.controller.js'
 
const api = express.Router()
 
//Middleware    
//ADMIN

api.get('/test', [validateJwt ,isAdmin], test )
//CLIENT/ADMIN
api.put('/update/:id', update)
api.delete('/delete/:id', deleteU)
//PUBLIC
api.post('/register', register)
api.post('/login', login)
 
export default api
 
//export const api <- tengo si o si el nombre que está en este archivo Ej: api
//export default api <- importar con otro nombre Ej: userRoutes