const express = require('express');
const controller = require('./Controllers/controller');
const router = express.Router();

router.get('/', controller.home);
router.post('/login', controller.login);
router.get('/signup', controller.signup);
router.post('/signup', controller.signupPost);
router.get('/games', controller.games);
router.post('/logout', controller.logout);
router.get('/games/:id', controller.gameDetails);
router.get('/buy/:id', controller.buy);
router.post('/purchase', controller.purchase);
router.get('/sell', controller.sellForm);
router.post('/sell', controller.sellGame);
router.post('/delete/:id', controller.deleteGame);
router.get('/update/:id', controller.updateForm);
router.post('/update/:id', controller.updateGame);

module.exports = router;
