import express from "express";
import {getProductById,createProduct,getAllProducts,deleteProduct,updateProduct} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/:productId",getProductById);
productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);

export default productRouter;