const { NextResponse } = require("next/server");
const { prisma } = require("../../../../../lib/prisma");
const { handlePsqlErrors } = require("../../../../../_utils/errors");

async function GET({params}) {
  const id = Number(params.id);
  if (isNaN(parseInt(id))) {
    return NextResponse.json("Incorrect Data Type", { status: 400 });
  }
  const sessions = await prisma.loggedWorkouts.findMany({
    where: {
      session_id: id,
    },
  });
  if (!sessions) {
    return NextResponse.json("No sessions found", { status: 400 });
  }
  return NextResponse.json(sessions, { status: 200 })
}

async function DELETE({params}) {
    const id = Number(params.id);
    if (isNaN(parseInt(id))) {
      return NextResponse.json("Incorrect Data Type", { status: 400 });
    }
    const session = await prisma.loggedWorkouts.findMany({
      where: {
        session_id: id,
      },
    });
  
    if (!session) {
      return NextResponse.json("No session found", { status: 404 });
    }
    const deletedSession = await prisma.loggedWorkouts.deleteMany({
      where: {
        session_id: id,
      },
    });
    return NextResponse.json({}, { status: 204 });
  }


module.exports = { GET, DELETE };