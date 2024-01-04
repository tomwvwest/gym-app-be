const { NextResponse } = require("next/server");
const { Prisma } = require("@prisma/client")
const { prisma } = require("../../../../lib/prisma");

async function checkUserExists(id) {
    if (typeof id !== 'number') {
        return Promise.reject({status: 400, message: "Bad Request."})
    }

    const user = await prisma.users.findUnique({
        where:{
            user_id: id
        }
    })
    if (!user) { return Promise.reject({status: 404, message: "User does not exist."}) }
}

// async function checkWorkoutExists() {
    
// }

async function getWorkouts() {
    const workouts = await prisma.workouts.findMany()
    return NextResponse.json(workouts, {status: 200})
}

async function getWorkoutsByCreatorId(creator_id) {
    try {        
        // const userExists = 
        await checkUserExists(creator_id)
        // if (!userExists) { throw Error(404) }

        const workouts = await prisma.workouts.findMany({
            where: {
                creator_id: creator_id
            }
        })
        return NextResponse.json(workouts, {status: 200})

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                error.message = 'Cannot find workouts. User does not exist.'
                error.status = 404;
              }
        } else if (!error.status) {
            error.status = 400;
        }
        return NextResponse.json({message: error.message}, {status: error.status})
    }
}

async function postWorkout(workout) {
    const { workout_name, creator_id } = workout;

    try {
        if (!workout_name.length || !creator_id) {
            throw Error('Bad request.')
        }

        const newWorkout = await prisma.workouts.create({
            data: {
                workout_name,
                creator_id
            }
        })

        return NextResponse.json({newWorkout}, {status: 201})

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                error.message = 'Post failed. User does not exist.'
                error.status = 404;
              }
        } else {
            error.status = 400;
        }

        return NextResponse.json({message: error.message}, {status: error.status})
    }
}

// delete workout from list of workouts
async function deleteWorkout(workout) {

}


module.exports = {getWorkouts, getWorkoutsByCreatorId, postWorkout, deleteWorkout, checkUserExists}