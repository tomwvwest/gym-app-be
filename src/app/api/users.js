const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");
const prisma = new PrismaClient();

//Controller
exports.fetchUsers = async (req, res) => {
  const users = await getUsers();
  res.status(200).json({ users });
};

exports.postUser = (req, res) => {
  const user = req.body;
  addUserToDb(user).then((nextResponse) => {
    console.log(nextResponse)
    res.status(201).json({ nextResponse });
  });
};

//Model
const getUsers = async () => {
  const users = await prisma.users.findMany({});
  return users;
};

const addUserToDb = async (user) => {
    // const formattedUser = await user.json();
    const {username, password} = user;
    const res = await prisma.users.create({data: {username, password}})
    return res
};
