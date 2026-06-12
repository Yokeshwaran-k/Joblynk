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
      role: string;
    };

    if (decoded.role !== "WORKER") {
      return NextResponse.json(
        {
          success: false,
          message: "Only workers can accept jobs",
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const existingJob = await prisma.job.findUnique({
    where: {
        id: body.jobId,
    },
    });

    if (existingJob?.status !== "OPEN") {
    return NextResponse.json(
        {
        success: false,
        message: "Job is no longer available",
        },
        { status: 400 }
    );
    }

    const job = await prisma.job.update({
      where: {
        id: body.jobId,
      },
      data: {
        workerId: decoded.id,
        status: "ACCEPTED",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Job accepted successfully",
      data: job,
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