import GalleryMessage from '../models/galleryMessage.js';

export const getGalleries = async (req, res) => {
    try {
        const galleryMessages = await GalleryMessage.find();
       
        res.status(200).json(galleryMessages);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createGallery = async (req, res) => {
    const gallery = req.body;

    const newGallery = new GalleryMessage(gallery);

    try {
        await newGallery.save();
        res.status(201).json(newGallery);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

