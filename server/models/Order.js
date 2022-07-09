const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var UserSchema ={
    type:mongoose.Schema.Types.ObjectId,
    ref: "customer"
}

var AddressSchema ={
    type:mongoose.Schema.Types.ObjectId,
    ref: "address"
}

const OrderSchema = new mongoose.Schema({

    userId:UserSchema,

    Product :[{
        product:{type :mongoose.Schema.Types.ObjectId,ref:'products'},
        quantity:Number,
        size:String
    }],

    address:{
        address:String,
        locality:String,
        city:String,
        state:String,
        pincode:Number,
        name:String,
        phone:Number,
        Type:String
    },

    total :{
        type:Number
    },
    status:{
        type:String,
        default:'Order Placed'
    },
    PaymentStatus:{
        type:String,
        default:'Cash On Delivery'
    },
    Time:{
        type:Date,
        default:Date.now
    },
    OrderId:{
        type:Number,
        default:()=>{
            return Math.floor(Math.random()*900000000300000000000) + 1000000000000000
        },
        createIndexes: { unique: true }
    }
});


OrderSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('orders',OrderSchema);