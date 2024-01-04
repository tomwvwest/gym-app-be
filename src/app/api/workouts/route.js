const { NextResponse } = require("next/server");
const { Prisma } = require("@prisma/client")
const { prisma } = require("../../../../lib/prisma");

// async function checkUserExists() {

// }

// async function checkWorkoutExists() {
    
// }

async function getWorkouts() {
    const workouts = await prisma.workouts.findMany()
    return NextResponse.json(workouts, {status: 200})
}

async function postWorkout(workout) {
    const { workout_name, creator_id } = workout;

    try {
        const newWorkout = await prisma.workouts.create({
            data: {
                workout_name,
                creator_id
            }
        })

        return NextResponse.json({newWorkout}, {status: 201})

    } catch (error) {
        let errMessage;
        let errStatus;

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                errMessage = 'Post failed. User does not exist.'
                errStatus = 404;
              }

            if (error.code === 'P2002') {
              errMessage = 'relevant error message'
            }

            return NextResponse.json({message: errMessage}, {status: errStatus})
        }
    }
}

async function patchWorkout(workout) {

}

async function deleteWorkout(workout) {

}


module.exports = {getWorkouts, postWorkout, patchWorkout, deleteWorkout}