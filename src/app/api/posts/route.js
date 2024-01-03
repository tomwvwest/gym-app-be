const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

async function fetchPosts() {
    const posts = await prisma.posts.findMany({})
    return NextResponse.json(posts, {status: 200})
}

module.exports = { fetchPosts }