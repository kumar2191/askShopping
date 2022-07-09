const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var ProductSchema ={
        type:mongoose.Schema.Types.ObjectId,
        ref: "products",
    }
    var UserSchema ={
        type:mongoose.Schema.Types.ObjectId,
        ref: "customer",
    }
const CartSchema = new mongoose.Schema({
    user_id:UserSchema,
    Product:ProductSchema,
    quantity:{
        type:Number,
        default:1
    },
    size:{
        type:String
    }
})

CartSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('carts',CartSchema);