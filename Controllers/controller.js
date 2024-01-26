const bcrypt = require('bcrypt');
const helper = require('../helper');
const users = require('../data/users.json');
const gamesData = require('../data/games.json');
const categoriesData = require('../data/categories.json');

class Controller {
  static async home(req, res) {
    res.render('home', { message: req.query.message });
  }

  static async login(req, res) {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
      res.redirect('/games');
    } else {
      res.redirect('/?message=Invalid credentials');
    }
  }

  static async signup(req, res) {
    res.render('signup');
  }

  static async signupPost(req, res) {
    const { username, email, password, confirmPassword } = req.body;

    const existingUser = users.find(user => user.username === username || user.email === email);

    if (existingUser) {
      return res.redirect('/signup?message=Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      role: 'user',
    };

    users.push(newUser);

    res.redirect('/games');
  }

  static async logout(req, res) {
    res.redirect('/');
  }

  static async games(req, res) {
    res.render('games', { games: gamesData, findGamePrice: (gameTitle) => helper.findGamePrice(categoriesData, gameTitle) });
  }

  static async gameDetails(req, res) {
    const gameId = parseInt(req.params.id);
    const game = gamesData.find(game => game.id === gameId);

    if (game) {
      const price = helper.findGamePrice(categoriesData, game.title);
      res.render('gameDetails', { game, price });
    } else {
      res.send('Game not found');
    }
  }

  static async buy(req, res) {
    const gameId = parseInt(req.params.id);
    const game = gamesData.find(game => game.id === gameId);

    if (game) {
      res.render('buy', { game, price: helper.findGamePrice(categoriesData, game.title) });
    } else {
      res.send('Game not found');
    }
  }

  static async purchase(req, res) {
    const gameId = parseInt(req.body.gameId);
    const game = gamesData.find(game => game.id === gameId);

    if (game) {
      res.send(`Purchase completed for ${game.title}.`);
    } else {
      res.send('Game not found');
    }
  }

  static async sellForm(req, res) {
    res.render('sell');
  }

  static async sellGame(req, res) {
    const { gameName, gamePrice, gameDescription, gameImage } = req.body;

    const newGame = {
      id: gamesData.length + 1,
      title: gameName,
      description: gameDescription,
      imageURL: gameImage,
    };

    gamesData.push(newGame);

    res.redirect('/games');
  }

  static async deleteGame(req, res) {
    const gameId = parseInt(req.params.id);
    const index = gamesData.findIndex(game => game.id === gameId);

    if (index !== -1) {
      gamesData.splice(index, 1);
      res.redirect('/games');
    } else {
      res.send('Game not found');
    }
  }

  static async updateForm(req, res) {
    const gameId = parseInt(req.params.id);
    const game = gamesData.find(game => game.id === gameId);

    if (game) {
      const price = helper.findGamePrice(categoriesData, game.title);
      res.render('update', { game, price });
    } else {
      res.send('Game not found');
    }
  }

  static async updateGame(req, res) {
    const gameId = parseInt(req.params.id);
    const { gameName, gamePrice, gameDescription, gameImage } = req.body;
    const gameIndex = gamesData.findIndex(game => game.id === gameId);

    if (gameIndex !== -1) {
      // Update properti game yang diperlukan
      gamesData[gameIndex] = {
        ...gamesData[gameIndex],
        title: gameName,
        description: gameDescription,
        imageURL: gameImage,
        price: parseFloat(gamePrice), // Konversi harga menjadi angka jika diperlukan
      };
  
      const updatedGame = gamesData[gameIndex]; // Ambil objek game yang telah diperbarui

      const price = helper.findGamePrice(categoriesData, gameName);
      res.render('update', { game: updatedGame, price });
    } else {
      res.status(404).send('Game not found');
    }
  }
}

module.exports = Controller;
