const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

async function getExercises() {
  const exercises = await prisma.exercises.findMany({});
  return NextResponse.json(exercises, { status: 200 });
}

async function postExercise(newExercise) {
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

module.exports = { getExercises, postExercise };
