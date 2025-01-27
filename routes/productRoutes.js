import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,
     deleteProductController,
     getProductController, 
     getSingleProductController, 
     productPhotoController, 
     updataProductController
    } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//routes
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updataProductController)

//get products
router.get('/get-product', getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/product/:pid', deleteProductController);


export default router;



