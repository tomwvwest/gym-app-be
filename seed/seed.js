const { PrismaClient } = require('@prisma/client');
const exercises = require('../data/exercises');
const users = require('../data/users');
const workouts = require('../data/workouts');
const addExercises = require('../data/addExercises');
const loggedWorkouts = require('../data/loggedWorkouts');
const posts = require('../data/posts');
const comments = require('../data/comments');

const prisma = new PrismaClient();


async function seedDatabase() {


  try {
    await prisma.Comments.deleteMany({});
    await prisma.$executeRaw`TRUNCATE TABLE "Comments" RESTART IDENTITY CASCADE`;
    await prisma.Posts.deleteMany({});
    await prisma.$executeRaw`TRUNCATE TABLE "Posts" RESTART IDENTITY CASCADE`;
    await prisma.LoggedWorkouts.deleteMany({});
    await prisma.$executeRaw`TRUNCATE TABLE "LoggedWorkouts" RESTART IDENTITY CASCADE`;
    await prisma.ExercisesInWorkouts.deleteMany({});
    await prisma.$executeRaw`TRUNCATE TABLE "ExercisesInWorkouts" RESTART IDENTITY CASCADE`;
    await prisma.exercises.deleteMany({});
    await prisma.$executeRaw`TRUNCATE TABLE "Exercises" RESTART IDENTITY CASCADE`;
    await prisma.users.deleteMany({});
    await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE`;
    await prisma.workouts.deleteMany({});
    await prisma.$executeRaw`TRUNCATE TABLE "Workouts" RESTART IDENTITY CASCADE`;
   
   

    
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


    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();

module.exports = seedDatabase
