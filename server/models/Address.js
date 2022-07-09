const mongoose = require('mongoose');
// var mongoosePaginate = require('mongoose-paginate')

var UserSchema ={
    type:mongoose.Schema.Types.ObjectId,
    ref: "customer"
}

const AddressSchema = new mongoose.Schema({
    userId:UserSchema,
    address :{
        type:String
    },
    locality:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:Number
    },
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    Type:{
        type:String,
        enum:['Home','Office','Work'],
        default:'Home'
    }
});
// AddressSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('addresses',AddressSchema);

