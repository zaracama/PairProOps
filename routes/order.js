const router = require(`express`).Router();
const Order = require(`../controllers/Order`)

const bothRole = function (req, res, next) {
  console.log(req.session);
  if (!req.session.userRole) {
    const err = `You need to be logged in to access this feature`;
    res.redirect(`/login?error=${err}`);
  } else {
    next();
  }
};

const justAdmin = function (req, res, next) {
  console.log(req.session);
  if (req.session.userRole !== `admin`) {
    const err = `Only Admin could access this feature`;
    res.redirect(`/login?error=${err}`);
  } else {
    next();
  }
};

router.get(`/`, bothRole, Order.list);


router.get(`/invoice/:uniqueKey`, bothRole, Order.invoice);

router.get(`/paid/:uniqueKey`, bothRole, Order.paid);

router.get(`/confirmed/:uniqueKey`, justAdmin, Order.confirmed);

router.get(`/delete/:uniqueKey`, justAdmin, Order.del);

module.exports = router;