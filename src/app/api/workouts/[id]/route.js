const { NextResponse } = require("next/server");
const { prisma } = require("../../../../../lib/prisma");
const { checkWorkoutExists } = require('../../../../../_utils/checkWorkoutExists');
const { handlePsqlErrors } = require('../../../../../_utils/errors');

async function GET(request) {
    const id = request.params.id

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
    const workout_id = request.params.id;
    const newExerciseList = request.body;


    const newWorkout = newExerciseList.map((exercise) => {
        return {
            exercise_id: exercise.exercise_id,
            workout_id: workout_id,
        }
    })

    try {
        if (!newWorkout.length) { throw Error() }

        await prisma.ExercisesInWorkouts.createMany({
            data: newWorkout
        })

        return NextResponse.json({ newWorkout }, {status: 201})

    } catch (error) {
        return handlePsqlErrors(error, 'Exercise')
    }
}

async function PATCH(request) {
    
}

// deletes an exercise from a workout (list of exercises)
async function DELETE(request) {
    
}

module.exports = { GET, POST, PATCH, DELETE }