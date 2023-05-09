const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
mongoose.connect("mongodb://0.0.0.0:27017/students")
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err)
})
const studentSchema = new mongoose.Schema({
    name: String,
    level:Number,
    email: String
})
const Student = mongoose.model('Student', studentSchema)

const levelSchema = new mongoose.Schema({
    level_number: Number,
    semester_number:Number,
    subject_number: Number
})
const Level = mongoose.model('level',levelSchema)
const materialSchema = new mongoose.Schema({
    author_name: String,
    page_number:Number,
    book_name: String
})
const Material = mongoose.model('material',materialSchema)

app.post('/newstudent',async(req,res)=>{
    const newstudent=await new Student({name:req.body.name,level:req.body.level,email:req.body.email})
   newstudent.save().then(()=>{
       res.status(200)
       res.send("saved !!!!")
   }).catch((err)=>{
    console.log(err)
   })
})



app.get('/students',async(req,res)=>{
    let allstudents=await Student.find()
    res.status(200)
    res.json(allstudents)
})

app.patch('/student/:id', async(req,res)=>{
    
    await Student.updateOne({_id:req.params.id},req.body)
    let newstu=await Student.findOne({_id: req.params.id})
    res.status(200)
    res.json(newstu)

})

///////////////////////////////////////////////////////////////////////////////////////////
app.post('/newlevel',async(req,res)=>{
    const newlevel=await new Level({level_number:req.body.level_number,semester_number:req.body.semester_number, subject_number:req.body. subject_number})
   newlevel.save().then(()=>{
       res.status(200)
       res.send("saved !!!!")
   }).catch((err)=>{
    console.log(err)
   })
})


app.get('/levels',async(req,res)=>{
    let alllevels=await Level.find()
    res.status(200)
    res.json(alllevels)
})


app.patch('/level/:id', async(req,res)=>{
    
    await Level.updateOne({_id:req.params.id},req.body)
    let newlvl=await Level.findOne({_id: req.params.id})
    res.status(200)
    res.json(newlvl)

})
//////////////////////////////////////////////////////////////////////////////////////
app.post('/newmaterial',async(req,res)=>{
    const newmaterial=await new Material({author_name:req.body.author_name,page_number:req.body.page_number, book_name:req.body.book_name})
   newmaterial.save().then(()=>{
       res.status(200)
       res.send("saved !!!!")
   }).catch((err)=>{
    console.log(err)
   })
})

app.get('/materials',async(req,res)=>{
    let allmaterials=await Material.find()
    res.status(200)
    res.json(allmaterials)
})
app.patch('/material/:id', async(req,res)=>{
    
    await Material.updateOne({_id:req.params.id},req.body)
    let newmat=await Material.findOne({_id: req.params.id})
    res.status(200)
    res.json(newmat)

})

app.listen(8000, (res) => {
    console.log('server is running....')
})

