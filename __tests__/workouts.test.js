const { getWorkouts, getWorkoutsByCreatorId, postWorkout, deleteWorkout, checkUserExists } = require("../src/app/api/workouts/route");
const seedDatabase = require("../seed/seed");

beforeEach(async () => {
  await seedDatabase();
});

afterAll(async () => {
  prisma.$disconnect();
});

describe("Utility functions", () => {
    test("checkUserExists returns no error for existing user_id", async () => {
        expect.assertions(0)
        return checkUserExists(1)
    });

    test("checkUserExists returns appropriate status and error message for non-existent user_id", async () => {
        const response = await checkUserExists(999);
        expect(response.status).toBe(404);

        const error = await response.json()
        expect(error.message).toBe('User does not exist.')
    });

    test("checkUserExists returns appropriate status and error message for invalid user_id", async () => {
        const response = await checkUserExists('banana');
        expect(response.status).toBe(400);

        const error = await response.json()
        expect(error.message).toBe('Bad request.')
    });
})

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

  test("GET:200 returns a list of workouts by creator_id", async () => {
    const response = await getWorkoutsByCreatorId(1);
    expect(response.status).toBe(200);

    const workouts = await response.json();
    workouts.forEach((workout) => {
      expect(workout).toEqual({
        workout_id: expect.any(Number),
        workout_name: expect.any(String),
        creator_id: 1
      });
    });
  });

  test("GET:404 sends an appropriate status and error message when provided with a non-existent creator_id", async () => {
    const response = await getWorkoutsByCreatorId(999);
    expect(response.status).toBe(404);

    const workouts = await response.json();
    expect(workouts.message).toBe('User does not exist.');
  });

  test("GET:400 sends an appropriate status and error message when provided with a invalid creator_id", async () => {
    const response = await getWorkoutsByCreatorId('banana');
    expect(response.status).toBe(400);

    const workouts = await response.json();
    expect(workouts.message).toBe('Bad request.');
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
    expect(workouts.message).toBe('User does not exist.');
  });

  test("POST:400 sends an appropriate status and error message when provided with an incomplete workout (no workout_name)", async () => {
    const newWorkout = { workout_name: "", creator_id: 1 };

    const response = await postWorkout(newWorkout);
    expect(response.status).toBe(400);

    const workouts = await response.json();
    expect(workouts.message).toBe('Bad request.');
  });

  test("POST:400 sends an appropriate status and error message when provided with an incomplete workout (no creator_id)", async () => {
    const newWorkout = { workout_name: "newWorkout"};

    const response = await postWorkout(newWorkout);
    expect(response.status).toBe(400);

    const workouts = await response.json();
    expect(workouts.message).toBe('Bad request.');
  });
});

describe("DELETE workout", () => {
  test('DELETE:204 deletes a comment and sends no body back', async () => {
    const response = await deleteWorkout(1);
    expect(response.status).toBe(204);
  });

  test("GET:404 sends an appropriate status and error message when provided with a non-existent creator_id", async () => {
    const response = await deleteWorkout(999);
    expect(response.status).toBe(404);

    const workouts = await response.json();
    expect(workouts.message).toBe('Workout does not exist.');
  });

  test("GET:400 sends an appropriate status and error message when provided with a invalid creator_id", async () => {
    const response = await deleteWorkout('banana');
    expect(response.status).toBe(400);

    const workouts = await response.json();
    expect(workouts.message).toBe('Bad request.');
  });


})