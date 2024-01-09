const { NextResponse } = require("next/server");
const { headers } = require('next/headers');
const { prisma } = require("../../../../../lib/prisma");
const { checkWorkoutExists } = require('../../../../../_utils/checkWorkoutExists');
const { handlePsqlErrors } = require('../../../../../_utils/errors');
const { checkExerciseExists } = require('../../../../../_utils/checkExerciseExists');

async function GET(request, { params }) {
    const id = Number(params.id)

    try {        
        const check = await checkWorkoutExists(id)
        if (check) { return check }

        const exerciseList = await prisma.ExercisesInWorkouts.findMany({
            where: {
                workout_id: id
            }
        })

        const exerciseIdList = exerciseList.map((exercise) => exercise.exercise_id)

        const exercises = await prisma.exercises.findMany({
            where: {
                exercise_id: {in: exerciseIdList}
            }
        })

        return NextResponse.json(exercises, {status: 200})

    } catch (error) {
        return handlePsqlErrors(error)
    }
}

async function POST(request) {
    const body = await request.json();
    const workout_id = Number(body.workout_id);
    const exercise_id = body.exercise_id;

    const newWorkout = { exercise_id, workout_id }

    try {
        // if (!newWorkout.length) { throw Error() }

        const res = await prisma.ExercisesInWorkouts.create({
            data: newWorkout
        })

        return NextResponse.json({ newWorkout }, {status: 201})

    } catch (error) {
        return handlePsqlErrors(error, 'Exercise')
    }
}

// deletes an exercise from a workout (list of exercises)
async function DELETE(request, { params }) {
    const workout_id = Number(params.id);
    const exercise_id = Number(headers().get('exercise_id'))

    try {
        const checkExercise = await checkExerciseExists(exercise_id)
        if (checkExercise) { return checkExercise }

        const checkWorkout = await checkWorkoutExists(workout_id)
        if (checkWorkout) { return checkWorkout }

        await prisma.ExercisesInWorkouts.deleteMany({
            where: {
                workout_id: workout_id,
                exercise_id: exercise_id
            }
        })

        return new Response(null, {status: 204})

    } catch (error) {
        console.log('Error thrown in route.js')
        return handlePsqlErrors(error)
    }
}

module.exports = { GET, POST, DELETE }