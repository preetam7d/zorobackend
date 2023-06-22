const router = require('express').Router();
const middleware = require('./middleware');
const { User } = require('../model/Schema');
const bcrypt = require('bcrypt');

//fecth user details
router.get('/', middleware, async (req, res) => {
    const currentuser = req.user.id;
    const user = await User.findById(currentuser);
    return res.status(200).json(user);
});

//edit user details
router.put('/', middleware, async (req, res) => {
    const currentuser = req.user.id;
    if (req.body.password === req.body.confirmpassword) {
        const user = await User.findById(currentuser);
        const pass = await bcrypt.compare(req.body.password, user.password);
        if (pass) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await User.findByIdAndUpdate(currentuser, { $set: req.body });
            return res.status(200).json(await User.findById(currentuser));
        }
    }
    else {
        return res.status(405).json('password entered you is incorrect');
    }
});

module.exports = router;