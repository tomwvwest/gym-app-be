const { NextResponse } = require("next/server");
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

async function GET(req) {
  // console.log(req.url.searchParams)
  const sessions = await prisma.loggedWorkouts.findMany({});
  return NextResponse.json(sessions, { status: 200 })
}

module.exports = { POST, GET };
