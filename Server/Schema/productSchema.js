const mongoose = require('mongoose');

const productSchema =new mongoose.Schema({
    name : {
        type: mongoose.Schema.Types.String,
        regexp: true
    },
    price : {
        type: mongoose.Schema.Types.String,
        regexp: true
    },
    category : {
        type: mongoose.Schema.Types.String,
        regexp: true
    },
    userId : {
        type: mongoose.Schema.Types.String,
        regexp: true
    },
    company : {
        type: mongoose.Schema.Types.String,
        regexp: true
    }
})
module.exports=mongoose.model("products",productSchema)