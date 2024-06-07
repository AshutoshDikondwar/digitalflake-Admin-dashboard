


const Product = require("../model/productsModel");
const Subcategory = require("../model/subCategoryModel");



const addProduct = async (req, res) => {
    const { product, category, subcategory } = req.body;

    try {
        if (!product || !category || !subcategory) {
            return res.status(400).json({ error: 'Please add all fields' });
        }
        const subCategoryExists = await Subcategory.findOne({ _id: subcategory, category });
        if(!subCategoryExists){
            throw new Error('Sub Category is not in the Category you selected ')
        }

        if (!subCategoryExists) {
            return res.status(400).json({ error: 'Subcategory does not exist' });
        }

        const newProduct = await Product.create({
            product,
            category,
            subcategory,
            image: subCategoryExists.image,
            status: subCategoryExists.status
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { product, category, subcategory, image, status } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { product, category, subcategory, image, status },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().populate('category').populate('subcategory');
        res.json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getSingleProduct
};
