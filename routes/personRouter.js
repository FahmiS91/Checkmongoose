const Person=require('../model/personShema')
const express=require('express')
const router=express.Router()


// Create and Save a Record of a Model

router.post('/addperson',(req,res)=>{
    const person=new Person(req.body)
    person.save((error,data)=>{
        error ? res.send(error.message):res.send('person created')
    })
})

//Create Many Records with model.create()

router.post('/addmany',(req,res)=>{
         const arrayOfPeople=req.body
         Person.create(arrayOfPeople,(error,data)=>{
          error ? console.log(error.message):res.send('many pepole created')
       

          })
         
})


// Use model.find() to Search Your Database

router.get('/getperson/:name',(req,res)=>{
     
    Person.find({name:req.params.name},(error,data)=>{
        error ? res.send(error.message):res.json(data)
   
    })
})

//Use model.findOne() to Return a Single Matching Document from Your Database

router.get('/getfavorite/:favorite',(req,res)=>{

        Person.findOne({favoriteFoods:{ $elemMatch:{$eq:req.params.favorite} }},(error,data)=>{
            error ? res.send(error.message):res.json(data)
        })
})

//Use model.findById() to Search Your Database By _id

router.get('/getpersonbyid/:id',(req,res)=>{
     
    Person.findById(req.params.id,(error,data)=>{
        error ? res.send(error.message):res.json(data)
   
    })
})
//Perform Classic Updates by Running Find, Edit, then Save

router.put('/:id',(req,res)=>{
       Person.findById(req.params.id,(error,data)=>{
        data.favoriteFoods.push("hamburger")
        data.save().then((data)=>res.json(data)).catch((error)=>res.send(error.message))
    })
})






//Perform New Updates on a Document Using model.findOneAndUpdate()

router.put('/updateperson/:name',(req,res)=>{
     
       Person.findOneAndUpdate({name:req.params.name},{$set:{age:20}},{returnNewDocument : true})
        .then(data=>res.json(data)).catch(error=>res.send(error.message))
})




//delete
//Delete One Document Using model.findByIdAndRemove

router.delete('/deleteperson/:id',(req,res)=>{
       const id=req.params.id
       Person.findByIdAndRemove(id,(error,data)=>{
           error ? console.log(error.message):res.send(`person with id=${id} deleted`)
       })
})

//MongoDB and Mongoose - Delete Many Documents with model.remove()

router.delete('/deletepepole/:name',(req,res)=>{
    const name=req.params.name
    Person.remove({name},(error,data)=>{
        error ? console.log(error.message):res.send(`all pepole having name ${name} are deleted`)
    })
})

//Chain Search Query Helpers to Narrow Search Results

router.get('/food/:like',(req,res)=>{
    Person.find({favoriteFoods:{ $all:[req.params.like]}})
    .sort({name:"desc"})
    .limit(2)
    .select("-age")
    .exec((error,data)=>{
        error? console.log(error):res.json(data)
    })
})





module.exports=router