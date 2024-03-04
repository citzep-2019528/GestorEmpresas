import express from 'express'
import {
        login, 
        register, 
        test } from './user.controller.js'
import { isAdmin, validateJwt } from '../midadlewares/validate-jwt.js'

const api = express.Router()

api.post('/register', register)
api.post('/login', login)
api.get('/test', [validateJwt, isAdmin], test)
export default api