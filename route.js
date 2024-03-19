// myRoute.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()

const verfiyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({success:false, message:'login'})
    }else{
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err){
                return res.json({success:false, message:'session expired'})
            }else{
                email = decoded.email;
                password = decoded.password;
                return next()
            }
        });
    }
}


//controller
const userController = require('./Controller/userController');
const chartController = require('./Controller/chartController');

// Users
router.get('/',verfiyUser);
router.get('/user', userController.readUser);
router.get('/login', userController.validateUser);
router.post('/add_user', userController.createUser);
router.get('/logout', userController.logout);

// Chart
router.get('/getList/:filter',verfiyUser, chartController.getFoodList);

module.exports = router;
