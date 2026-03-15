
const Lesson = require('../models/Lesson');

const checkLessonExists = async (req, res, next) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            const error = new Error('השיעור המבוקש לא נמצא');
            error.status = 404;
            return next(error); 
        }
        req.lesson = lesson;
        next();
    } catch (err) {
        next(err); 
    }
};

module.exports = checkLessonExists;