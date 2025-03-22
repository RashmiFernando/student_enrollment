const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    studentId: {
        type: String,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String
    },

    registerDate: {
        type: Date
    }
})

// generate studentId
studentSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastStudent= await this.constructor.findOne({}, {}, { sort: { 'studentId': -1 } });
        let newStudentId = 'ST-0001'; 

        if (lastStudent && lastStudent.studentId) {
            const lastStudentIdNumber = parseInt(lastStudent.studentId.split('-')[1], 10);
            newStudentId = `ST-${String(lastStudentIdNumber + 1).padStart(4, '0')}`;
        }

        this.studentId = newStudentId;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Student', studentSchema);