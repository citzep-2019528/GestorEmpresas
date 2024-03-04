'use strict'

import Category from './category.model.js'

export const registerCategory = async (req, res)=>{
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({message: `Registered successfully, ${category.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering category', err: err})
    }
}
