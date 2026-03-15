const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const app = express();
const connectDB = require('./db/config');
connectDB();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./routes/authRoutes');
const lessonRoutes = require('./routes/lessonRoutes');

app.use('/auth', authRoutes);
app.use('/lessons', lessonRoutes);

app.get('/', (req, res) => {
    res.redirect('/auth/login');
});



app.use((req, res, next) => {
    const err = new Error('הדף המבוקש לא נמצא');
    err.status = 404;
    next(err); 
});




app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
    res.status(statusCode).render('error', { 
        message: err.message || 'אירעה שגיאה בשרת',
        status: statusCode 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});