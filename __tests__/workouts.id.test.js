const seedDatabase = require("../seed/seed");
const { createRequest, createResponse } = require('node-mocks-http');
const { GET, POST, DELETE } = require('../src/app/api/workouts/[id]/route');
const { postWorkout } = require('../src/app/api/workouts/route');
const { NextRequest } = require("next/server");

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
        })

        const query = { params : { id : 2 } }

        const res = await GET(req, query)
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
        })

        const query = { params : { id : 999 } }

        const response = await GET(req, query)
        expect(response.status).toBe(404)
    
        const workouts = await response.json();
        expect(workouts.message).toBe('Workout does not exist.');
    });
    
    test("GET:400 sends an appropriate status and error message when provided with a invalid workout_id", async () => {
        const req = createRequest({
            method: "GET",
        })

        const query = { params : { id : 'banana' } }

        const response = await GET(req, query)
        expect(response.status).toBe(400)
    
        const workouts = await response.json();
        expect(workouts.message).toBe('Bad request.');
    });
})

describe('POST /api/workouts/:id', () => {
    test('POST:201 adds exercises to an existing workout', async () => {
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

        const req = createRequest<NextRequest>({
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
    });

    test("POST:404 sends an appropriate status and error message when provided with a non-existent exercise_id", async () => {
        const newExerciseList = [
            { exercise_id: 2 }, 
            { exercise_id: 1 },
            { exercise_id: 7 },
            { exercise_id: 3 },
            { exercise_id: 834 },
        ]

        const req = createRequest({
            method: "POST",
            body: newExerciseList,
            params: {
                id: 6
            }
        })

        const res = await POST(req);
        expect(res.status).toBe(404);
    
        const workouts = await res.json();
        expect(workouts.message).toBe('Exercise does not exist.');
      });
    
      test("POST:400 sends an appropriate status and error message when provided with an empty exercise list", async () => {
        const newExerciseList = []

        const req = createRequest({
            method: "POST",
            body: newExerciseList,
            params: {
                id: 6
            }
        })

        const res = await POST(req);
        expect(res.status).toBe(400);
    
        const workouts = await res.json();
        expect(workouts.message).toBe('Bad request.');
      });
    
      test("POST:400 sends an appropriate status and error message when provided with an invalid exercise_id", async () => {
        const newExerciseList = [
            { exercise_id: 2 }, 
            { exercise_id: 1 },
            { exercise_id: 'banana' },
            { exercise_id: 3 },
            { exercise_id: 9 },
        ]

        const req = createRequest({
            method: "POST",
            body: newExerciseList,
            params: {
                id: 6
            }
        })

        const res = await POST(req);
        expect(res.status).toBe(400);
    
        const workouts = await res.json();
        expect(workouts.message).toBe('Bad request.');
      });
})

describe('DELETE /api/workouts/:id', () => {
    test('DELETE:204 deletes an exercise and sends no body back', async () => {
        const req = createRequest({
            method: "DELETE",
            params: {
                workout_id: 2,
                exercise_id: 7
            }
        });

        const response = await DELETE(req);
        expect(response.status).toBe(204);
    });

    test('DELETE:204 deletes only the exercise in the request', async () => {
        const req = createRequest({
            method: "DELETE",
            params: {
                workout_id: 2,
                exercise_id: 7
            }
        });

        const response = await DELETE(req);
        expect(response.status).toBe(204);

        const getReq = createRequest({
            method: "GET",
            params: {
                id: 2
            }
        })

        const res = await GET(getReq)
        expect(res.status).toBe(200)

        const exercises = await res.json()
        expect(exercises).toEqual([
            {
              exercise_id: 2,
              name: 'Concentration Curls',
              type: 'isolation',
              muscle: 'biceps',
              equipment: 'dumbbell',
              difficulty: 'intermediate',
              instructions: 'Sit on a bench with a dumbbell in one hand, and rest your elbow on the inner part of your thigh. Allow the dumbbell to hang straight down. Curl the dumbbell up toward your chest, then lower it back down in a controlled manner.'
            },
            {
              exercise_id: 4,
              name: 'EZ Bar Curl',
              type: 'strength',
              muscle: 'biceps',
              equipment: 'EZ bar',
              difficulty: 'intermediate',
              instructions: 'Hold an EZ bar with an underhand grip, hands shoulder-width apart. Keep your elbows close to your torso and exhale as you curl the weights up. Inhale as you slowly lower the EZ bar back to the starting position.'
            },
            {
              exercise_id: 8,
              name: 'Dumbbell Flyes',
              type: 'isolation',
              muscle: 'chest',
              equipment: 'dumbbell',
              difficulty: 'intermediate',
              instructions: 'Lie on a bench with a dumbbell in each hand, palms facing each other. Lower the dumbbells out to the sides, feeling a stretch in your chest. Bring the dumbbells back up to the starting position.'
            }
          ])
    });

    test("GET:404 sends an appropriate status and error message when provided with a non-existent exercise_id", async () => {
        const req = createRequest({
            method: "DELETE",
            params: {
                workout_id: 2,
                exercise_id: 999
            }
        });

        const response = await DELETE(req);
        expect(response.status).toBe(404);
    
        const workouts = await response.json();
        expect(workouts.message).toBe('Exercise does not exist.');
    });

    test("GET:404 sends an appropriate status and error message when provided with a non-existent workout_id", async () => {
        const req = createRequest({
            method: "DELETE",
            params: {
                workout_id: 999,
                exercise_id: 7
            }
        });

        const response = await DELETE(req);
        expect(response.status).toBe(404);
    
        const workouts = await response.json();
        expect(workouts.message).toBe('Workout does not exist.');
    });
    
    test("GET:400 sends an appropriate status and error message when provided with a invalid exercise_id", async () => {
        const req = createRequest({
            method: "DELETE",
            params: {
                workout_id: 2,
                exercise_id: 'banana'
            }
        });

        const response = await DELETE(req);
        expect(response.status).toBe(400);
    
        const workouts = await response.json();
        expect(workouts.message).toBe('Bad request.');
    });

    test("GET:400 sends an appropriate status and error message when provided with a invalid workout_id", async () => {
        const req = createRequest({
            method: "DELETE",
            params: {
                workout_id: 'banana',
                exercise_id: 7
            }
        });

        const response = await DELETE(req);
        expect(response.status).toBe(400);
    
        const workouts = await response.json();
        expect(workouts.message).toBe('Bad request.');
    });
})