const { handlePsqlErrors } = require('./errors');

async function checkExerciseExists(id) {
    try {
        if (typeof id !== 'number') {
            throw Error('Bad request.')
        }

        await prisma.exercises.findUniqueOrThrow({
            where:{
                exercise_id: id
            }
        })

    } catch (error) {
        return handlePsqlErrors(error, 'Exercise')
    }
}

module.exports = { checkExerciseExists }