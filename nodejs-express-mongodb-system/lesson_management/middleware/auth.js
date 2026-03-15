const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "גישה נדחתה: נא להתחבר" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "טוקן לא תקין" });
    }
};


exports.isAdmin = (req, res, next) => {
   if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "גישה נדחתה: נדרשות הרשאות מנהל" });
    }
};