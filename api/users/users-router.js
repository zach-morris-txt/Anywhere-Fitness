const express = require("express");
const Users = require("./users-model");
const Middleware = require("./users-middleware");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./../../config/secret");

//ENDPOINTS

//[GET] All Users

router.get("/", (req, res, next) => {
    Users.getAllUsers()
    .then((allUsers) => {
        res.status(200).json(allUsers);
    })
    .catch((err) => {
        res.status(500).json({message: err.message});
    })
})

//[GET] User by UserId

router.get("/:UserId", (req, res, next) => {
    const {UserId} = req.params; 

    if(UserId){
        Users.getUserByUserId(req.params.UserId)
            .then(specificUser => {
                res.status(200).json(specificUser)
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    } else {
        res.status(406).json({message: "User Id Required"})
    }
})

//[GET] User By ID

router.get(":/id", (req, res, next) => {
    const { id } = req.params;

    if(id){
        Users.getUserById(id)
            .then((user) => {
                res.status(200).json(user[0]);
            })
            .catch((error) => {
                res.status(500).json({message: error.message})
            })
    } else {
        res.status(406).json({messages: "Id requried"})
    }
})

//[POST] Create User
//This shouldn't be used, use Register instead to create a user

router.post("/", (req, res, next)=>{

    const newUser = req.body;

    if(newUser.UserId && newUser.Username){
        if (typeof newUser.UserId === "number"){
            Users.createUser(newUser)
            .then((newestUser)=>{
                res.status(200).json(newestUser);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
        } else {
            res.status(406).json({message: "UserId must be a number"});
        }
    } else {
        res.status(406).json({message: "UserId and Name are required"});
    }


    
})

//[POST] Register as a User
router.post('/register', Middleware.checkRegisterPayload, Middleware.usernameUnique, (req, res) => {
    const credentials = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(credentials.Password, rounds);
    credentials.Password = hash;

    Users.createUser(credentials)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})

//[POST] Login as a User
router.post('/login', Middleware.checkLoginPayload, Middleware.usernameExists, (req,res) => {
    const { username, password} = req.body;

    Users.getUserById({Username: username})
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.Password)) {
                const token = makeToken(user);
                res.status(200).json({
                    user: user, message: `Welcome, ${user.Username}`, token
                })
            } else {
                res.status(401).json({message: "invalid credentials"})
            }
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})

//[PUT] Update User By UserId

router.put("/:UserId", (req, res, next)=>{

    const updatedUser = req.body;

    if(updatedUser.UserId && updatedUser.Username){
        if (typeof updatedUser.UserId === "number"){
            Users.updateUserByUserId(updatedUser)
            .then((update)=>{
                res.status(200).json(update);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
        } else {
            res.status(406).json({message: "UserId must be a number"});
        }
    } else {
        res.status(406).json({message: "UserId and Name are required"});
    }
    
})

//[PUT] Update User By Id

router.put("/:id", (req, res, next) => {
    const updatedUser = req.body;

    const { id } = req.params;

    if(updatedUser.Username){
        Users.updateUserById(updatedUser, id)
            .then((update) => {
                res.status(200).json(update[0]);
            })
            .catch((error) => {
                res.status(500).json({messages: error.message});
            })
    } else {
        res.status(406).json({message: "Id and Username are required"});
    }
})

//[DELETE] Delete User By UserId

router.delete("/:UserId", (req, res, next)=>{
    
    const { UserId } = req.params;

    Users.deleteUserByUserId(UserId)
    .then((resolution)=>{
        res.status(200).json(resolution);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })

})

//[DELETE] Delete User By Id

router.delete(":/id", (req, res, next) => {
    const { id } = req.params;

    Users.deleteUserById(id)
    .then((resolution) => {
        res.status(200).json(resolution);
    })
    .catch((error) => {
        res.status(500).json({message: error.message});
    })
})

//[GET] Users Classes

router.get("/:id/classes", (req, res, next)=>{

    const { id } = req.params;

    Users.getUsersClasses(id)
    .then((allClasses)=>{
        res.status(200).json(allClasses);
    })
    .catch((err)=>{
        res.status(500).json({message: err.message});
    })
})

const makeToken = user => {
    const payload = {
        subject: user.UserId,
        username: user.Username
    };
    const options = {
        expiresIn: "1h"
    }

    return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;