var mongoose = require('mongoose');

var productSchema = new mongoose.Schema(
    {
        ref: {
            type: Number,
            required: true,
            unique: true
        },
        wording: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        type: {
            type: String,
            default: "Product"
        },
        images: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('product', productSchema);