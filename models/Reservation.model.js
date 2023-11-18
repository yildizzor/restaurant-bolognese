const { Schema, model } = require("mongoose");

const reservationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const currentDate = new Date();
          const maxDate = new Date();
          maxDate.setDate(currentDate.getDate() + 30);

          return value >= currentDate && value <= maxDate;
        },
        message: "The date must be between now and 30 days later.",
      },
    },

    time: {
      type: String,
      required: true,
    },

    person: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
    },
  },
  {
    timestamps: true,
  }
);
const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
