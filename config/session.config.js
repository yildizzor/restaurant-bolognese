const MongoStore = require("connect-mongo");
const session = require("express-session");
const OrderController = require("../controller/order.contoller");

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitilazed: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60000000,
      },
      store: MongoStore.create({
        mongoUrl:
          process.env.MONGODB_URI ||
          "mongodb://127.0.0.1:27017/restaurant-bolognese",
      }),
    })
  );

  app.use(async function (req, res, next) {
    res.locals.isLoggedIn = req.session.currentUser !== undefined;
    res.locals.isLoggedOut = req.session.currentUser === undefined;
    res.locals.currentRoute = req.url;
    if (res.locals.isLoggedIn) {
      const orderController = new OrderController(req.session.currentUser.id);
      const order = await orderController.unSubmitOrder();
      res.locals.orderItemsCount = order.items.length
        ? `${order.items.length}`
        : "";
    }

    next();
  });
};
