const { IsNotAdmin } = require("../error-handling/custom.errors");

const isLoggedIn = (req, res, next) => {
  console.log(req.session.currentUser);

  if (!req.session.currentUser) {
    return res.redirect("/login");
  }

  next();
};

const isLoggedOut = (req, res, next) => {
  console.log(req.session.currentUser);
  if (req.session.currentUser) {
    return res.redirect("/");
  }

  next();
};

const isAdminLoggedIn = (req, res, next) => {
  const user = req.session.currentUser;
  if (!user) {
    return res.redirect("/login");
  } else if (user.role !== "admin") {
    const error = new IsNotAdmin("Only Admin user can perform the action!");
    next(error);
  } else {
    next();
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isAdminLoggedIn,
};
