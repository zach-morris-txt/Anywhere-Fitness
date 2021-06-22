const db = require("../../db-config");


function getAllClasses(){
    return db("Classes")
}

function getByClassId(ClassId){
    return db("Classes")
            .where("Class_Id", ClassId)
}

async function updateClassByClassId(UpdatedClass){
    await db("Classes")
            .where("Class_Id", UpdatedClass.ClassId)
            .update(UpdatedClass)

    return getByClassId(UpdatedClass.ClassId)
}

 async function addClass(classToAdd){
    const classToAddId = await db("Classes")
            .insert(classToAdd)
    return getByClassId(classToAddId);
}

async function deleteClassByClassId(ClassId){
    await db("Classes")
            .where("Class_Id", ClassId)
            .del()
    return getAllClasses()
}

module.exports = {
    getAllClasses, getByClassId, updateClassByClassId, addClass, deleteClassByClassId
}