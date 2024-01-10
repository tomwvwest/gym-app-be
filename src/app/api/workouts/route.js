const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");
const { handlePsqlErrors } = require('../../../../_utils/errors');
const { headers } = require('next/headers');

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
async function POST(request) {
    const body = await request.json();
    const { workout_name, creator_id } = body;
    console.log(typeof workout_name, typeof creator_id)

    try {
        console.log('Entrance')
        if (!workout_name.length || !creator_id) {
            console.log('h1llo')
            return NextResponse.json('Missing Data', {status: 400})
        }
        console.log('No missing Data')

        const workout = await prisma.workouts.findMany({
            where: {
                AND: [
                    {
                      workout_name: workout_name, // Replace workout_name with the value you're searching for
                    },
                    {
                      creator_id: creator_id, // Replace creator_id with the value you're searching for
                    },
                  ],
            }
        })

        console.log('after check before condition')

        if(workout.length){
            return NextResponse.json('Already Added To Workouts', {status: 400})
        }

        console.log('No Previos Data')

        const newWorkout = await prisma.workouts.create({
            data: {
                workout_name,
                creator_id
            }
        })

        console.log(newWorkout)

        return NextResponse.json({newWorkout}, {status: 201})

    } catch (error) {
        console.log(error)
        return handlePsqlErrors(error)
    }
}

// delete workout from list of workouts
async function DELETE(request) {
    const workout_id = Number(headers().get('workout_id'));

    try {
        const check = await checkWorkoutExists(workout_id)
        if (check) { return check }

        const deletedWorkout = await prisma.workouts.delete({
            where: {
                workout_id: workout_id
            }
        })

        return new Response(null, {status: 204})

    } catch (error) {
        return handlePsqlErrors(error)
    }
}


module.exports = { GET, getWorkoutsByCreatorId, POST, DELETE, checkUserExists }