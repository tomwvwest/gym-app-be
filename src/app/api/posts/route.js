const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

async function deletePostsById (post_id) {
    if(isNaN(parseInt(post_id))){
        return NextResponse.json('Incorrect Data Type', {status: 400})
    }
    const posts = await prisma.posts.findUnique({
        where: {
            post_id: post_id
        }
    })

    if(!posts){
        return NextResponse.json('No posts found', {status: 404})
    }
    const deletedPost = await prisma.posts.delete({
        where: {
            post_id: post_id
        }
    })
    return NextResponse.json({}, { status: 200 });
}

async function fetchPosts() {
    const posts = await prisma.posts.findMany({})
    return NextResponse.json(posts, {status: 200})
}

async function postPost(newPost) {
    if(!newPost.session_name || !newPost.description || !newPost.session_id || !newPost.user_id){
        return NextResponse.json('Missing Data', {status: 400})
    }
    if(!isNaN(parseInt(newPost.session_name)) || !isNaN(parseInt(newPost.description)) || isNaN(parseInt(newPost.session_id)) || isNaN(parseInt(newPost.user_id))){
        return NextResponse.json('Incorrect Data Type', {status: 400})
    }
    const user = await prisma.users.findUnique({
        where:{
            user_id: newPost.user_id
        }
    })
    if(!user){
        return NextResponse.json('User not found', {status: 404})
    }
    const posts = await prisma.posts.create({
        data: newPost
    })
    return NextResponse.json(posts, {status: 201})
}

module.exports = {postPost, fetchPosts, deletePostsById}
