const { default: prisma } = require("../../../../lib/prisma")

console.log(prisma)
async function getUsers() {
    const users = await prisma.Users.findMany()

    // console.log(users)
    return users
}

getUsers()