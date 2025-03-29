const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({

    examId: {
        type: String,
        unique: true
    },

    examName: {
        type: String,
        required: true
    },

    examDate: {
        type: Date,
        required: true
    },

    examDuration: {
        type: Number,
        required: true
    },   
    examLocation: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Exam', examSchema);