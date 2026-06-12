import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/jwt";

export async function GET(request: NextRequest) {

  try {

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          message: "Token missing",
        },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    return NextResponse.json({
      success: true,
      message: "Protected API",
      user: decoded,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: "Invalid Token",
      },
      { status: 401 }
    );

  }

}