const { NextResponse, NextRequest } = require("next/server");
const { prisma } = require("../../../../lib/prisma");
const { handlePsqlErrors } = require("../../../../_utils/errors");
// const { getCurrentId } = require("../../../../_utils/checkCurrentLoggedWorkoutId");

// async function getCurrentId() {
//   const currentId = await prisma.loggedWorkouts.findFirst({
//     orderBy: { completed_at: "desc" },
//     select: {
//       session_id: true,
//     },
//   });
//   return NextResponse.json(currentId, { status: 200 });
// }

async function POST(req, res) {
  const body = await req.json()
  try {
  const loggedWorkout = await prisma.loggedWorkouts.create({
      data: body,
    });
    return NextResponse.json(loggedWorkout, { status: 201 });
  } catch (error) {
    console.log(error);
    return handlePsqlErrors(error);
  }
}

async function GET(req) {
  const nextRequestObject = {
    [Symbol("state")]: {
      url: new URL(req.url),
    },
  };
  const stateSymbol = Object.getOwnPropertySymbols(nextRequestObject)[0];
  const searchParams = nextRequestObject[stateSymbol].url.searchParams;

  const userId = parseInt(searchParams.get("user_id"));
  const exerciseId = parseInt(searchParams.get("exercise_id"));

  if (userId && exerciseId) {
    console.log('yes')
    sessions = await prisma.loggedWorkouts.findMany({
      where: {
        user_id: userId,
        exercise_id: exerciseId,
      },
    });
  } else if (userId) {
    sessions = await prisma.loggedWorkouts.findMany({
      where: {
        user_id: userId,
      },
    });
  } else {
    sessions = await prisma.loggedWorkouts.findMany({});
  }
  return NextResponse.json(sessions, { status: 200 });
}

module.exports = { POST, GET };