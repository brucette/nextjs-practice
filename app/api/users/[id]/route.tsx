import { NextRequest, NextResponse } from "next/server";
import schema from '../schema'
import prisma from "@/prisma/client";

// interface Props {
//     params: {
//         id: number;
//     }
// }

export async function GET(
    request: NextRequest,  // string as comes from the url
    { params }: { params: { id: string } }) {
        const user = await prisma.user.findUnique({
            where: { id: params.id }
        })
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 })
        }
        return NextResponse.json(user)
}

export async function PUT(
    request: NextRequest, 
    { params }: { params: { id: string}}) {

        const body = await request.json()
        const validation = schema.safeParse(body)
        
        if (!validation.success) {
            return NextResponse.json(
                //{ error: 'Name is required'},
                validation.error.errors,
                { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id: params.id }
        })

        if (!user) {
            return NextResponse.json(
                {error: 'User not found'},
                {status: 404})
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: body.name,
                email: body.email
            }
        })

        return NextResponse.json(
            updatedUser,
            {status: 200})
    }

    export async function DELETE(
        request: NextRequest,
        { params }: {params: {id: string} }) {

            const user = await prisma.user.findUnique({
                where: { id: params.id }
            })

            if (!user) {
                return NextResponse.json(
                    { error: 'User not found'},
                    { status: 404})
            }

            await prisma.user.delete({
                where: { id: user.id }
            })

            return NextResponse.json({})
        }