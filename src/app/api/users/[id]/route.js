const { NextResponse } = require("next/server");
const { prisma } = require("../../../../../lib/prisma");

async function GET(req, {params}) {
  const id = Number(params.id);
  const users = await prisma.users.findUnique({
    where: {
      user_id: id,
    },
  });
  return NextResponse.json(users, { status: 200 });
}

module.exports = { GET };
