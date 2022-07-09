const mongoose = require('mongoose');

const Gallery = new mongoose.Schema({
    galleryImage:{
        type:String
    },
    galleryTitle:{
        type:String
    },
    gallerySubTitle:{
        type:String
    },
    galleryLink:{
        type:String
    }
});

module.exports = mongoose.model('galleries',Gallery);