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
            default: [
                "images/products/product-5-img-1.jpg",
                "images/products/product-5-img-2.jpg"
            ]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('product', productSchema);