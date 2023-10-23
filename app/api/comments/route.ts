import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createCommentSchema = z.object({
    description: z.string().min(1, 'Description is required').max(255),
    comment: z.string().min(1, 'Description is comment')
})

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