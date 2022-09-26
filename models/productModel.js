var mongoose = require('mongoose');
require ('mongoose-currency').loadType(mongoose);
var Currency = require(mongoose.Types.currency);

var productSchema = new mongoose.Schema(
    {
        ref:{
            type:Number,
            required:true,
            unique: true
        },
        wording:{
            type:String,
            required:true
        },
        price:{
            type: currency,
            required: true,
            min: 0
        },
        type:{
            type: String,
            default: "Product"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('product', productSchema);