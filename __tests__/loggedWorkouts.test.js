const { postLoggedWorkout, getCurrentId } = require("../src/app/api/loggedWorkouts/route");
const seedDatabase = require("../seed/seed");
beforeEach(async () => {
  await seedDatabase();
});
afterAll(async () => {
  prisma.$disconnect();
});
describe("getCurrentId", ()=>{
    test("returns 200", async ()=>{
        const newLoggedWorkout = {
            session_id: 9,
            exercise_id: 3,
            user_id: 1,
            workout_id: 1,
            weight: 7,
            reps: 5,
          }
        await postLoggedWorkout(newLoggedWorkout)
        const response = await getCurrentId()
        expect(response.status).toBe(200)
        const currentId = await response.json()
        console.log(currentId)
        expect(currentId.session_id).toBe(9)
    })
})


describe("POST api/loggedWorkouts", () => {
    test("Returns status 201 with correct exercise object", async () => {
      const newLoggedWorkout = {
        session_id: 9,
        exercise_id: 3,
        user_id: 1,
        workout_id: 1,
        weight: 7,
        reps: 5,
      }
      const response = await postLoggedWorkout(newLoggedWorkout)
      expect(response.status).toBe(201);
  
      const newResponse = await response.json();
      expect(newResponse).toMatchObject({
        session_id: 9,
        exercise_id: 3,
        user_id: 1,
        workout_id: 1,
        weight: 7,
        reps: 5,
      });
    });
    test("400 - missing data from post body", async () => {
        const newLoggedWorkout = {
            user_id: 1,
            workout_id: 1,
            weight: 7,
            reps: 5,
          }
      const response = await postLoggedWorkout(newLoggedWorkout);
      expect(response.status).toBe(400);
  
      const err = await response.json();
      expect(err.message).toBe('Bad request.');
    });
    test("400 - incorrect data provided in post body", async () => {
      const newLoggedWorkout = {
          exercise_id: "dog",
          user_id: 1,
          workout_id: 1,
          weight: 7,
          reps: 5,
        }
    const response = await postLoggedWorkout(newLoggedWorkout);
    expect(response.status).toBe(400);

    const err = await response.json();
    expect(err.message).toBe('Bad request.');
  });
  test("400 - User does not exist", async () => {
    const newLoggedWorkout = {
        session_id: 3,
        exercise_id: 1,
        user_id: 1000000,
        workout_id: 1,
        weight: 7,
        reps: 5,
      }
  const response = await postLoggedWorkout(newLoggedWorkout);
  expect(response.status).toBe(404);

  const err = await response.json();
  expect(err.message).toBe("User does not exist.");
});
  });
  