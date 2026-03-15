
const authorizeAdmin = (req, res, next) => {
    
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).render('error', { 
            message: "גישה נדחתה: אין לך הרשאות מנהל לביצוע פעולה זו" 
        });
    }
};

module.exports = authorizeAdmin;