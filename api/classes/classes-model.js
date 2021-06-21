const db = require("../../db-config");


function getAllClasses(){
    return db("Classes")
}

function getById(Id){
    return db("Classes")
            .where("Id", Id)
}

function getByClassId(ClassId){
    return db("Classes")
            .where("ClassId", ClassId)
}

async function updateClass(UpdatedClass, Id){
    await db("Classes")
            .where("Id", Id)
            .update(UpdatedClass)

    return getById(Id);
}

async function updateClassByClassId(UpdatedClass){
    await db("Classes")
            .where("ClassId", UpdatedClass.ClassId)
            .update(UpdatedClass)

    return getByClassId(UpdatedClass.ClassId)
}

 async function addClass(classToAdd){
        const classToAddId = await db("Classes")
                            .insert(classToAdd)

            return getById(classToAddId);
}

async function deleteClass(idToDelete){
    await db("Classes")
        .where("id", idToDelete)
        .del()

    return getAllClasses();
}

async function deleteClassByClassId(ClassId){
    await db("Classes")
            .where("ClassId", ClassId)
            .del()

    return getAllClasses()
}

module.exports = {
    getAllClasses, getById, getByClassId, updateClass, updateClassByClassId, addClass, deleteClass, deleteClassByClassId
}