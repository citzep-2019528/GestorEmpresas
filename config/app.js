'use strict'

import express from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import userRoutes from '../src/user/user.routes.js'
import companyRoutes from '../src/company/company.routes.js'
import categoryRoutes from '../src/category/category.routes.js'

//Config
const app = express()
config()
const port = process.env.PORT || 2656
//Config del servidor
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev')) 

//rutas
app.use('/user',userRoutes)
app.use('/company', companyRoutes)
app.use('/category', categoryRoutes)

//levantar servidor
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}