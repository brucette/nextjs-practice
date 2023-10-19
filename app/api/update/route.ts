import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const schema = z.object({
    email: z.string().email(),
    oldPassword: z.string().min(5),
    newPassword: z.string().min(5),
    confirmPassword: z.string().min(5)
})
.refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"], // path of error
    message: "Passwords don't match"
})
type schema = z.infer<typeof schema>;

export async function PATCH(request: NextRequest) {
    const body = await request.json();

    const validation = schema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error, { status: 400 })

    const user = await prisma.user.findUnique({
        where: { email: body.email}
    })

    const passwordsMatch = await bcrypt.compare(
        body.oldPassword, 
        user!.hashedPassword!
    );

    if (!user && !passwordsMatch) return null;

    const newHashedPassword = await bcrypt.hash(body.newPassword, 10);

    const updatedUserPassword = await prisma.user.update({
        where: {email: body.email},
        data: {
            hashedPassword: newHashedPassword
        }
    })

    return NextResponse.json({ status: 201 })
}

