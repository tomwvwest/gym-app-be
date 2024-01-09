const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");
const { handlePsqlErrors } = require("../../../../_utils/errors");
const { getCurrentId } = require("../../../../_utils/checkCurrentLoggedWorkoutId");

async function POST(newLoggedWorkout) {
  try {
  const loggedWorkout = await prisma.loggedWorkouts.create({
      data: newLoggedWorkout,
    });
    return NextResponse.json(loggedWorkout, { status: 201 });
  } catch (error) {
    console.log(error);
    return handlePsqlErrors(error);
  }
}

const postLoggedWorkout = POST

module.exports = { postLoggedWorkout, getCurrentId, POST };
