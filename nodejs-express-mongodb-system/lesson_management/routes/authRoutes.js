const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

router.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});

router.post('/signup', async (req, res) => { 
    try {
        const { username, password } = req.body;
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'שם המשתמש כבר תפוס' });
        }

        const hashed = await bcrypt.hash(password, 10);
        await User.create({ 
            username, 
            password: hashed, 
            role: 'student' 
        });
        
        res.status(201).json({ message: 'משתמש נוצר בהצלחה' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'שגיאה בתהליך ההרשמה' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
           
            return res.status(401).json({ error: 'שם משתמש או סיסמה שגויים' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ 
            token, 
            username: user.username, 
            role: user.role 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'שגיאת שרת פנימית' });
    }
});


router.get('/logout', (req, res) => {
    res.redirect('/auth/login');
});

module.exports = router;