const User = require("../controllers/User");
const router = require(`express`).Router();

router.get(`/`, User.logout);

module.exports = router;