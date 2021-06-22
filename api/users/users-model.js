const db = require("../../db-config");


function getAllUsers(){
    return db("Users");
}

function getUserByUserId(UserId){
    return db("Users").where("User_Id", UserId)
}

function getBy(filter) {
    return db("Users as U")
      .select("U.User_Id", "U.User_Username")
      .where(filter);
}

async function createUser(credentials){
    const [UserId] = await db("Users").insert(credentials)
    return getUserByUserId(UserId) ;
}

async function updateUserByUserId(UpdatedUser){
    await db("Users")
        .where("User_Id", UpdatedUser.UserId)
        .update(UpdatedUser)
    return getUserByUserId(UpdatedUser.UserId);
}

async function deleteUserByUserId(UserIdToRemove){
    await db("Users")
        .where("User_Id", UserIdToRemove)
        .del()
    return getAllUsers();
}

function getUsersClasses(UserId){

    return db("UsersClasses As UC")
    .join("Users As U", "UC.User_Id", "U.User_Id")
    .join("Classes As C", "UC.Class_Id", "C.Class_Id")
    .select("U.User_Id", "U.User_Username", "UC.Class_Id", "C.Name")
    .where("U.User_Id", UserId)
}

module.exports = {
  getAllUsers, getUserByUserId, getBy, createUser, updateUserByUserId, deleteUserByUserId, getUsersClasses
}