const Order = require("../models/Order.model");
const Dish = require("../models/Dish.model");

class OrderControler {
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
    order.items.forEach((elem) => console.log(elem.productId));
    const indexFound = order.items.findIndex(
      (item) => item.productId.id === itemId
    );

    if (indexFound !== -1) {
      order.items[indexFound].quantity += 1;
      order.items[indexFound].subTotal =
        order.items[indexFound].quantity * item.price;
    } else {
      order.items.push({
        productId: itemId,
        quantity: 1,
        price: item.price,
        subTotal: item.price,
      });
    }
    order.total = order.items
      .map((item) => item.subTotal)
      .reduce((sum, element) => sum + element);

    await order.save();
    return order;
  }

  async removeItem(item, quantity = 1) {}

  async cancelOrder(orderId) {
    const foundOrder = await Order.findById(orderId);
    if (foundOrder && foundOrder.status === "Pending") {
      foundOrder.status = "Cancelled";
      await foundOrder.save();
    }
  }

  async unSubmitOrder() {
    let order = await Order.findOne({
      userId: this.userId,
      status: "Ordering",
    })
    .populate("items.productId");

    if (!order) {
      order = await this.create({
        userId: this.userId,
        status: "Ordering",
        products: [],
      });
    }
    return order;
  }

  async getOrderHistory() {}
}

module.exports = OrderControler;
