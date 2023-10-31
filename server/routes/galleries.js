import express from 'express';
import { getGallery, createGallery} from '../controllers/galleries.js'

const router = express.Router();

router.get('/', getGallery);
router.post('/', createGallery);



export default router;