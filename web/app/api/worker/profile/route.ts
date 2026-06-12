import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/jwt";

export async function PUT(request: NextRequest) {
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

    const decoded = verifyToken(token) as {
      id: number;
    };

    const body = await request.json();

    const user = await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        skill: body.skill,
        dailyWage: body.dailyWage,
        experience: body.experience,
        address: body.address,
        pincode: body.pincode,
        district: body.district,
        state: body.state,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );

  }
}

export async function GET(request: NextRequest) {
  try {

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          message: "Token missing"
        },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token) as {
      id: number;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        skill: true,
        dailyWage: true,
        experience: true,
        address: true,
        pincode: true,
        district: true,
        state: true,
        isAvailable: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: user,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong"
      },
      { status: 500 }
    );

  }
}