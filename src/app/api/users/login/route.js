const { NextResponse } = require("next/server");
const { prisma } = require("../../../../../lib/prisma");

const passwordHash = require('password-hash')

async function POST (req, res){
    const body = await req.json()
    if(!body.password || !body.username){
        return NextResponse.json('Missing Data', {status: 400})
    }

    if(!isNaN(parseInt(body.password)) || !isNaN(parseInt(body.username))){
        return NextResponse.json('Incorrect Data Type', {status: 400})
    }

    const users = await prisma.users.findUnique({
        where: {
            username: body.username
        }
    })
    if(!users){
        return NextResponse.json('Incorrect Username', {status: 404})
    }

    if(!passwordHash.verify(body.password,users.password)){
        return NextResponse.json('Incorrect Password', {status: 404})
    }

    return NextResponse.json(users, {status: 200})
    
}
module.exports = {POST}