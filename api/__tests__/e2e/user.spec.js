const request = require("supertest");
const app = require("../../index");
const sequelize = require("../../models/User").sequelize;

const bodyObject = {
  email: "tesst",
  password: "test",
  lastname: "test",
  firstname: "test",
};

describe("Post Endpoints", () => {
  beforeEach(async () => {
    await sequelize.query('DELETE FROM "Users"');
  });
  afterAll(async () => {
    await sequelize.close();
  });
  it("should get users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it("should create users", async () => {
    const res = await request(app)
      .post("/users")
      .set("Content-type", "application/json")
      .send(bodyObject);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(expect.objectContaining(bodyObject));
  });
});
