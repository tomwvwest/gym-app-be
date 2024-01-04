const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

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

module.exports = {postPost}
