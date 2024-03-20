const game = require("../controllers/game");
const router = require(`express`).Router();

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

router.get(`/`, bothRole, game.list);
router.get(`/buy/:id`, bothRole, game.buy);
router.post(`/buy/:id`, bothRole, game.buyPost);

router.get(`/add`, justAdmin, game.add);
router.post(`/add`, justAdmin, game.addPost);

router.get(`/edit/:id`, justAdmin, game.edit);
router.post(`/edit/:id`, justAdmin, game.editPost);

router.get(`/delete/:id`, justAdmin, game.del);


module.exports = router;