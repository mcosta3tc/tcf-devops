const UserController = require("./user");
const User = require("../models/user");

const findAllResult = [{}];
jest.mock("../models/User", () => {
  return {
    findAll: jest.fn().mockResolvedValue(findAllResult),
  };
});

describe("user test", () => {
  let res, req;
  beforeEach(() => {
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };
    req = {
      body: {},
      query: {},
    };
  });

  it("should return users", async () => {
    await UserController.getUsers(req, res);

    expect(User.findAll).toHaveBeenCalledWith(req.query);
    expect(res.json).toHaveBeenCalledWith(findAllResult);
  });
});
