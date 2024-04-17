import createApiClient from "./api.service";
class BorrowService {
  constructor(baseUrl = "/api/borrow") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async post(id) {
    return (await this.api.post(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
}
export default new BorrowService();
