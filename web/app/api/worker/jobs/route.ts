import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/jwt";

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
      role: string;
    };

    if (decoded.role !== "WORKER") {
      return NextResponse.json(
        {
          success: false,
          message: "Only workers can access jobs"
        },
        { status: 403 }
      );
    }

    const worker = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    const jobs = await prisma.job.findMany({
      where: {
        skill: worker?.skill || "",
        status: "OPEN",
      },
      select: {
        id: true,
        title: true,
        description: true,
        budget: true,
        district: true,
        state: true,
        workDate: true,
      },
    });

    return NextResponse.json({
      success: true,
      total: jobs.length,
      data: jobs,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong"
      },
      { status: 500 }
    );

  }
}