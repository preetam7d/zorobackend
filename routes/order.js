const router = require('express').Router();
const middleware = require('./middleware');
const { Orders } = require('../model/Schema');


//order a item
router.post('/', middleware, async (req, res) => {
    const orderuser = req.user.id;
    const { shipping, payment, items, summery } = req.body;
    const neworder = new Orders({
        orderby: orderuser,
        shipping, payment, items, summery
    });
    await neworder.save();
    return res.status(200).json(neworder);
});

//fetch all orders of an user
router.get('/', middleware, async(req, res) => {
    const currentuser = req.user.id;
    const myorders = await Orders.find({orderby: currentuser}).populate('items');
    return res.status(200).json(myorders);
});

//fetch a single order
router.get('/:id', async(req, res) => {
    const order = await Orders.findById(req.params.id).populate('items');
    return res.status(200).json(order);
});

//fetch all orders for admin
router.get('/all', async(req, res) => {
    return res.status(200).json(await Orders.find());
});

module.exports = router