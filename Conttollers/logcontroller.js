zconst {
  User,
  Profile,
  Course,
  Category,
  UserCourse,
} = require("../models/index");
class LoginController {
  static async registerForm(req, res) {
    const { errors } = req.query;
    try {
      res.render("registers", { errors });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async loginForm(req, res) {
    const { errors } = req.query;
    try {
      res.render("logins", { errors });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async register(req, res) {
    const { username, email, password, role } = req.body;
    try {
      await User.create({ username, email, password, role });
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect(
        `/register?errors=${error.errors.map((err) => err.message)}`
      );
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {

      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Invalid Email");
      if (!user.verify(password)) throw new Error("Invalid Password");

      req.session.user = user;
      res.redirect("/courses");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err.message);
      } else {
        res.redirect("/login");
      }
    });
  }
}

module.exports = LoginController;
