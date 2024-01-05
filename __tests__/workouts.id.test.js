const seedDatabase = require("../seed/seed");
const { createRequest, createResponse } = require('node-mocks-http');
const { GET, POST } = require('../src/app/api/workouts/[id]/route');
const { getWorkouts, postWorkout } = require('../src/app/api/workouts/route')

beforeEach(async () => {
  await seedDatabase();
});

afterAll(async () => {
  prisma.$disconnect();
});

describe('GET /api/workouts/:id', () => {
    test('GET:200 returns workout for workout_id', async () => {
        const req = createRequest({
            method: "GET",
            params: {
                id: 2
            }
        })

        const res = await GET(req)
        expect(res.status).toBe(200)

        const exercises = await res.json()
        exercises.forEach((exercise) => {
            expect(exercise).toEqual({
              exercise_id: expect.any(Number),
              difficulty: expect.any(String),
              equipment: expect.any(String),
              instructions: expect.any(String),
              muscle: expect.any(String),
              name: expect.any(String),
              type: expect.any(String),
            });
        });
    });

    test("GET:404 sends an appropriate status and error message when provided with a non-existent workout_id", async () => {
        const req = createRequest({
            method: "GET",
            params: {
                id: 999
            }
        })

        const response = await GET(req)
        expect(response.status).toBe(404)
    
        const workouts = await response.json();
        expect(workouts.message).toBe('Workout does not exist.');
    });
    
    test("GET:400 sends an appropriate status and error message when provided with a invalid workout_id", async () => {
        const req = createRequest({
            method: "GET",
            params: {
                id: 'banana'
            }
        })

        const response = await GET(req)
        expect(response.status).toBe(400)
    
        const workouts = await response.json();
        expect(workouts.message).toBe('Bad request.');
    });
})

describe('POST /api/workouts/:id', () => {
    test('POST:201 creates a new workout when given a list of exercises', async () => {
        // create new workout
        const newWorkout = { workout_name: "newWorkout", creator_id: 1 };
        await postWorkout(newWorkout);

        // add exercises to new workout
        const newExerciseList = [
            { exercise_id: 2 }, 
            { exercise_id: 1 },
            { exercise_id: 7 },
            { exercise_id: 3 },
            { exercise_id: 8 },
        ]

        const req = createRequest({
            method: "POST",
            body: newExerciseList,
            params: {
                id: 6
            }
        })

        const res = await POST(req);
        expect(res.status).toBe(201);

        // make sure new exercises are in newWorkout
        const getReq = createRequest({
            method: "GET",
            params: {
                id: 6
            }
        })

        const getRes = await GET(getReq)
        expect(getRes.status).toBe(200)

        const newExercises = await getRes.json();
        newExercises.forEach((exercise) => {
            expect(exercise).toEqual({
              exercise_id: expect.any(Number),
              difficulty: expect.any(String),
              equipment: expect.any(String),
              instructions: expect.any(String),
              muscle: expect.any(String),
              name: expect.any(String),
              type: expect.any(String),
            });
        });

        expect(newExercises.map((exercise) => {
            return exercise.exercise_id
        })).toEqual([1, 2, 3, 7, 8])
    })
})