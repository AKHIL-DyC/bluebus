import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient(); // Instantiate PrismaClient only once

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Fix typo and use 'url' property
  const uid = searchParams.get('uid'); // Get the 'uid' from query params

  try {
    if (!uid) {
      return NextResponse.json({ msg: "uid not found" });
    }

    // Find reservations based on 'uid'
    const reservations = await prisma.resevation.findMany({
      where: {
        uid: parseInt(uid),
      },
      select: {
        rbid: true,
        setno:true
      },
    });

    if (!reservations.length) {
      return NextResponse.json({ msg: "No reservations found" });
    }

    // Assuming you need to work with the first reservation's rbid
    const rbid = reservations[0].rbid;

    // Find routebus details based on 'rbid'
    const data = await prisma.routebus.findFirst({
      where: {
        id: rbid,
      },
      select: {
        bid: true,
        rid: true,
        date: true,
      },
    });

    if (!data) {
      return NextResponse.json({ msg: "No routebus data found" });
    }

    return NextResponse.json({ data , reservations});
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ msg: "Some DB error" });
  }
}
