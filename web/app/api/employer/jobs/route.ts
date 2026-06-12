import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/jwt";

export async function POST(request: NextRequest) {
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

    if (decoded.role !== "EMPLOYER") {
      return NextResponse.json(
        {
          success: false,
          message: "Only employers can create jobs"
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.skill ||
      !body.budget
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title: body.title,
        description: body.description,
        skill: body.skill,
        budget: body.budget,
        address: body.address,
        pincode: body.pincode,
        district: body.district,
        state: body.state,
        workDate: new Date(body.workDate),
        employerId: decoded.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Job created successfully",
      data: job,
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

    const decoded = verifyToken(token) as {
      id: number;
      role: string;
    };

    if (decoded.role !== "EMPLOYER") {
      return NextResponse.json(
        {
          success: false,
          message: "Only employers can access this",
        },
        { status: 403 }
      );
    }

    const jobs = await prisma.job.findMany({
      where: {
        employerId: decoded.id,
      },
      include: {
        worker: {
          select: {
            id: true,
            name: true,
            phone: true,
            skill: true,
            experience: true,
            dailyWage: true,
          },
        },
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
        message: "Something went wrong",
      },
      { status: 500 }
    );

  }
}