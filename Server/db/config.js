const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce",{
    useNewUrlParser: true,
    // useUnifiedTopology: true, 
})
var config = mongoose.connection;
config.on('connected', function() {
    console.log('database is connected successfully');
});
config.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
config.on('error', console.error.bind(console, 'connection error:'));
module.exports = config;