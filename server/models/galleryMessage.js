import mongoose from 'mongoose';

const gallerySchema = mongoose.Schema({
    weather_type: String,

})

const GalleryMessage = mongoose.model('GalleryMessage', gallerySchema);

export default GalleryMessage;