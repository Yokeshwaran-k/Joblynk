import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

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
        address: true,
        district: true,
        state: true,
        isAvailable: true,
      },
    });

    if (!worker) {
      return NextResponse.json(
        {
          success: false,
          message: "Worker not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: worker,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );

  }
}