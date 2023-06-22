const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../model/Schema');
const jwt = require('jsonwebtoken');

//register route
router.post("/register", async (req, res) => {
    let { name, sellername, email, password } = req.body;
    //check the user already exist with this email
    const takenEmail = await User.findOne({ email: email });
    if (takenEmail) {
        return res.status(405).json("username already exists");
    } else {
        password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name,
            sellername,
            email,
            password,
        });
        await newUser.save();
        return res.json("user account created sucessfully");
    }
});

//login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        //confirm the user is register or not
        const userexist = await User.findOne({ email: email });
        if (!userexist) {
            return res.status(404).json('user not found');
        }
        bcrypt.compare(password, userexist.password).then((isCorrect) => {
            if (isCorrect) {
                let payload = {
                    user: {
                        id: userexist.id
                    }
                }
                jwt.sign(payload, 'newsecreate', { expiresIn: 36000000 }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({ token: token, name: userexist.name});
                });
            }
            else {
                return res.status(405).json('password is incorrect');
            }
        }
        );
    } catch (error) {
        return res.status(500).json("server error")
    }
});

//admin authentication
router.post('/admin', async(req, res) => {
    const {userid, password} = req.body;
    if(userid === "admin@gmail.com" && password === "admin123") {
        return res.status(200).json('Admin entered sucessfully');
    }
    else {
        return res.status(405).json('Admin credentials are not correct');
    }
});

//export router
module.exports = router;