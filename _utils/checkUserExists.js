const { handlePsqlErrors } = require('./errors');

async function checkUserExists(id) {
    try {
        if (typeof id !== 'number') {
            throw Error('Bad request.')
        }

        const user = await prisma.users.findUniqueOrThrow({
            where:{
                user_id: id
            }
        })

    } catch (error) {
        return handlePsqlErrors(error)
    }
}

module.exports = { checkUserExists }