import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createCommentSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createCommentSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format, { status: 400 });

    const newComment = await prisma.comments.create({
        data: { description: body.description, comment: body.comment }
    });

    return NextResponse.json(newComment, { status: 201 });
}