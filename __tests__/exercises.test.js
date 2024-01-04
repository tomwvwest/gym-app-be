const {
  getExercises,
  postExercise,
} = require("../src/app/api/exercises/route");
const seedDatabase = require("../seed/seed");

beforeEach(async () => {
  await seedDatabase();
});

afterAll(async () => {
  prisma.$disconnect();
});

describe("GET api/exercises", () => {
  test("returns a list of exercises", async () => {
    const response = await getExercises();
    expect(response.status).toBe(200);
  })})

  describe("POST api/exercises", () => {
    test("Returns status 201 with correct exercise object", async () => {
      const newExercise = {
        name: "Leg lift",
        type: "strength",
        muscle: "quads",
        equipment: "cable machine",
        difficulty: "beginner",
        instructions: "just go for it",
      };
      const response = await postExercise(newExercise);
      expect(response.status).toBe(201);

      const newResponse = await response.json();
      expect(newResponse).toMatchObject({
        exercise_id: 23,
        name: "Leg lift",
        type: "strength",
        muscle: "quads",
        equipment: "cable machine",
        difficulty: "beginner",
        instructions: "just go for it",
      });
    });
    test("400 - missing data", async ()=>{
        const newExercise = {
            type: "strength",
            muscle: "quads",
            equipment: "cable machine",
            difficulty: "beginner",
            instructions: "just go for it",
          };
        const response = await postExercise(newExercise)
        expect(response.status).toBe(400)

        const err = await response.json()
        expect(err).toBe('Missing Data')

    })
  })

