const { Schema, model } = require("mongoose");

let itemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    subTotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [
        "Ordering",
        "Pending",
        "Cancelled",
        "Received",
        "Preparing",
        "On_the_way",
        "Delivered",
      ],
    },
    items: [itemSchema],
    total: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
