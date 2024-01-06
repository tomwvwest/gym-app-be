const { Prisma } = require("@prisma/client");
const { NextResponse } = require("next/server");

async function handlePsqlErrors(error, psqlCol) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
            error.message = `${ psqlCol || 'User'} does not exist.`
            error.status = 404;
        }

        if (error.code === 'P2025') {
            error.message = `${ psqlCol || 'User'} does not exist.`
            error.status = 404;
        }

    } else if (!error.status) {
        error.status = 400;
        error.message = "Bad request."
    }
    return NextResponse.json({message: error.message}, {status: error.status})
}

module.exports = { handlePsqlErrors }