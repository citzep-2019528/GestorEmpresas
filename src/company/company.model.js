import {Schema, model} from "mongoose"

const companySchema = Schema({
    name:{
        type:String,
        required: true
    },
    
    yearsExperience:{
        type: Number,
        required:true
    },
    impactLevel:{
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        required: true
    }
})
export default model('company', companySchema)