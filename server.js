// import express framework
const express = require("express")
// initilalise a port
const PORT = 3500


// create an instance of express
const app = express()
app.use(express.json())


// create A Javscript array of object

const studentInfo =[
     {
    id: 1,
    name :"John",
    course :"Full Stack",
    duration: "One year",
    institution : "Decagon",
    grade:{
        javaScript : 60,
        HTML : 80,
        css : 50,
        IonicAngular : 50,
        Node: 40
    }
},
     {
    id: 2,
    name :"Esther",
    course :"Full Stack",
    duration: "One year",
    institution : "Decagon",
    grade:{
        javaScript : 60,
        HTML : 80,
        css : 50,
        IonicAngular : 50,
        Node: 40
    }
},
     {
    id: 3,
    name :"Goodluck",
    course :"Full Stack",
    duration: "One year",
    institution : "Decagon",
    grade:{
        javaScript : 60,
        HTML : 70,
        css : 30,
        IonicAngular : 90,
        Node: 60
    }
},
     {
    id: 4,
    name :"William",
    course :"Full Stack",
    duration: "One year",
    institution : "Decagon",
    grade:{
        javaScript : 30,
        HTML : 80,
        css : 50,
        IonicAngular : 50,
        Node: 50
    }
},

]



// entry route
// REQUEST : GET localhost:3500/
app.get("/", (req, res)=>{
     // Welcome Message
    // passing a responds with status code
    res.status(200).json({message:"Welcome to expressJS WITH DUMMY DATA"})
})

// get All Students
// REQUEST : GET localhost:3500/studentInfo
app.get("/studentInfo", (rq,res)=>{
try{
    // check if there is content in the array 
    if(studentInfo.length<1){
        // return an error message
        res.json({message: "No content in the data base"})
    }else{
         // get all the students in that array and send a response to the client'
         res.status(200).json({message: "All student in Decagon", data : studentInfo})
    }
}catch(error){
    console.log(error.message)
}
})

// get a single student 

app.get("/studentInfo/:id", (req,res)=>{
    try{
    // get the id
    const id = parseInt(req.params.id)
    // get object of the id
    const student = studentInfo.find((stud)=>stud.id===id)
     // validate the id
     if(!id){
        // throw an error message
        res.json({message: `This id: ${req.params.id} does not exist`})
    }else{
        // return a response to the client
        res.status(200).json({message: `Student with id: ${req.params.id} was found`, data: student})
    }
    }

    catch(error){
        console.log(error>message)
        

    }
})


// create/add a server
app.post("/studentInfo", (req,res)=>{
    try{
        // create a new object
        const newStudent ={
            id: studentInfo.length + 1,
            name : req.body.name,
            course: req.body.course,
            duration: req.body.duration,
            institution: req.body.institution,
            grade: {
                javaScript: req.body.grade.javaScript,
                HTML: req.body.grade.HTML,
                css: req.body.grade.css,
                IonicAngular: req.body.grade.IonicAngular,
                Node: req.body.grade.Node
            }
        }

    // add the new object to the array
    studentInfo.push(newStudent)
    // send a response to the client
    res.status(200).json({message:"student created successfully", data: newStudent})

    }
    catch(error){
        console.log(error.message)
        res.json({message:error.message})
    }
})


// update a student
app.patch('/studentInfo/:id', (req, res) => {
    try{
        // get the id passed to the url
        const id = parseInt(req.params.id)
        // get the object of the id
        const studentId = studentInfo.find((student)=>student.id === id)
        // update the fields of the student with the id found in the array
        studentId.name = req.body.name,
        studentId.course = req.body.course,
        studentId.duration = req.body.duration,
        studentId.institution = req.body.institution,
        studentId.javaScript = req.body.javaScript,
        studentId.HTML = req.body.HTML,
        studentId.css = req.body.duration.css,
        studentId.IonicAngular = req.body.IonicAngular,
        studentId.Node = req.body.Node

        // return the updated object to the client
        res.status(200).json({message: "Updated Successfully", data: studentId})
    }catch(error){
        console.log(error.message)
    }
})

// delete a student
app.delete('/studentInfo/:id', (req, res) => {
    try{
        // get the id 
        const id = parseInt(req.params.id)
        // get the object of the id passed to the url
        const studentId = studentInfo.find((student)=>student.id === id)
        // validate the id
        if(!id){
            res.json({message: `Invalid id : ${req.params.id}`})
        }else{
            // get the index of the id
            const index = studentInfo.indexOf(studentId)
            // remove the object of the index found
            studentInfo.splice(index, 1)
            // return a  response to the client
            res.status(200).json({message: `Student with id: ${req.params.id} was deleted successfully`})
        }
    }catch(error){
        console.log(error.message)
    }
})

app.listen(PORT, ()=>{
    console.log(`sever is ready to run at port : ${PORT}`)
})





