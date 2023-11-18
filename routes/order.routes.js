const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middelwares/route-guard");
const OrderController = require("../controller/order.contoller");
const { CustomError } = require("../error-handling/custom.errors");

router.get(
  "/order",
  /*isLoggedIn,*/ async (req, res, next) => {
    try {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        throw new CustomError("You need to login to make an order");
      }

      const orderController = new OrderController(currentUser._id);
      const order = await orderController.unSubmitOrder();
      console.log(order);
      res.render("dishes/order", { currentUser, order });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/order",
  /*isLoggedIn,*/ async (req, res, next) => {
    try {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        throw new CustomError("You need to login to make an order");
      }
      const orderController = new OrderController(currentUser._id);
      const order = await orderController.submitOrder();
      let message = order
        ? "Your order has been received.Thank You!"
        : "Please add an item!";

      res.render("dishes/order", { currentUser, order, message });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/order/item/:id",
  /*isLoggedIn,*/ async (req, res, next) => {
    const { id } = req.params;
    const { currentPage } = req.body;

    try {
      const userId = req.session.currentUser._id;

      const orderController = new OrderController(userId);

      const order = await orderController.addItem(id);

      res.redirect(currentPage);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/order/item/remove/:id",
  /*isLoggedIn,*/ async (req, res, next) => {
    const { id } = req.params;
    const { currentPage } = req.body;
    try {
      const currentUserId = req.session.currentUser._id;
      const orderController = new OrderController(currentUserId);
      await orderController.removeItem(id);
      res.redirect(currentPage);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/order/item/delete/:id",
  /*isLoggedIn,*/ async (req, res, next) => {
    const { id } = req.params;
    const { currentPage } = req.body;
    try {
      const currentUserId = req.session.currentUser._id;
      const orderController = new OrderController(currentUserId);
      await orderController.deleteAllItem(id);
      res.redirect(currentPage);
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
