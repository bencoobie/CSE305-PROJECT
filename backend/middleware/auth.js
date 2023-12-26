import jwt from "jsonwebtoken";
import { userService } from "../Services/UserService.js";
import { APIError } from "../errors/ApiError.js";

const authenticateToken = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1] || null; // [Bearer xxxx]
  if (token === null) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.SECRET, async (err, user) => {
    if (err) return res.status(403).send({ error: err });

    let loggedUser = await userService.find(user.sub);
    if (!loggedUser || loggedUser._id === req.params._id) {
      return res.status(401).send(new APIError("Unauthorized", 401));
    } else {
      req.user = {
        name: loggedUser.name,
        role: loggedUser.role,
      };
      next();
    }
  });
};

export { authenticateToken };
