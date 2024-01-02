const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Controller
exports.fetchUsers = async (req, res) =>{
    const users = await getUsers()
    res.status(200).json({users})
}

//Model
const getUsers = async () => {
    const users = await prisma.users.findMany({})
    return users
}



