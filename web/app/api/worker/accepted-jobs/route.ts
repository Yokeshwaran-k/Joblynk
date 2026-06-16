import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/jwt";

export async function GET(request: NextRequest){
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
    try{
        const jobs = await prisma.job.findMany({
            where: {
                workerId: decoded.id,
                status: "ACCEPTED",
            },
             include: {
                employer: {
                select: {
                    name: true,
                    phone: true,
                },
                },
            },
        })

        return NextResponse.json({
            success: true,
            total: jobs.length,
            data: jobs,
            });
    }catch(error){
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

