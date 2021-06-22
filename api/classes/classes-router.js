const express = require("express");
const Classes = require("./classes-model");
const router = express.Router();


//ENDPOINTS
//[GET] All Classes
router.get("/", (req, res)=>{
    Classes.getAllClasses()
    .then((allClasses)=>{
        res.status(200).json(allClasses);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
})

//[GET] Class By ClassId
router.get("/ClassId/:ClassId", (req, res)=>{
    const { ClassId } = req.params;
    
    if(ClassId){
        Classes.getByClassId(ClassId)
        .then((specificClass)=>{
            res.status(200).json(specificClass[0]);
        })
        .catch((err)=>{
            res.status(500).json({message: err.message});
        })
    } else {
        res.status(406).json({message: "Class Id Required"});
    }
})

//[PUT] / Update Class By ClassId
router.put("/ClassId/:Classid", (req, res)=>{
    const updatedClass = req.body;

    if(updatedClass.Name && updatedClass.ClassId){
        Classes.updateClassByClassId(updatedClass)
            .then((update)=>{
                res.status(200).json(update[0]);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
    } else {
        res.status(406).json({message: "ClassId And Name Are Required"});
    }
})

//[POST] New Class
router.post("/", (req, res)=>{

    const newClass = req.body;

    if(newClass.ClassId && newClass.Name){
        if (typeof newClass.ClassId === "number"){
            Classes.addClass(newClass)
            .then((newestClass)=>{
                res.status(200).json(newestClass[0]);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
        } else {
            res.status(406).json({message: "ClassId Must Be A Number"});
        }
    } else {
        res.status(406).json({message: "ClassId And Name Are Required"});
    }
})

//[DELETE] Class By ClassId
router.delete("/ClassId/:ClassId", (req, res)=>{
    
    const { ClassId } = req.params;

    Classes.deleteClass(ClassId)
    .then((resolution)=>{
        res.status(200).json(resolution);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })

})

module.exports = router;