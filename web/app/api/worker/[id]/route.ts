import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  try {

    const worker = await prisma.user.findUnique({
      where: {
        id: Number(id),
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
        address: true,
        isAvailable: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: worker,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );

  }
}