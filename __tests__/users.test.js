//User tests

const { getUsers, fetchUsers } = require("../src/app/pages/api/users");
const request = require("supertest");
const app = require("../server/app");

describe("User tests", () => {
  test("Returns status 200 with the correct user object", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(5);
        users.forEach((user) => {
          expect(user).toMatchObject({
            password: expect.any(String),
            username: expect.any(String),
            user_id: expect.any(Number),
            image_url: null,
          });
        });
      });
  });
});
