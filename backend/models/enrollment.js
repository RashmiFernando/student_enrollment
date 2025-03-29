const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    
    enrollmentId: {
        type: String,
        unique: true
    },

    code: {
        type: String,
        required: true
    },

    studentId: {
        type: String,
        required: true
    },

    courseName: {
        type: String,
    },

    enrollmentDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['Active', 'Unenroll'],
        default: 'Active'
    },
    
});

// Generate enrollmentId
enrollmentSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastEnrollment = await this.constructor.findOne({}, {}, { sort: { 'enrollmentId': -1 } });
        let newEnrollmentId = 'EN-0001';

        if (lastEnrollment && lastEnrollment.enrollmentId) {
            const lastEnrollmentNumber = parseInt(lastEnrollment.enrollmentId.split('-')[1], 10);
            newEnrollmentId = `EN-${String(lastEnrollmentNumber + 1).padStart(4, '0')}`;
        }

        this.enrollmentId = newEnrollmentId;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
