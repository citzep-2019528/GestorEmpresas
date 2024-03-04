'use strict'
import { checkUpdate } from '../utils/validator.js'
import Company from './company.model.js'
import Excel from 'exceljs'

// registro de compañia
export const registerCompany = async (req, res) => {
    try {
        let data = req.body
        let exists = await Company.findOne({name: data.name})
        if (exists) {
            return res.status(500).send({ message: 'Company alredy exists' })
        }
        let company = new Company(data)
        await company.save()
        return res.send({message: `Registered successfully, ${company.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering company', err: err})
    }

}

//ver todas las compañias
export const getCompany = async (req, res) =>{
    try {
        let companies = await Company.find()
        return res.send({companies})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting companies' })
    }
}

//editar
export const update = async(req, res)=>{
    try {
    let { id } = req.params
    let data = req.body
    let update = checkUpdate(data, id)
    if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
    let updateCompany = await Company.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
    )
    if(!updateCompany) return res.status(401).send({message: 'Company not found and not updated'})
    return res.send({message: 'Updated company', updateCompany})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating account'})
    }
}

//ver ascendete
export const ascendete = async(req, res)=>{
    try {
        let ascen = await Company.find().sort({name: + 1})
        return res.send({ascen})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting companies'})
    }
}

//descendete 
export const descendente = async(req, res)=>{
    try {
        let des = await Company.find().sort({name: - 1})
        return res.send({des})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting companies'})
    }
}

//por nombre
export const search = async(req, res)=>{
    try{
        let { search } = req.body
        let company = await Company.find(
            {name: search}
        )
        if(!company) return res.status(404).send({message: 'Companies not found'})
        return res.send({message: 'Companies found', company})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching company'})
    }
}
//por años
export const searchYears = async(req, res)=>{
    try{
        let { years } = req.body
        let company = await Company.find(
            {yearsExperience: years}
        )
        if(!company) return res.status(404).send({message: 'Companies not found'})
        return res.send({message: 'Companies found', company})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching company'})
    }
}

//categoria
export const searcCategory = async(req, res)=>{
    try{
        let { category } = req.body
        let company = await Company.find(
            {category: category}
        )
        if(!company) return res.status(404).send({message: 'Companies not found'})
        return res.send({message: 'Companies found', company})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching company'})
    }
}



//generar excel
export const generateReport = async (req, res) => {
    try {
        let companies = await Company.find()
        let book = new Excel.Workbook()
        let worksheet = book.addWorksheet('Companies')
        worksheet.columns = [
            { header: 'name', key: 'name', width: 20 },
            { header: 'category', key: 'category', width: 25 },
            { header: 'yearsExperience', key: 'yearsExperience', width: 20 },
            { header: 'impactLevel', key: 'impactLevel', width: 20}
        ]
        companies.forEach(company => {
            worksheet.addRow({
                name: company.name,
                category: company.category, 
                yearsExperience: company.yearsExperience,
                impactLevel: company.impactLevel
            })
        })

        let filePath = 'Companies.xlsx'
        await book.xlsx.writeFile(filePath)
        res.attachment(filePath)
        res.send()
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error generating report', error: error })
    }
}