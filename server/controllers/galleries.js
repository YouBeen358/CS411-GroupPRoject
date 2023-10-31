import Gallery from '../models/gallery.js';

export const getGallery = async (req, res) => {
    try {
        const pictures = await Gallery.find();
       
        res.status(200).json(pictures);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createGallery = async (req, res) => {
    const gallery = req.body;

    const newGallery = new Gallery(gallery);

    try {
        await newGallery.save();
        res.status(201).json(newGallery);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

