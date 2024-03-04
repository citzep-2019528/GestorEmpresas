'use strict'

import { hash, compare } from 'bcrypt'

//Encriptar
export const encrypt = (password)=>{
    try{
        return hash(password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}
//Validar la contraseña
export const checkPassword = async(password, hash)=>{
    try{
        return await compare(password, hash)
    }catch(err){
        console.error(err);
        return err
    }
}

export const checkUpdate = (data, Id)=>{
    if(Id){
        if(Object.entries(data).length === 0){
            return false
        }
        return true
    }else{
        return false
    }
}