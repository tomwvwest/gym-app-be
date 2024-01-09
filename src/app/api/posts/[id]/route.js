const { NextResponse } = require("next/server");
const { prisma } = require("../../../../../lib/prisma");

async function GET(id) {
  if (isNaN(parseInt(id))) {
    return NextResponse.json("Incorrect Data Type", { status: 400 });
  }
  const posts = await prisma.posts.findUnique({
    where: {
      post_id: id,
    },
  });
  if (!posts) {
    return NextResponse.json("No posts found", { status: 400 });
  }
  return NextResponse.json(posts, { status: 200 });
}

async function DELETE(post_id) {
  if (isNaN(parseInt(post_id))) {
    return NextResponse.json("Incorrect Data Type", { status: 400 });
  }
  const posts = await prisma.posts.findUnique({
    where: {
      post_id: post_id,
    },
  });

  if (!posts) {
    return NextResponse.json("No posts found", { status: 404 });
  }
  const deletedPost = await prisma.posts.delete({
    where: {
      post_id: post_id,
    },
  });
  return NextResponse.json({}, { status: 200 });
}

async function PATCH(post_id) {
  if (isNaN(parseInt(post_id))) {
    return NextResponse.json("Incorrect Data Type", { status: 400 });
  }
  const posts = await prisma.posts.findUnique({
    where: {
      post_id: post_id,
    },
  });

  if (!posts) {
    return NextResponse.json("No posts found", { status: 404 });
  }
  const updatePost = await prisma.posts.update({
    where: {
      post_id: post_id,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
  return NextResponse.json({ posts: updatePost }, { status: 200 });
}

module.exports = {
  fetchPostById,
  deletePostsById,
  patchPostById,
  fetchCommentsByPostId,
  GET,
  DELETE,
  PATCH,
};
