const { NextResponse } = require("next/server");
const { prisma } = require("../../../../../lib/prisma");

async function DELETE (comment_id) {
    if(isNaN(parseInt(comment_id))){
        return NextResponse.json('Incorrect Data Type', {status: 400})
    }
    const commentCheck = await prisma.comments.findUnique({
        where: {
            comment_id: comment_id
        }
    })
    if(!commentCheck){
        return NextResponse.json('No comments found', {status: 404})
    }

    const comment = await prisma.comments.delete({
        where:{
            comment_id: comment_id
        }
    })
    return NextResponse.json({}, {status: 200})
}

const deleteCommentById = DELETE

module.exports = {deleteCommentById, DELETE}