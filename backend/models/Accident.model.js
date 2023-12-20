import mongoose from "mongoose";

const AccidentSchema = new mongoose.Schema({
  title: { type: String },
  x_coordinat: { type: String },
  x_coordinat: { type: String },
  description: { type: String },
  license_plate: [{ type: String }],
  detail_location: { type: String },
  date: { type: String },
});
let accident = mongoose.model("Accident", AccidentSchema);
export { accident };
