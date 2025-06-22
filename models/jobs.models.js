import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required.'],
    },
    position: {
        type: String,
        required: [true, 'Job position is requied.']
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        default: 'full-time'
    },
    workLocation: {
        type: String,
        required: [true, 'Work location is requied.'],
        default: 'Mumbai'
    },
    createdBy: {
        // here we have linked this jobs models table to users models table
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})
export default mongoose.model('Jobs', jobSchema);