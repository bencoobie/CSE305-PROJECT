import { APIError } from "../errors/ApiError.js";
import { errorHandler } from "../errors/errorHandler.js";

class BaseController {
  constructor(service) {
    this.service = service;
  }
  response = (data, error, res) => {
    if (error) return res.status(500).json(new APIError(error.message, 500));
    res.status(200).json(data);
  };
  create = async (req, res) => {
    const [response, error] = await errorHandler(this.service.insert(req.body));
    this.response(response, error, res);
  };
  get = async (req, res) => {
    const [response, error] = await errorHandler(this.service.getAll());
    this.response(response, error, res);
  };
  getOne = async (req, res) => {
    const [response, error] = await errorHandler(this.service.find());
    this.response(response, error, res);
  };
  update = async (req, res) => {
    const [response, error] = await errorHandler(
      this.service.update(req.params?.id, req.body)
    );
    this.response(response, error, res);
  };
  delete = async (req, res) => {
    const [response, error] = await errorHandler(
      this.service.remove(req.params?.id)
    );
    this.response(response, error, res);
  };
}

export { BaseController };
