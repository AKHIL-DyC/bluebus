import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const prisma = new PrismaClient();
    
    try {
        // Parsing the JSON body from the request
        const body = await req.json();

        // Check if all required fields are provided
        if (!body.bid || !body.rid || !body.date || !body.arrivaltime || !body.deptrtime) {
            return NextResponse.json({ message: "Some fields are empty" }, { status: 400 });
        }

        // Create a new routebus entry in the database
        const result = await prisma.routebus.create({
            data: {
                bid: body.bid,
                rid: body.rid,
                date: body.date,
                arrivaltime:body.arrivaltime,
                deptrtime: body.deptrtime,
            },
        });

        // Return a success response
        return NextResponse.json({ message: "Created successfully" }, { status: 201 });
    } catch (error) {
        // Handle any database or other errors
        console.error(error);
        return NextResponse.json({ message: "Some error occurred in the database" }, { status: 500 });
    } finally {
        // Disconnect Prisma Client when done
        await prisma.$disconnect();
    }
}
