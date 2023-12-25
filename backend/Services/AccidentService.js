import { accident } from "../models/Accident.model.js";
import { BaseService } from "./BaseService.js";

class AccidentService extends BaseService {
  constructor(model) {
    super(model);
  }
}
let accidentservice = new AccidentService(accident);
export { accidentservice };
