const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({

    examId: {
        type: String,
        unique: true
    },

    code: {
        type: String,
        required: true
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
    
   
    studentCount: {
        type: Number,
        required: true
    },
})


// generate examId
examSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastExam= await this.constructor.findOne({}, {}, { sort: { 'examId': -1 } });
        let newExamId = 'EX-0001'; 

        if (lastExam && lastExam.examId) {
            const lastExamIdNumber = parseInt(lastExam.examId.split('-')[1], 10);
            newExamId = `EX-${String(lastExamIdNumber + 1).padStart(4, '0')}`;
        }

        this.examId = newExamId;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Exam', examSchema);