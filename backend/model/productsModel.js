const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product: { type: String, required: [true, "Please add Product name"] },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', required: [true, "Please add category"]
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory', required: [true, "Please add subcategory"]
    },
    image: { type: String, required: [true, "Please add image"] },
    status: { type: String, required: [true, "Please add status"] }
});

module.exports = mongoose.model("Product", productSchema);
