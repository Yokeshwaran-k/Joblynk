import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Required field validation
    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.password ||
      !body.role
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Check duplicate email or phone
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: body.email },
          { phone: body.phone },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email or phone already exists",
        },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    // Create user
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        password: hashedPassword,
        role: body.role,
      },
    });

    return NextResponse.json({
  success: true,
  message: "User registered successfully",
  data: {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  },
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