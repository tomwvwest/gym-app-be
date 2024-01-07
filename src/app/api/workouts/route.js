const { NextResponse } = require("next/server");
const { Prisma } = require("@prisma/client")
const { prisma } = require("../../../../lib/prisma");
const { handlePsqlErrors } = require('../../../../_utils/errors')

async function checkUserExists(id) {
    try {
        if (typeof id !== 'number') {
            throw Error('Bad request.')
        }

        const user = await prisma.users.findUniqueOrThrow({
            where:{
                user_id: id
            }
        })

    } catch (error) {
        return handlePsqlErrors(error)
    }
}

async function checkWorkoutExists(id) {
    try {
        if (typeof id !== 'number') {
            throw Error('Bad request.')
        }

        const user = await prisma.workouts.findUniqueOrThrow({
            where:{
                workout_id: id
            }
        })

    } catch (error) {
        return handlePsqlErrors(error, "Workout")
    }
}

// get list of all workouts
async function GET() {
    const workouts = await prisma.workouts.findMany()
    return NextResponse.json(workouts, {status: 200})
}

// get list of workouts created by current user
async function getWorkoutsByCreatorId(creator_id) {
    try {        
        const check = await checkUserExists(creator_id)
        if (check) { return check }

        const workouts = await prisma.workouts.findMany({
            where: {
                creator_id: creator_id
            }
        })

        return NextResponse.json(workouts, {status: 200})

    } catch (error) {
        return handlePsqlErrors(error)
    }
}

//post workout to current user's list of workouts
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
        return handlePsqlErrors(error)
    }
}

// delete workout from list of workouts
async function deleteWorkout(id) {
    try {
        const check = await checkWorkoutExists(id)
        if (check) { return check }

        const deletedWorkout = await prisma.workouts.delete({
            where: {
                workout_id: id
            }
        })

        return NextResponse.json(deletedWorkout, {status: 204})

    } catch (error) {
        console.log(error)
        return handlePsqlErrors(error)
    }
}


module.exports = { GET, getWorkoutsByCreatorId, postWorkout, deleteWorkout, checkUserExists }