const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: { type: String },
    subject: { type: String, required: true },
    content: { type: String },
    studentName: { type: String, required: true }, 
    status: { 
        type: String, 
        enum: ['pending', 'active', 'closed'], 
        default: 'pending' 
    },
    price: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);