const mongoose=require('mongoose')
const {Schema}=mongoose
const personSchema=new Schema({
    name:{
        type:String,
        required:[true,'add your name please']
    },
    age:Number,
    favoriteFoods:[String]
})

module.exports=mongoose.model('person',personSchema)






