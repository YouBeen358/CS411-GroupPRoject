import express from 'express';

import { getGalleries, createGallery} from '../controllers/galleries.js'

const router = express.Router();

router.get('/', getGalleries);
router.post('/', createGallery);


export default router;