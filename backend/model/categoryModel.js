const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category: { type: String, require: [true, "Please add category name"] },
    image: { type: String, require: [true, "Please add image"] },
    status: { type: String, require: [true, "Please add status"] }
})

module.exports = mongoose.model("Category", categorySchema);
