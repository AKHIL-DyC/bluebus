import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req) {
  const prisma = new PrismaClient();
  
  try {
    // Extract 'bid' from the query parameters
    const { searchParams } = new URL(req.url);
    const bid = searchParams.get('bid');

    if (!bid) {
      return NextResponse.json({ msg: "bid is missing" }, { status: 400 });
    }

    // Fetch the data based on the 'bid'
    const data = await prisma.routebus.findMany({
      where: { bid: parseInt(bid) }, // Ensure that 'bid' is parsed as an integer
      select: {
        rid: true,
        date: true,
        arrivaltime: true,
        deptrtime: true,
        remaining: true,
      },
    });

    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ msg: "Some error occurred in DB: " + e.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
