const db = require("../../db-config");


function getAllUsers(){
    return db("Users");
}

function getUserByUserId(UserId){
    return db("Users").where("UserId", UserId)
}

function getUserById(Id){
    return db("Users").where("Id", Id)
}

async function createUser(ClassId){
    await db("Users").insert(ClassId)

    return db("Users").where("id", newId).first();
}

async function updateUserByUserId(UpdatedUser){
    await db("Users")
        .where("UserId", UpdatedUser.UserId)
        .update(UpdatedUser)

    return getUserByUserId(UpdatedUser.UserId);
}

async function updateUserById(UpdatedUser, Id){
    await db("Users")
        .where("Id", Id)
        .update(UpdatedUser)

    return getUserById(Id);
}

async function deleteUserByUserId(UserIdToRemove){
    await db("Users")
        .where("UserId", UserIdToRemove)
        .del()

    return getAllUsers();
}


async function deleteUserById(IdToRemove){
    await db("Users")
        .where("Id", IdToRemove)
        .del()
}


function getUsersClasses(UserId){

    return db("UsersClassesIntermediary As UC")
    .join("Users As U", "UC.User_Id", "U.Id")
    .join("Classes As C", "UC.Class_Id", "C.Id")
    .select("U.Id", "U.Username", "UC.Class_Id", "C.Name")
    .where("U.Id", UserId)
}

module.exports = {
  getAllUsers, getUserByUserId, getUserById, createUser, updateUserByUserId, updateUserById, deleteUserByUserId, deleteUserById, getUsersClasses
}