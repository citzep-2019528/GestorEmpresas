import express from 'express'
import { ascendete, 
        descendente, 
        generateReport, 
        getCompany, 
        registerCompany, 
        searcCategory, 
        search, 
        searchYears,
        update } from './company.controller.js'
import { isAdmin, validateJwt } from '../midadlewares/validate-jwt.js'

const api = express.Router()

api.post('/register',[validateJwt, isAdmin], registerCompany)
api.get('/get', [validateJwt, isAdmin], getCompany)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.get('/ascendente',[validateJwt, isAdmin], ascendete)
api.get('/des',[validateJwt, isAdmin], descendente)
api.post('/search',[validateJwt, isAdmin], search)
api.post('/years', [validateJwt, isAdmin], searchYears)
api.post('/category', [validateJwt, isAdmin], searcCategory )
api.get('/report', [validateJwt, isAdmin], generateReport )


export default api