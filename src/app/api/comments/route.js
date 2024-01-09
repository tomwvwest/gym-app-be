const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

async function POST (req, res){
    const body = await req.json()
    if(!body.user_id || !body.post_id || !body.body){
        return NextResponse.json('Missing Data', {status: 400})
    }
    if(isNaN(parseInt(body.user_id)) || isNaN(parseInt(body.post_id)) || !isNaN(parseInt(body.body))){
        return NextResponse.json('Incorrect Data Type', {status: 400})
    }
    const users = await prisma.users.findUnique({
        where: {
            user_id: body.user_id
        }
    })
    if(!users){
        return NextResponse.json('No users found', {status: 404})
    }
    const posts = await prisma.posts.findUnique({
        where: {
            post_id: body.post_id
        }
    })
    if(!posts){
        return NextResponse.json('No posts found', {status: 404})
    }
    const comments = await prisma.comments.create({
        data: body
    })
    return NextResponse.json(comments, {status: 201})
}


module.exports = {POST}
