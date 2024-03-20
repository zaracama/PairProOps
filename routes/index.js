const Home = require("../controllers/Home");
const router = require(`express`).Router();

router.get(`/`, Home.home);

router.use(`/register`, require(`./signUp`));

router.use(`/login`, require(`./login`));

router.use(`/logout`, require(`./signOut`));

router.use(`/games`, require(`./game`));

router.use(`/profiles`, require(`./profile`));

router.use(`/orders`, require(`./order`));

module.exports = router;