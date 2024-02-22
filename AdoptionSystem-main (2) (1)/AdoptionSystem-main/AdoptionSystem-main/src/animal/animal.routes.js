'use strict'
 
import {Router} from 'express'
import {save,
        test,
        get,
        update,
        deleteA,
        search

} from './animal.controller.js'
 
const api= Router()

//Middleware

import {
        validateJwt,
        isAdmin
} from '../middlewares/validate-jwt.js'


//ROLE ADMIN


api.get('/test', [validateJwt, isAdmin],test)
api.post('/save', [validateJwt, isAdmin], save)
api.get('/get', [validateJwt, isAdmin], get)

//ROLE CLIENT
api.put('/update/:id', [validateJwt],update)
api.delete('/deleteA/:id', [validateJwt], deleteA)
api.post('/search', [validateJwt], search)
 
export default api