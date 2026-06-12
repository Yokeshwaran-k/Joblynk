import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {

  try {

    const searchParams = request.nextUrl.searchParams;

    const skill = searchParams.get("skill");
    const pincode = searchParams.get("pincode");

    const workers = await prisma.user.findMany({
      where: {
        role: "WORKER",
        skill: skill || undefined,
        pincode: pincode || undefined,
        isAvailable: true,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        skill: true,
        dailyWage: true,
        experience: true,
        district: true,
        state: true,
        pincode: true,
      },
    });

    return NextResponse.json({
      success: true,
      total: workers.length,
      data: workers,
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