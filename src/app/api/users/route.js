const { NextResponse } = require("next/server");
const { prisma } = require("../../../../lib/prisma");

const passwordHash = require('password-hash')

async function GET() {
    const users = await prisma.Users.findMany()
    return NextResponse.json(users, {status: 200})
}

async function POST (req, res) {
    const body = await req.json()
    if(!isNaN(parseInt(body.username))){
        return NextResponse.json('Username must be a string', {status: 400})
    }
    const hash = passwordHash.generate(body.password)
    const currentUser = await prisma.users.findUnique({
        where: {
            username: body.username
        }
    })
    console.log(currentUser)
    if(currentUser){
        return NextResponse.json('Username Taken', {status: 400})
    }
    const newUser = await prisma.users.create({
        data: {
            username: body.username,
            password: hash
        }
    })
    return NextResponse.json({newUser}, {status: 201})
}

async function fetchUserByUsername (username) {
    if(!isNaN(parseInt(username))){
        return NextResponse.json('Incorrect Data Type', {status: 400}) 
    }

    const users = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    if(!users){
        return NextResponse.json('No users found', {status: 404})
    }

    return NextResponse.json(users, {status: 200})
}

async function patchUserByName (username, patchData){
    if(!username || (!patchData.password && !patchData.image_url)){
        return NextResponse.json('Missing Data', {status: 400})
    }

    if(!isNaN(parseInt(username)) || !isNaN(parseInt(patchData.password)) || !isNaN(parseInt(patchData.image_url))){
        return NextResponse.json('Incorrect Data Type', {status: 400})
    }

    const userCheck = await prisma.users.findUnique({
        where: {
            username: username
        }
    })

    if(!userCheck){
        return NextResponse.json('No users found', {status: 404})
    }

    const users = await prisma.users.update({
        where: {
            username: username
        },
        data: {
            password: patchData.password  !== undefined ? patchData.password : userCheck.password,
            image_url: patchData.image_url !== undefined ? patchData.image_url : userCheck.image_url
        }
    })

    return NextResponse.json(users, {status: 200})
}

module.exports = {GET, POST, fetchUserByUsername, patchUserByName}