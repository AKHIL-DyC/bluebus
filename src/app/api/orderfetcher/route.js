import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient(); // Instantiate PrismaClient only once

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Use 'url' property
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
        setno: true,
      },
    });

    if (!reservations.length) {
      return NextResponse.json({ msg: "No reservations found" });
    }

    // For each reservation, find routebus and route data
    const reservationDetails = await Promise.all(
      reservations.map(async (reservation) => {
        // Find routebus details based on 'rbid'
        const routebus = await prisma.routebus.findFirst({
          where: {
            id: reservation.rbid,
          },
          select: {
            bid: true,
            rid: true,
            date: true,
          },
        });

        // Find route details based on 'rid'
        const route = await prisma.blueBusRoute.findUnique({
          where: {
            rid: routebus.rid,
          },
          select: {
            from: true,
            to: true,
            distance: true,
          },
        });

        const busname=await prisma.blueBusOwner.findUnique({
          where:{
            bid:routebus.bid
          },
          select:{
            bname:true,
            phone:true
          }
        })
        return {
          ...reservation,
          routebus,
          route,
          busname
        };
      })
    );

    return NextResponse.json({ reservationDetails });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ msg: "Some DB error" });
  }
}
