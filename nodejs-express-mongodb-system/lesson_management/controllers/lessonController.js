const Lesson = require('../models/Lesson');

exports.getAllLessons = async (req, res, next) => {
    try {
        res.render('index', {
            username: req.user ? req.user.username : 'אורח',
            role: req.user ? req.user.role : 'student'
        });
    } catch (err) {
        next(err); 
    }
};

exports.getAllLessonsJSON = async (req, res, next) => {
    try {
        const lessons = await Lesson.find().sort({ createdAt: -1 });
        res.json(lessons); 
    } catch (err) {
        next(err);
    }
};

exports.getLessonJSON = async (req, res, next) => {
    try {
       res.json(req.lesson); 
    } catch (err) {
        next(err);
    }
};

exports.getAddPage = (req, res) => {
    res.render('add-lesson', {
        user: req.user
    });
};

exports.createLesson = async (req, res, next) => {
    try {
        const { subject, content } = req.body;

        await Lesson.create({
            title: subject,
            subject,
            content,
            studentName: req.user.username,
            status: 'pending',
            price: 0
        });

        res.status(201).json({ message: 'השיעור נוצר בהצלחה' });
    } catch (err) {
        err.status = 400;
        err.message = 'יצירת השיעור נכשלה: ' + err.message;
        next(err);
    }
};

exports.getLessonDetails = async (req, res) => {
    res.render('lessonDetails', {
        lesson: req.lesson,
        role: req.user.role, 
        user: req.user
    });
};

exports.updateLesson = async (req, res, next) => {
    try {
        const { price, status } = req.body;
        await Lesson.findByIdAndUpdate(req.params.id, { price, status });
        res.json({ message: 'העדכון בוצע בהצלחה' });
    } catch (err) {
        err.status = 400;
        next(err);
    }
};

exports.deleteLesson = async (req, res, next) => {
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        res.json({ message: 'המחיקה בוצעה בהצלחה' });
    } catch (err) {
        next(err);
    }
};