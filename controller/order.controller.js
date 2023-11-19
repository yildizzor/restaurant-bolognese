const Order = require("../models/Order.model");
const Dish = require("../models/Dish.model");
const { CustomError } = require("../error-handling/custom.errors");

class OrderController {
  constructor(userId) {
    this.userId = userId;
  }
  async create(orderData) {
    let order = await Order.create(orderData);
    return order;
  }
  async addItem(itemId) {
    const order = await this.unSubmitOrder();
    const item = await Dish.findById(itemId);
    const indexFound = order.items.findIndex(
      (item) => item.product.id === itemId
    );

    if (indexFound !== -1) {
      order.items[indexFound].quantity += 1;
      order.items[indexFound].subTotal =
        order.items[indexFound].quantity * item.price;
    } else {
      const newItem = {
        product: itemId,
        quantity: 1,
        subTotal: item.price,
      };
      order.items.push(newItem);
    }
    order.total = order.items
      .map((item) => item.subTotal)
      .reduce((sum, element) => sum + element);

    await order.save();
    return order;
  }

  async removeItem(itemId, quantity = 1) {
    const order = await this.unSubmitOrder();
    const item = await Dish.findById(itemId);
    const indexFound = order.items.findIndex(
      (item) => item.product.id === itemId
    );

    if (indexFound !== -1) {
      if (order.items[indexFound].quantity > 1) {
        order.items[indexFound].quantity -= 1;
        order.items[indexFound].subTotal =
          order.items[indexFound].quantity * item.price;
      }
    } else {
      throw new CustomError("Item doesn't exist in order!");
    }

    order.total = order.items
      .map((item) => item.subTotal)
      .reduce((sum, element) => sum + element);

    await order.save();
    return order;
  }

  async deleteAllItem(itemId) {
    const order = await this.unSubmitOrder();
    const item = await Dish.findById(itemId);
    const indexFound = order.items.findIndex(
      (item) => item.product.id === itemId
    );

    if (indexFound !== -1) {
      order.items.splice(indexFound, 1);
    } else {
      throw new CustomError("Item doesn't exist in order!");
    }

    if (order.items.length > 0) {
      order.total = order.items
        .map((item) => item.subTotal)
        .reduce((sum, element) => sum + element);
    } else {
      order.total = 0;
    }

    await order.save();
    return order;
  }

  async cancelOrder(orderId) {
    const foundOrder = await Order.findById(orderId);
    if (foundOrder && foundOrder.status === "Pending") {
      foundOrder.status = "Cancelled";
      await foundOrder.save();
    }
  }

  async unSubmitOrder() {
    const status = "Ordering";
    let order = await Order.findOne({
      user: this.userId,
      status: status,
    }).populate("items.product");

    if (!order) {
      order = await this.create({
        user: this.userId,
        status: status,
        products: [],
      });
    }
    console.log(order);
    return order;
  }

  async submitOrder() {
    const order = await this.unSubmitOrder();
    if (order.items.length > 0) {
      order.status = "Pending";
      order.date = Date.now();
      await order.save();
      return order;
    }
    return;
  }

  async getAllOrders() {
    const orders = await Order.find({ status: { $ne: "Ordering" } }).populate(
      "items.product"
    ).sort({'date': -1});
    orders.forEach((order) => {
      order.cancallable = order.status === "Pending";
      order.formattedDate = order.date.toISOString().split("T")[0];
    });
    return orders;
  }
}

module.exports = OrderController;
