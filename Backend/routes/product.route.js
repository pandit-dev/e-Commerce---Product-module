import express from "express"
import upload from "../middlewares/multer.js";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.route('/').get(getAllProducts)
router.route('/addproduct').post(upload.array('images', 5), addProduct)
router.route('/update/:id').put(upload.array('images', 5), updateProduct);
router.route('/delete/:id').delete(deleteProduct)

export default router;