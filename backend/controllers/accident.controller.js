import { BaseController } from "./base.controller.js";
import { accidentservice } from "../Services/AccidentService.js";

class AccidentController extends BaseController {
  constructor(service) {
    super(service);
  }
}

let accidentcontroller = new AccidentController(accidentservice);
export { accidentcontroller };
