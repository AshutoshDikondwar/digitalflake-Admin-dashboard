const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    subcategory: { type: String, required: [true, "Please add sub category"] },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', required: [true, "Please add category"]
    },
    image: { type: String, required: [true, "Please add sub image"] },
    status: { type: String, required: [true, "Please add sub status"] }
});

module.exports = mongoose.model("Subcategory", subCategorySchema);
