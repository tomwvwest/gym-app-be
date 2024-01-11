const { NextResponse } = require("next/server");
const { prisma } = require("../../../../../../lib/prisma");

async function GET(req, {params}) {
    const username = params.username;
    const users = await prisma.users.findUnique({
      where: {
        username: username
      },
    });
    return NextResponse.json(users, { status: 200 });
  }
  
  module.exports = { GET };