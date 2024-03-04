import express from 'express'
import { registerCategory } from './category.controller.js'
import { isAdmin, validateJwt } from '../midadlewares/validate-jwt.js'

const api = express.Router()

api.post('/register', [validateJwt, isAdmin],registerCategory)

export default api