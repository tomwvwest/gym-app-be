const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

async function postComment (commentData){
    if(!commentData.user_id || !commentData.post_id || !commentData.body){
        return NextResponse.json('Missing Data', {status: 400})
    }
    if(isNaN(parseInt(commentData.user_id)) || isNaN(parseInt(commentData.post_id)) || !isNaN(parseInt(commentData.body))){
        return NextResponse.json('Incorrect Data Type', {status: 400})
    }
    const users = await prisma.users.findUnique({
        where: {
            user_id: commentData.user_id
        }
    })
    if(!users){
        return NextResponse.json('No users found', {status: 404})
    }
    const posts = await prisma.posts.findUnique({
        where: {
            post_id: commentData.post_id
        }
    })
    if(!posts){
        return NextResponse.json('No posts found', {status: 404})
    }
    const comments = await prisma.comments.create({
        data: commentData
    })
    return NextResponse.json(comments, {status: 201})
}

module.exports = {postComment}