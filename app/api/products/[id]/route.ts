import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
    params: {id: number}
}

export function GET(request: NextRequest, { params: { id } }: Props) {
    if (id > 10) return NextResponse.json({error: 'product not found'}, {status: 404});

    return NextResponse.json({id: 1, name: 'milk', price: 20})
}


export async function PATCH(
    request: NextRequest,
    {params: { id } }: Props) {
        const body = await request.json()
        const validation = schema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(
                validation.error.errors, 
                {status: 400})
        }

        if (id > 10) {
            return NextResponse.json(
                {error: 'product not found'}, 
                {status: 404})
        }

        return NextResponse.json(
            {id: id, name: body.name, price: body.price},
            {status: 200})
}

export function DELETE(request: NextRequest, { params: { id } }: Props ) {
    if (id > 10) {
        return NextResponse.json({ error: 'Product not found'}, {status: 404})
    }
    return NextResponse.json({})
}