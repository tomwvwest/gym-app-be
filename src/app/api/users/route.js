const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

async function getUsers() {
    const users = await prisma.Users.findMany()
    return NextResponse.json(users, {status: 200})
}

async function postUser(user) {
    const { username, password } = user;
    const newUser = await prisma.users.create({
        data: {
            username,
            password
        }
    })
    return NextResponse.json({newUser}, {status: 201})
}

module.exports = {getUsers, postUser}