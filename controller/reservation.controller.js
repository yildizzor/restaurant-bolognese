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
}

module.exports = ReservationController;
