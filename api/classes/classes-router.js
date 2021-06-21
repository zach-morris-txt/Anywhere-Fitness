const express = require("express");
const Classes = require("./classes-model");
const router = express.Router();


//ENDPOINTS

//[GET] All Classes

router.get("/", (req, res, next)=>{
    Classes.getAllClasses()
    .then((allClasses)=>{
        res.status(200).json(allClasses);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
})

//[GET] Class By Id

router.get("/:id", (req, res, next)=>{
    
const { id } = req.params;

if(id){
    Classes.getById(id)
    .then((specificClass)=>{
        res.status(200).json(specificClass[0]);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
} else {
    res.status(406).json({message: "Id Required"});
}

})

//[GET] Class By ClassId

router.get("/ClassId/:ClassId", (req, res, next)=>{
    
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

//[PUT] / Update Class By id

router.put("/:id", (req, res, next)=>{

    const updatedClass = req.body;

    const { id } = req.params;

    if(updatedClass.Name){
        Classes.updateClass(updatedClass, id)
            .then((update)=>{
                res.status(200).json(update[0]);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
    } else {
        res.status(406).json({message: "Id and Name are required"});
    }
    
})

//[PUT] / Update Class By ClassId

router.put("/ClassId/:Classid", (req, res, next)=>{

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
        res.status(406).json({message: "ClassId and Name are required"});
    }
    
})

//[POST] New Class

router.post("/", (req, res, next)=>{

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
            res.status(406).json({message: "ClassId must be a number"});
        }
    } else {
        res.status(406).json({message: "ClassId and Name are required"});
    }


    
})

//[DELETE] Class By Id

router.delete("/:id", (req, res, next)=>{
    
    const { id } = req.params;

    Classes.deleteClass(id)
    .then((resolution)=>{
        res.status(200).json(resolution);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })

})

//[DELETE] Class By ClassId

router.delete("/ClassId/:ClassId", (req, res, next)=>{
    
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