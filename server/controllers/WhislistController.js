const Whislist = require('../models/Whislist');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.createWhislist = async(req,res)=>{
        let id = req.body.id;
        let cart = req.body.cart;
        console.log(req.body);
        User.find({_id:id})
        .then(user=>{
            if(user){
                Cart.findById(cart).then(data=>{
                    let whislist = new Whislist({
                        userId:req.body.id,
                        Product:data.Product
                    }).save().then(docs=>{
                        res.status(200).json(docs);
                    }).catch(err=>res.json(err));
                    }).then(_=>{
                        Cart.deleteOne({_id:cart}).then(data=>{
                            res.json(data);
                        }).catch(err=>res.json(err));
                }).catch(err=>{
                    res.status(404).json(err);
                })
            }else{
                res.status(500).json({
                    message :"invalid User"
                })
            }
        }).catch(err=>res.status(404).json(err));    
}

exports.getWhislist = async (req,res) =>{
    try{
    let id = req.body.id;
    console.log(id);
    const docs = await Whislist.find({userId:id}).populate('Product');
    res.status(200).json(docs);
    }catch(err){
        res.status(404).json(err);
    }
}

exports.delWhislist =(req,res)=>{
    let id = req.body.id;
    Whislist.deleteOne({_id:id}).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

exports.productToWhislist = (req,res)=>{
    let id = req.body.id;
    let product = req.body.product;
    console.log(req.body);
    User.find({_id:id}).then(user=>{
        if(user){
            Product.findOne({_id:product}).then(data=>{
                let whislist = new Whislist({
                    userId:req.body.id,
                    Product:data
                }).save().then(docs=>res.json(docs)).catch(err=>res.json(err))
            }).catch(err=>res.json(err))
        }else{
            res.status(404).json(err)
        }
    }).catch(err=>res.json(err))
}

