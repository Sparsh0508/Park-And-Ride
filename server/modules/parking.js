import mongoose from 'mongoose';

const parkingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    totalSlots: {
        type: Number,
        required: true
    },

    availableSlots: {
        type: Number,
        required: true
    },

    basePricePerHour: {
        type: Number,
        required: true
    },

    currentPricePerHour: {
        type: Number
    },

    isFull: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export default mongoose.model("Parking", parkingSchema);