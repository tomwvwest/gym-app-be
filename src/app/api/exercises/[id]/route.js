const { NextResponse } = require("next/server");
const { prisma } = require("../../../../../lib/prisma");


async function GET(request, { params }) {
  const id = Number(params.id);
  if (isNaN(parseInt(id))) {
    return NextResponse.json("Incorrect Data Type", { status: 400 });
  }
  const exercises = await prisma.exercises.findUnique({
    where: {
      exercise_id: id,
    },
  });
  if (!exercises) {
    return NextResponse.json("No exercises found", { status: 400 });
  }
  return NextResponse.json(exercises, { status: 200 });
}

const getExerciseById = GET

module.exports = { getExerciseById, GET };
