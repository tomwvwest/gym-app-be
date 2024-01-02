const request = require("supertest");
const app = require("../server/app");
const seedDatabase = require("../seed/seed")

beforeEach(() => {
  return seedDatabase();
});

describe("User tests", () => {
  test("Returns status 200 with the correct users array of objects", () => {
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
  test("Returns status 201 with the correct user object", () => {
    const newUser = {username: 'newUser', password: 'password'};
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then(( body ) => {
        // console.log(body)
        expect(body).toBe(1)
      });
  });
});
