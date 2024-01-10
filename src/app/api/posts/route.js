const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

async function GET() {
    const posts = await prisma.posts.findMany({})
    return NextResponse.json(posts, {status: 200})
}

async function POST(req, res) {
    const body = await req.json()

    if(!body.session_name || !body.description || !body.session_id || !body.user_id){
        return NextResponse.json('Missing Data', {status: 400})
    }
    if(!isNaN(parseInt(body.session_name)) || !isNaN(parseInt(body.description)) || isNaN(parseInt(body.session_id)) || isNaN(parseInt(body.user_id))){
        return NextResponse.json('Incorrect Data Type', {status: 400})
    }
    const user = await prisma.users.findUnique({
        where:{
            user_id: body.user_id
        }
    })
    if(!user){
        return NextResponse.json('User not found', {status: 404})
    }
    const posts = await prisma.posts.create({
        data: body
    })
    return NextResponse.json(posts, {status: 201})
}

module.exports = {GET, POST}
