import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "Joblynk Register API Working 🚀"
    });
}

export async function POST(request: Request) {

    const body = await request.json();

    return NextResponse.json({
        success: true,
        message: "Data received successfully",
        data: body
    });

}