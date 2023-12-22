import { userService } from "../Services/UserService.js";
import { BaseController } from "./base.controller.js";
import { passToHash, checkPass } from "../utils/bcryptjs.js";
import { errorHandler } from "../errors/errorHandler.js";
import { APIError } from "../errors/ApiError.js";
import { createTemporaryToken } from "../utils/jwt.js";

class UserController extends BaseController {
  constructor(service) {
    super(service);
    this.service = service;
  }
  //! SignUp => kayıt olma yeri
  create = async (req, res) => {
    let userPass = req.body.password;
    const hash = await passToHash(userPass);
    let [response, error] = await errorHandler(
      this.service.insert({
        ...req.body,
        password: hash,
      })
    );
    if (error) return this.response(null, error, res);
    let token = await createTemporaryToken(response._id, response.email);
    res.cookie("token", token, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
    });
    this.response(token, error, res);
  };
  // ! signIn => giris yapma yeri
  signin = async (req, res) => {
    let plaintextPassword = req.body.password;
    let [user, error] = await errorHandler(
      this.service.query({ email: req.body.email })
    );
    if (user.length == 0)
      this.response(null, { message: "Please SignUp !" }, res);
    else {
      let hash = user[0].password;
      const result = await checkPass(plaintextPassword, hash);
      if (result) {
        let token = await createTemporaryToken(user[0]._id, user[0].email);
        res.cookie("token", token, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true,
        });
        this.response(token, error, res);
      }
    }
  };
  logOut = async (req, res) => {
    await res.clearCookie("token");
    this.response("Successfully LoggedOut", null, res);
  };
}
let usercontroller = new UserController(userService);
export { usercontroller };
