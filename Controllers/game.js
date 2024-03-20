const { Game, Order, User, UserProfile, sequelize } = require(`../models/index`);
const { Op } = require(`sequelize`);
const { numberWithCommas, toRupiah } = require(`../helpers/index`);

class Game {
  static async list(req, res) {
    try {
      const role = req.session.userRole;
      const { deleted } = req.query;
      const { bought } = req.query;
      const {nameSearch} = req.query
      const {error} = req.query

      let data 

      if(nameSearch){
        data = await Game.findAll({
          where: {
            name: {
              [Op.iLike]: `%${nameSearch}%`
            }
          },
          order: [
            ["productionYear", "ASC"],
            ["stock", "DESC"],
          ],
        });
      } else {
        data = await Game.findAll({          
          order: [
            ["productionYear", "ASC"],
            ["stock", "DESC"],
          ],
        });
      }
     
      res.render(`gameList`, {
        data,
        numberWithCommas,
        toRupiah,
        role,
        deleted,
        bought,
        error
      });
    } catch (error) {
      res.send(error)
    }
  }

  static async add(req, res) {
    try {
      let {errors} = req.query
      
      res.render(`created`, {errors});
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async addPost(req, res) {
    try {
      const {
        name,
        productionYear,
        stock,
        color,
        developer,
        publisher,
        price,
        description,
        imageURL,
      } = req.body;
      await Game.create({
        name,
        productionYear,
        stock,
        color,
        developer,
        publisher,
        price,
        description,
        imageURL,
      });

      res.redirect(`/games`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let err = error.errors.map(el => el.message)
        res.redirect(`/games/add?errors=${err}`);
      } else {
        res.send(error)
      }
    }
  }

  static async edit(req, res) {
    try {
      const { id } = req.params;

      let data = await Game.findByPk(id);

      res.render(`gameEdit`, { data });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async editPost(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        productionYear,
        stock,
        color,
        developer,
        publisher,
        price,
        description,
        imageURL,
      } = req.body;

      await Game.update(
        {
          name,
          productionYear,
          stock,
          color,
          developer,
          publisher,
          price,
          description,
          imageURL,
        },
        { where: { id } }
      );
      res.redirect(`/games`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async del(req, res) {
    try {
      const { id } = req.params;
      const data = await Game.findByPk(id);

      await Game.destroy({
        where: { id },
      });

      res.redirect(`/games?deleted=${data.title}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async buy(req, res) {
    try {
      const { id } = req.params;
      const UserId = req.session.userId;

      const validUser = await UserProfile.findOne({
        where: {UserId}
      })


      if (!validUser) {
        throw new Error(`User Profile is required to Purchase Game`) 
      }
      
      const carData = await Game.findByPk(id);

      const userData = await User.findByPk(UserId, {
        include: UserProfile,
      });

      res.render(`carBuy`, { carData, userData });
    } catch (error) {
      console.log(error);
      res.redirect(`/games?error=${error.message}`);
    }
  }

  static async buyPost(req, res) {
    try {
      const { totalAmount, shippingAddress, paymentMethod, UserId, CarId } =
        req.body;

      await Order.create({ totalAmount, shippingAddress, paymentMethod, UserId, CarId })

      await Game.decrement("stock", {
        where: { id : CarId },
      });

      res.redirect(`/orders`)
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async template(req, res) {
    try {
      res.send(`tess`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Game;