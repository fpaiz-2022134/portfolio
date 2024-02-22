'use strict';
 
import { Router } from 'express';
import { test } from './appointment.controller.js';
 
const api = Router();
 
// Rutas públicas
api.get('/test', test);
 
export default api;