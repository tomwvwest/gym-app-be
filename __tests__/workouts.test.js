const { getWorkouts, postWorkout, patchWorkout, deleteWorkout } = require("../src/app/api/workouts/route");
const seedDatabase = require("../seed/seed");

beforeEach(async () => {
  await seedDatabase();
});

afterAll(async () => {
  prisma.$disconnect();
});

describe("GET workouts", () => {
  test("GET:200 returns a list of workouts", async () => {
    const response = await getWorkouts();
    expect(response.status).toBe(200);

    const workouts = await response.json();
    workouts.forEach((workout) => {
      expect(workout).toEqual({
        workout_id: expect.any(Number),
        workout_name: expect.any(String),
        creator_id: expect.any(Number)
      });
    });
  });
});

describe("POST workout", () => {
  test("POST:201 inserts a new workout into the database and sends the new workout to the client", async () => {
    const newWorkout = { workout_name: "newWorkout", creator_id: 1 };

    const response = await postWorkout(newWorkout);
    expect(response.status).toBe(201);

    const newResponse = await response.json();
    expect(newResponse.newWorkout).toEqual({
        workout_id: 6,
        workout_name: "newWorkout",
        creator_id: 1
    });
  });

  test("POST:404 sends an appropriate status and error message when provided with a non-existent creator_id", async () => {
    const newWorkout = { workout_name: "newWorkout", creator_id: 999 };

    const response = await postWorkout(newWorkout);
    expect(response.status).toBe(404);

    const workouts = await response.json();
    expect(workouts.message).toBe('Post failed. User does not exist.');
  });
});