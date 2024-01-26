const bcrypt = require('bcrypt');
const helper = require('../helper');
const users = require('../data/users.json');
const gamesData = require('../data/games.json');
const categoriesData = require('../data/categories.json');

class Controller {
  static async home(req, res) {
    try {
      res.render('home', { message: req.query.message });
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = users.find(user => user.username === username);

      if (user && await bcrypt.compare(password, user.password)) {
        res.redirect('/games');
      } else {
        res.redirect('/?message=Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async signup(req, res) {
    try {
      res.render('signup');
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async signupPost(req, res) {
    try {
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
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async logout(req, res) {
    try {
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async games(req, res) {
    try {
      res.render('games', { games: gamesData, findGamePrice: (gameTitle) => helper.findGamePrice(categoriesData, gameTitle) });
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async gameDetails(req, res) {
    try {
      const gameId = parseInt(req.params.id);
      const game = gamesData.find(game => game.id === gameId);

      if (game) {
        const price = helper.findGamePrice(categoriesData, game.title);
        res.render('gameDetails', { game, price });
      } else {
        res.send('Game not found');
      }
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async buy(req, res) {
    try {
      const gameId = parseInt(req.params.id);
      const game = gamesData.find(game => game.id === gameId);

      if (game) {
        res.render('buy', { game, price: helper.findGamePrice(categoriesData, game.title) });
      } else {
        res.send('Game not found');
      }
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async purchase(req, res) {
    try {
      const gameId = parseInt(req.body.gameId);
      const game = gamesData.find(game => game.id === gameId);

      if (game) {
        res.send(`Purchase completed for ${game.title}.`);
      } else {
        res.send('Game not found');
      }
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async sellForm(req, res) {
    try {
      res.render('sell');
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async sellGame(req, res) {
    try {
      const { gameName, gamePrice, gameDescription, gameImage } = req.body;

      const newGame = {
        id: gamesData.length + 1,
        title: gameName,
        description: gameDescription,
        imageURL: gameImage,
      };

      gamesData.push(newGame);

      res.redirect('/games');
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async deleteGame(req, res) {
    try {
      const gameId = parseInt(req.params.id);
      const index = gamesData.findIndex(game => game.id === gameId);

      if (index !== -1) {
        gamesData.splice(index, 1);
        res.redirect('/games');
      } else {
        res.send('Game not found');
      }
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async updateForm(req, res) {
    try {
      const gameId = parseInt(req.params.id);
      const game = gamesData.find(game => game.id === gameId);

      if (game) {
        const price = helper.findGamePrice(categoriesData, game.title);
        res.render('update', { game, price });
      } else {
        res.send('Game not found');
      }
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }

  static async updateGame(req, res) {
    try {
      const gameId = parseInt(req.params.id);
      const { gameName, gamePrice, gameDescription, gameImage } = req.body;
  
      const gameIndex = gamesData.findIndex(game => game.id === gameId);

      if (gameIndex !== -1) {
        gamesData[gameIndex] = {
          ...gamesData[gameIndex],
          title: gameName,
          description: gameDescription,
          imageURL: gameImage,
          price: parseFloat(gamePrice), 
        };
    
        const updatedGame = gamesData[gameIndex]; 
  
        const price = helper.findGamePrice(categoriesData, gameName);
        res.render('update', { game: updatedGame, price });
      } else {
        res.send('Game not found');
      }
    } catch (error) {
      console.error(error);
      res.send('Internal Server Error');
    }
  }
}

module.exports = Controller;
