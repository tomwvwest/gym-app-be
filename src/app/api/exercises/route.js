const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

async function GET() {
  const exercises = await prisma.exercises.findMany({});
  return NextResponse.json(exercises, { status: 200 });
}

async function POST(newExercise) {
  if (
    !newExercise.name ||
    !newExercise.type ||
    !newExercise.muscle ||
    !newExercise.equipment ||
    !newExercise.difficulty ||
    !newExercise.instructions
  ) {
    return NextResponse.json("Missing Data", { status: 400 });
  }
  const exercise = await prisma.exercises.create({
    data: newExercise
  })
  return NextResponse.json(exercise, {status: 201})
}

const getExercises = GET

const postExercise = POST

module.exports = { getExercises, postExercise };
