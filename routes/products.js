const router = require('express').Router();
const middleware = require('./middleware');
const { Products, Ratings } = require('../model/Schema');

//add product by admin
router.post('/', middleware, async (req, res) => {
    const postby = req.user.id;
    const { sellername, title, description, price, image, category } = req.body;
    if (postby) {
        const newproduct = new Products({
            seller: postby,
            sellername: sellername,
            title: title,
            description: description,
            price: price,
            image: image,
            category: category
        });
        await newproduct.save();
        return res.status(200).json("product added successfully");
    }
});

//fetch all the products
router.get('/', async (req, res) => {
    const allproducts = await Products.find().populate('rating');
    return res.status(200).json(allproducts);
});


//fetch a single product
router.get('/:id', async(req, res) => {
    const singleproduct = await Products.findById(req.params.id).populate('seller').populate({ path: 'rating', populate: { path: 'reviewby' } });
    return res.status(200).json(singleproduct);
});


//rate the product
router.post('/rating/:id', middleware, async (req, res) => {
    const ratingby = req.user.id;
    const { points, review } = req.body;
    //get the product to update the rating
    const product = await Products.findById(req.params.id);
    const newrating = new Ratings({
        points,
        review,
        reviewby: ratingby
    });
    await newrating.save();
    //update rating for the product by pushing rating id in to product
    await product.updateOne({ $push: { rating: newrating.id } });
    await product.updateOne({ $push: { ratings: points } });
    return res.status(200).json("product rated successfully");
});

//edit products by admin
router.put('/:id', async(req, res) => {
    const product = await Products.findByIdAndUpdate(req.params.id, {$set : req.body});
    return res.status(200).json("product edited successfully");
});


//delete a product
router.delete('/:id', async(req, res) => {
    await Products.findByIdAndDelete(req.params.id);
    return res.status(200).json("product deleted sucessfully");
});


//export router
module.exports = router;
