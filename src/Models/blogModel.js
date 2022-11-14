const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String, require: true
    },
    authorId: {
        type: ObjectId,
        ref: "Author",
        unique:true
    },
        tags: {
            type:[String],
            require:true
        },

        category: {
            type: String,
            require: true
        },
        subcategory: [String],  // subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, 
        isDeleted: { type: Boolean, default: false },
        publishedAt: { type: Boolean, default: false }, // publishedAt: {when the blog is published}, isPublished: {boolean, default: false} 
    },
 { timestamps: true });  // createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}

module.exports = mongoose.model('Blog', blogSchema)
