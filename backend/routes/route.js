const express = require('express');
const router = express.Router();
const { registerUser,
    loginUser
} = require("../controller/userController")

const { addCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getSingleCategory
} = require('../controller/categoryController')
const {
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategory,
    getSingleSubCategory,
    getSubCategoryNamesByCategory
} = require('../controller/subCategoryController');

const {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getSingleProduct
} = require("../controller/productController");

const {protect} = require('../middleware/authMiddleware')


// USER
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/hello",(req,res)=>{
    res.json({"message":"success"})
})

// CATEGORIES
router.post("/categories",protect,addCategory)
router.put("/categories/:id",protect, updateCategory)
router.delete("/categories/:id",protect, deleteCategory)
router.get("/categories",protect, getAllCategory);
router.get("/categories/:id", getSingleCategory);

//SUB CATEGORIES
router.post('/subcategories',protect, addSubCategory);
router.put('/subcategories/:id',protect, updateSubCategory);
router.delete('/subcategories/:id',protect, deleteSubCategory);
router.get('/subcategories',protect, getAllSubCategory);
router.get('/subcategories/:id',protect, getSingleSubCategory);
router.get('/subcategories/category',protect, getSubCategoryNamesByCategory);

// PRODUCTS
router.post('/products',protect, addProduct);
router.put('/products/:id',protect, updateProduct);
router.delete('/products/:id',protect, deleteProduct);
router.get('/products',protect, getAllProduct);
router.get('/products/:id',protect, getSingleProduct);


module.exports=router