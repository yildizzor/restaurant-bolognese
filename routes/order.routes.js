const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middelwares/route-guard");
const OrderController = require("../controller/order.contoller");

router.get(
  "/order",
  /*isLoggedIn,*/ async (req, res, next) => {
    try {
      const currentUser = req.session.currentUser;
      const orderController = new OrderController(currentUser.id);
      const order = await orderController.unSubmitOrder();
      console.log(order);
      res.render("dishes/order", { currentUser, order });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/order/item/:id",
  /*isLoggedIn,*/ async (req, res, next) => {
    const { id } = req.params;
    try {
      const userId = req.session.currentUser.id;

      // const userId = "654f77733997ead82be61fc5";
      const orderController = new OrderController(userId);

      const order = await orderController.addItem(id);

      res.redirect("/menu");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
