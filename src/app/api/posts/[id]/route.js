const { NextResponse } = require("next/server");
const { prisma } = require("../../../../../lib/prisma");

async function fetchPostById(id){
    if(isNaN(parseInt(id))){
        return NextResponse.json('Incorrect Data Type', {status: 400})
    }
    const posts = await prisma.posts.findUnique({
        where: {
            post_id: id
        }
    })
    if(!posts){
        return NextResponse.json('No posts found', {status: 400})
    }
    return NextResponse.json(posts, {status: 200})
}

module.exports = {fetchPostById}