import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return NextResponse.json({ msg: "Missing 'from' or 'to' parameters" }, { status: 400 });
    }

    const rid = await prisma.blueBusRoute.findFirst({
      where: {
        from,
        to,
      },
    });

    if (!rid) {
      return NextResponse.json({ msg: "No route found" }, { status: 404 });
    }

    return NextResponse.json(rid);
  } catch (e) {
    return NextResponse.json({ msg: "Some error occurred: " + e }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
