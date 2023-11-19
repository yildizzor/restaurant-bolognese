const Reservation = require("../models/Reservation.model");

class ReservationController {
  constructor(userId) {
    this.userId = userId;
  }

  async create(data) {
    console.log(this.userId);

    let reservation = await Reservation.create({ user: this.userId, ...data });

    return reservation;
  }

  async delete(reservationId) {
    await Reservation.findByIdAndDelete(reservationId);
  }

  async getAllReservations() {
    const reservations = await Reservation.find({ user: this.userId });
    reservations.forEach(
      (reservation) =>
        (reservation.formattedDate = reservation.date
          .toISOString()
          .split("T")[0])
    );
    console.log(reservations);
    return reservations;
  }
}

module.exports = ReservationController;
