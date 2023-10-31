import mongoose from 'mongoose';

const gallerySchema = mongoose.Schema({
    weather_type: String,

})

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;