const User = require("../controllers/User");
const router = require(`express`).Router();

router.get(`/`, User.login);

router.post(`/`, User.loginPost);

module.exports = router;