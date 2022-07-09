const Cart = require('../models/Cart');
const User = require('../models/User');
process.env.SECRET_KEY = "secret";
const jwt = require("jsonwebtoken");
const Product = require('../models/Product');

exports.cartCreate = (req,res) =>{
    Product.findOne({code:req.body.code})
    .then(data=>{
        if(req.body.code != null){
        let cart = new Cart({
            user_id:req.body.id,
            Product:data,
            size:req.body.size
        }).save()
        .then(docs=>{
            res.status(200).json({
                message:'create sucessfully',
                cart:{
                    UserID:docs.user_id,
                    Product:docs.Product,
                    size:docs.size,
                    CartID:docs._id
                },
                method:'POST',
                status:['200','Create sucessfull']
            })
        }).catch(err=>{
            res.status(500).json({
                message:['Create unsucessfull',err]
            })
        })
        }else{
            res.status(500).json('Try it Again');
        }
       
    }).catch(err=>{
        res.json(err);
    })

}

exports.delcart =(req,res)=>{
    let id = req.body.id;
    Cart.deleteOne({_id:id}).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

exports.quantity = async (req,res)=>{
    try{
        if(req.body.id !=null && req.body.id !='undefined'){
        const docs = await Cart.updateOne({_id:req.body.id},{$set:{quantity:req.body.quantity}});
        res.status(201).json(docs);
        }
    }catch(err){
        res.status(404).json(err);
    }
}

exports.getUserCart = (req,res)=>{
     let id = req.body.id
     Cart.find({user_id:id}).populate('Product')
     .then(data=>{
         res.status(200).json(data)
     }).catch(err=>{
         res.status(500).json({
             Error:err
         })
     })
}