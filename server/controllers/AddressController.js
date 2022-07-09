const Address = require('../models/Address');
const User = require('../models/User');

exports.createAddress = async (req,res) =>{
    let id = req.body.id;
    console.log(req.body);
    const user = await User.findById(id);
    try{
            let add = await new Address({
                userId:user._id,
                address :req.body.address,  
                locality :req.body.locality,
                city:req.body.city,
                state:req.body.state,
                pincode:req.body.pincode,
                name:req.body.name,
                phone:req.body.phone,
                Type:req.body.Type
            });
            const docs = await add.save();
            res.status(200).json(docs);
    }catch(err){
        res.status(404).json(err)
    }   

}

exports.getAddress = async (req,res) =>{
    let id = req.body.id;
    try{
        const address = await Address.find({userId:id}).populate({path:'userId',select:['name','phone']});
        res.status(200).json(address);
    }catch(err){
        res.status(404).json(err);
    }
}

exports.oneAddress = async (req,res) =>{
    let id  = req.body.id;
    try{
        const data = await Address.findById(id);
        res.status(200).json(data);
    }catch(err){
        res.status(404).json(err)
    }
}

exports.updateAddress = async(req,res) =>{
    try{
        if(req.body.id !=null && req.body.id != 'undefined'){
            const docs = await Address.update({_id:req.body.id},{$set:req.body});
            res.status(200).json(docs);
        }

    }catch(err){
        res.status(404).json(err);
    }
}


exports.delAddress =(req,res)=>{
    let id = req.body.id;
    Address.deleteOne({_id:id}).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}