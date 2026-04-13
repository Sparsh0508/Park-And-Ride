import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    parking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parking',
        required: true
    },

    startTime: {
        type: Date,
        required: true
    },

    endTime: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ['booked', 'cancelled', 'completed', 'no-show'],
        default: 'booked'
    },

    checkedIn: {
        type: Boolean,
        default: false
    },

    priceAtBooking: {   
        type: Number,
        required: true
    }

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);