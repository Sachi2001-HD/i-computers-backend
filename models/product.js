import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productId : {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        altNames: {
            type: [String], // Array of strings
            default: [], // Default to an empty array if not provided
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        labelledPrice : {
            type: Number,
            required: true
        },
        images : {
            type: [String], 
            default: ["/default-product-1.png","/default-product-2.png"], 
            required: true
        },
        isAvailable: {
            type: Boolean,
            default: true,
            required: true
        },
        category: {
            type: String,
            required: false
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        brand: {
            type: String,
            required: false
        },
        model : {
            type: String,
            required: false
        }
    }
)

const Product = mongoose.model("Product", productSchema); 

export default Product; 