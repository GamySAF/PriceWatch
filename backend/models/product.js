const mongoose=require("mongoose");

const { string, number, date } = require("zod/v4");

const ProductSchema=new mongoose.Schema({
    name:string,
    url:string,
    targetPrice:Number,
    currentPrice:Number,
    change:Number,
    history:[{
        oldPrice:Number,
        newPrice:Number,
        change:Number,
        date:{
            type:date,
            default:Date.now
        }
    }
    ]
})

module.exports=mongoose.model("product",ProductSchema)