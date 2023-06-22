const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sellername: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sellername: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    rating: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ratings",
    }],
    ratings: [],
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const ratingSchema = new mongoose.Schema({
    points: { type: Number, required: true },
    review: { type: String, required: true },
    reviewby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

const orderSchema = new mongoose.Schema({
    orderby: {
        type: String
    },
    shipping: {
        type: Object
    },
    payment: {
        type: String
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],
    summery: {
        type: String
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
const Products = mongoose.model("Products", productSchema);
const Ratings = mongoose.model("Ratings", ratingSchema);
const Orders = mongoose.model("Orders", orderSchema);

module.exports = { User, Products, Ratings, Orders };
