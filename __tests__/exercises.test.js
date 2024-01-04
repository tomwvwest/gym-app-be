const {
  getExercises,
  postExercise,
} = require("../src/app/api/exercises/route");
const seedDatabase = require("../seed/seed");
const { getExerciseById } = require("../src/app/api/exercises/[id]/route");

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
  });
});

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
  test("400 - missing data", async () => {
    const newExercise = {
      type: "strength",
      muscle: "quads",
      equipment: "cable machine",
      difficulty: "beginner",
      instructions: "just go for it",
    };
    const response = await postExercise(newExercise);
    expect(response.status).toBe(400);

    const err = await response.json();
    expect(err).toBe("Missing Data");
  });
});

describe("GET api/exercises/id", () => {
  test("returns 200", async () => {
    const response = await getExerciseById(1);
    expect(response.status).toBe(200);

    const exercise = await response.json();
    expect(exercise).toMatchObject({
      exercise_id: 1,
      name: "Barbell Bicep Curl",
      type: "strength",
      muscle: "biceps",
      equipment: "barbell",
      difficulty: "intermediate",
      instructions:
        "Stand with a barbell in your hands, palms facing forward and hands shoulder-width apart. Keep your elbows close to your torso and exhale as you curl the weights up to shoulder level. Inhale as you slowly lower the barbell back to the starting position.",
    });
  });
  test("returns 400 if not a number/id doesnt exist", async () => {
    const response1 = await getExerciseById("dog");
    const response2 = await getExerciseById(1000);

    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
  });
});
