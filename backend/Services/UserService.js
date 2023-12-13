import { BaseService } from "./BaseService.js";
import { user } from "../models/User.model.js";
class UserService extends BaseService {
  constructor(model) {
    super(model);
  }
}
let userService = new UserService(user);
export { userService };
