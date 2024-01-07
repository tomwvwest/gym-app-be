const { handlePsqlErrors } = require('./errors');

async function checkWorkoutExists(id) {
    try {
        if (typeof id !== 'number') {
            throw Error('Bad request.')
        }

        const workout = await prisma.workouts.findUniqueOrThrow({
            where:{
                workout_id: id
            }
        })

        console.log('workout:', workout)
    } catch (error) {
        return handlePsqlErrors(error, "Workout")
    }
}

module.exports = { checkWorkoutExists }