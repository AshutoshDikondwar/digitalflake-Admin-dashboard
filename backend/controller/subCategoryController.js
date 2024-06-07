


const SubCategory = require('../model/subCategoryModel');

const addSubCategory = async (req, res) => {
    const { category, subcategory, image, status } = req.body;
    try {
        if (!category || !subcategory || !image || !status) {
            res.status(400);
            throw new Error('Please add all fields');
        }

        const newSubCategory = await SubCategory.create({
            category,
            subcategory,
            image,
            status
        });
        res.status(201).json(newSubCategory);
    } catch (error) {
       
        res.status(500).json({ error: error.message });
    }
};

const updateSubCategory = async (req, res) => {
    try {
       
        const { id } = req.params;
        const { category, subcategory, image, status } = req.body;
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            id,
            { category, subcategory, image, status },
            { new: true, runValidators: true }
        );
        if (!updatedSubCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        res.json(updatedSubCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
        if (!deletedSubCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        res.json({ message: "SubCategory deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllSubCategory = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('category');
        res.json(subCategories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSingleSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findById(id).populate('category');
        if (!subCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        res.json(subCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSubCategoryNamesByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        const subCategories = await SubCategory.find({ category }).select('subCategory');
        res.json(subCategories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategory,
    getSingleSubCategory,
    getSubCategoryNamesByCategory
};
