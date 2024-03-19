const { json } = require('express');
const db = require('../database');

// Get all
const getFoodList = (req, res) => {
    if(req.params.filter == 'null' || req.params.filter == [] || req.params.filter == null || req.params.filter == 'undefined' || req.params.filter == undefined)
    {
        db.query('SELECT distinct f.food_id,f.name ,Count(o.food_id) as Count, f.price FROM foods f LEFT JOIN orders o ON f.food_id = o.food_id GROUP BY f.name', (err,result) => {
            if(err){
                return res.json({success: false, message:'Something unexpected has occured.'});
            }else{
                if(result.length === 0){
                    return res.json({success: false, message: 'Not Record Found'});
                }else{
                    return res.json({success: true, result: result});
                }
            }
        })
    }else{
        db.query(`SELECT distinct f.food_id,f.name ,Count(o.food_id) as Count, f.price FROM foods f LEFT JOIN orders o ON f.food_id = o.food_id WHERE f.name IN (${req.params.filter.split(',').map((item) => `"${item}"`).join(',')}) GROUP BY f.name`, (err,result) => {
            if(err){
                return res.json({success: false, message:'Something unexpected has occured.'});
            }else{
                if(result.length === 0){
                    return res.json({success: false, message: 'Not Record Found'});
                }else{
                    return res.json({success: true, result: result});
                }
            }
        })
    }
}



module.exports = { getFoodList }