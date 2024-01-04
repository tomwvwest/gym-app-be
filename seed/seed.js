const { PrismaClient } = require('@prisma/client');
const { addExercises, comments, exercises, loggedWorkouts, posts, users, workouts} = require('../data/index')

const prisma = new PrismaClient();


async function seedDatabase() {
  try {
    await prisma.$executeRaw`TRUNCATE TABLE "Comments" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Posts" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "LoggedWorkouts" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ExercisesInWorkouts"`;
    await prisma.$executeRaw`TRUNCATE TABLE "Exercises" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Workouts" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE`;
   
  
    // Insert the provided data into the database
    await prisma.exercises.createMany({
      data: exercises,
    });
    await prisma.users.createMany({data: users})
    await prisma.workouts.createMany({data:workouts})
    await prisma.ExercisesInWorkouts.createMany({data:addExercises})
    await prisma.LoggedWorkouts.createMany({data:loggedWorkouts}) 
    await prisma.Posts.createMany({data:posts})
    await prisma.Comments.createMany({data:comments})

    // console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = seedDatabase;
