
const { json } = require('express');
const db = require('../database'); 
const bcrypt = require('bcrypt');
const salt =10;
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?,?,?)"

    try {
        var isNotExists = await checkEmail(req.body.email);
    } catch (error) {
        return res.json({success: false, message: 'Something unexpected has occured'});
    }
    
   
    if(isNotExists)
    {
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
            if(err){
                return res.json({success:false, message: 'Something unexpected has occured'});
            }else{
                const values = [
                    req.body.username,
                    req.body.email,
                    hash,
                  ]

                db.query(sql, values, (err, result) => {
                    if(err){
                        return res.json({success: false, message: 'Something unexpected has occured'});
                    }else{
                        if(result.length === 0){
        
                        }else{
                            return res.json({success: true, message: "Account created successfully"});
                        }
                    }
                })
            }
        });
    }else{
        return res.json({success:false, message: "Email existed!"});
    }
}

async function checkEmail(email)  {
    return new Promise((resolve, reject) => {
        db.query(`Select idusers FROM users WHERE email = ?`, email, (err, result) => {
            if(err){
                reject(false);
            }else{
                if(result.length == 0){
                    resolve(true);
                }else{
                    resolve(false);
                }
            }
        });
    })
}

const readUser = (req, res) => {
    db.query(`SELECT * FROM users`,(err, result) => {
        if(err){
            return res.json({success: false, message: 'Internal Server Error' });
        }
        if(result.length === 0){
            return res.json({success: false, message: 'No record' });
        }else{
            return res.json({success:true, body: result});
        }
    })
}

const validateUser = async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    db.query('SELECT username,password FROM users WHERE email = ?', email, (err,result) => {
        if(err){
            return res.json({success: false, message: 'Internal Server Error' });
        }else{
            if(result.length === 0){
                return res.json({success: false, message: 'User not found or Password Incorrect!' });
            }else{
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(err){
                        return res.json({success: false, message: 'User not found or Password Incorrect!'})
                    }
                    if(response){
                        const token = jwt.sign({email,password}, process.env.JWT_SECRET_KEY, {expiresIn: 60*60});
                        res.cookie('token', token);
                        
                        return res.json({success: true, message: {name: result[0].username} });
                    }else{
                        return res.json({success: false, message: 'User not found or Password Incorrect!'})
                    }
                    
                })
            }
        }
    })
       
}

const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({success: true});
}

module.exports = {createUser, readUser, validateUser, logout};