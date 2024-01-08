const { NextResponse } = require("next/server");
const { prisma } = require("../../../../../../lib/prisma");

async function GET (req, {params}) {
  const id = Number(params.id);

  if(isNaN(parseInt(id))){
      return NextResponse.json('Incorrect Data Type', {status: 400})
  }
  const posts = await prisma.posts.findUnique({
      where: {
          post_id: id
      }
  })

  if(!posts){
      return NextResponse.json('No posts found', {status: 404})
  }
  const comments = await prisma.comments.findMany({
      where: {
          post_id: id
      }
  })
  return NextResponse.json(comments, {status: 200})
}

module.exports = {GET}