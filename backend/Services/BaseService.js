class BaseService {
  constructor(model) {
    this.model = model;
  }
  async insertAll(objects) {
    return this.model.insertMany(objects);
  }
  async insert(object) {
    return this.model.create(object);
  }
  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object, { new: true });
  }
  async find(id) {
    return this.model.findById(id);
  }
  async query(obj) {
    return this.model.find(obj);
  }
  async getAll() {
    return this.model.find({});
  }
  async remove(id) {
    console.log("id :>> ", id);
    return this.model.findByIdAndDelete(id);
  }
}
export { BaseService };
