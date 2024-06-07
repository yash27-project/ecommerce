const express = require("express");
const User = require('../Schema/userSchema')
const Product = require('../Schema/productSchema');
const router = express.Router();
const jwt = require('jsonwebtoken');    
const jwtKey='mernpractice'

router.post("/register",async(req,res)=>{
    let user = await new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send({message : 'something went wrong'});
        } else {
            res.send({result,auth:token})
        }
    })
    
})

router.post("/login",async(req,res)=>{
    const {email, password} = req.body;
    try{
        if(email && password){
            let user = await User.findOne(req.body).select("-password");
            if(user){
                jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
                    if(err){
                        res.send({message : 'something went wrong'})
                    } else {
                        res.status(200).send({user,auth : token})
                    }
                })
                
            } else {
                res.status(422).send({message : 'Invalid Credentials'})
            }
        } else {
            res.status(422).send({message : 'Invalid Credentials'})
        }
    }catch(err){
        console.log(err)
    }
})

router.post("/add-product",async(req,res)=>{
    try{
        let product = new Product(req.body);
        let result = await product.save();
        if(result){
            res.send(result)
        }
    } catch(err){
        console.log(err)
    } 
})

router.post("/product-list",verifyToken,async(req,res)=>{
    try{
        const {id, page, limit,search} = req.body
        let product = await Product.find({userId:id,
            "$or" : [
                {'name' : new RegExp(search)},
                {'category' : new RegExp(search)},
                {'company' : new RegExp(search)}
            ]}).limit(limit * 1).skip((page-1)*limit).exec();
        const count = await Product.countDocuments();
        if(product.length){
            console.log("checkingdata",count,"dgdg",Math.ceil(count / limit),"dsd",page)
            res.send({result : product, totalPages: Math.ceil(count / limit),currentPage: page,message : 'Product List'})
        } else {
            res.send({result : [], message : "No record found"})
        }
    }catch(err){
        console.log(err)
    }
    
})

router.delete('/product/:id',async(req,res)=>{
    let result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
})

router.get('/getProductData/:id',async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }
    else {
        res.send({message : 'no record found'})
    }
})

router.put('/updateProduct/:id',async(req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set : req.body}
    );
    if(result){
        res.send({message : 'Product Updated Successfully'})
    } else {
        console.log("Error")
    }   
});

// router.get('/search/:userId/:key',verifyToken,async(req,res)=>{
//     try {
        
//         let result = await Product.find({userId:req.params.userId,
//             "$or" : [
//                 {'name' : new RegExp(req.params.key)},
//                 {'category' : new RegExp(req.params.key)},
//                 {'company' : new RegExp(req.params.key)}
//             ]
//         })
//         res.send(result);
//     } catch(err){
//         console.log(err)
//     }
// })

function verifyToken(req,res,next){
    let token = req.headers['authorization'];
    
    if(token){
        token=token.split(" ")[1];
        jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                res.status(401).send({message : "Please provide valid token"})
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({message : 'no token found'})
    }
     
}
module.exports=router;