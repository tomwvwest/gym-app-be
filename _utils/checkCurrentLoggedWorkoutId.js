const { prisma } = require("../lib/prisma");
const { NextResponse } = require("next/server");


async function getCurrentId() {
  const currentId = await prisma.loggedWorkouts.findFirst({
    orderBy: { session_id: "desc" },
    select: {
      session_id: true,
    },
  });
  return NextResponse.json(currentId, { status: 200 });
}

module.exports = { getCurrentId }