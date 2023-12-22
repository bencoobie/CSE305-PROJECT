import { BaseController } from "./base.controller.js";
import { accidentservice } from "../Services/AccidentService.js";
import { errorHandler } from "../errors/errorHandler.js";
import { APIError } from "../errors/ApiError.js";
import { getData } from "../config/gpt.getdata.js";
class AccidentController extends BaseController {
  constructor(service) {
    super(service);
  }
}

let accidentcontroller = new AccidentController(accidentservice);
export { accidentcontroller };
