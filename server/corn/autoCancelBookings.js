import cron from 'node-cron';
import Booking from '../modules/booking.js';
import Parking from '../modules/parking.js';
import { updatePrice } from '../services/pricingService.js';

cron.schedule('*/5 * * * *', async () => {
    console.log("Running auto-cancel job...");

    const now = new Date();

    const bookings = await Booking.find({
        status: 'booked',
        checkedIn: false
    });

    for (let booking of bookings) {
        let limit = new Date(booking.startTime.getTime() + 15 * 60 * 1000);

        if (now > limit) {
            booking.status = 'no-show';
            await booking.save();

            // free slot
            const parking = await Parking.findById(booking.parking);
            parking.availableSlots += 1;

            // update price
            parking.currentPricePerHour = updatePrice(parking);

            await parking.save();
        }
    }
});
