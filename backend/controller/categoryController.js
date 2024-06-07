const Category = require("../model/categoryModel");

const addCategory = async (req, res) => {
    const { category, image, status } = req.body;
    try {
     
        if (!category || !image || !status) {
            res.status(400);
            throw new Error('Please add all fields');
        }

        const categoryExists = await Category.findOne({ category });

        if (categoryExists) {
            res.status(400);
            throw new Error('Category already exists');
        }

        const newCategory = await Category.create({
            category,
            image,
            status
        })
        if (newCategory) {
            res.status(201).json({ category: newCategory.category, image: newCategory.image, id: newCategory.id, status: newCategory.status })
        } else {
            res.status(400)
            throw new Error("Invalid Catgory data")
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, image, status } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { category, image, status },
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getSingleCategory
};