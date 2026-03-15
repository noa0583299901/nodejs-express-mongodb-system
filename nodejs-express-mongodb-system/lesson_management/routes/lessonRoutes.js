const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { requireAuth, isAdmin } = require('../middleware/auth');
const checkLessonExists = require('../middleware/checkLessonExists');


router.get('/api/all', requireAuth, lessonController.getAllLessonsJSON);
router.get('/api/:id', requireAuth, checkLessonExists, lessonController.getLessonJSON);

router.get('/', (req, res) => {
    res.render('index'); 
});

router.get('/add', (req, res) => {
    res.render('add-lesson'); 
});


router.get('/:id', checkLessonExists, (req, res, next) => {
    try {
        res.render('lessonDetails', { id: req.params.id }); 
    } catch (err) {
        next(err);
    }
});


router.post('/add', requireAuth, lessonController.createLesson);
router.put('/admin-update/:id', requireAuth, isAdmin, checkLessonExists, lessonController.updateLesson);
router.delete('/:id', requireAuth, isAdmin, checkLessonExists, lessonController.deleteLesson);

module.exports = router;