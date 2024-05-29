import UserModel from "../model/userMode.js";
import ProductModel from "../model/ProductModel.js";

export default class usercontroller {
  registrationForm(req, res) {
    res.render("registration", { errorMessage: null });
  }
  gotologin(req, res) {
    res.render("login", { errorMessage: null });
  }
  postRegistration(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.render("login", { errorMessage: null });
  }

  async postlogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.login(email, password);
    if (!user) {
      const error = "This is invalid user";
      return res.render("login", { errorMessage: error });
    }
    req.session.username = email;

    const products = await ProductModel.get();

    res.render("index", { products });
  }
}
