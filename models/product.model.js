const mongoose= require ('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required :[true,"Please enter product name"],
        },

        quentitiy:{
            type: Number,
            required :[true,"Please enter product quantity"],
            default: 0
        },
        price:{
            type: Number,
            required :[true,"Please enter product price"],
            default: 0
        },

        image:{
            type: String,
            required : false,
        }
    },
    {
    timestamp: true
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;