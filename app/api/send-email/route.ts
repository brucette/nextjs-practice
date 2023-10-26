WelcomeTemplate
import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import { Resend } from 'resend'

// create a new instance of a resend object and pass it your key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    await resend.emails.send({
        from: '....',   // has to be from a domain you own, cannot be from a free one like google
        to: 'tina@fishface.se',
        subject: '...',
        react: <WelcomeTemplate name="Mosh" />
    })
    return NextResponse.json({})
} 