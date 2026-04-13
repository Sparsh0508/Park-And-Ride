

export function updatePrice(parking) {
    let occupied = parking.totalSlots - parking.availableSlots;
    let ratio = occupied / parking.totalSlots;

    if (ratio < 0.4) return parking.basePricePerHour;
    else if (ratio < 0.7) return parking.basePricePerHour * 1.5;
    else if (ratio < 0.9) return parking.basePricePerHour * 2;
    else return parking.basePricePerHour * 3;
}