import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req) {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(req.url);
    const rid = searchParams.get('rid');
    const date = searchParams.get('date');

    if (!rid) {
        return NextResponse.json({ msg: "Route not found" });
    } else {
        try {
            const res = await prisma.routebus.findMany({
                where: {
                    rid: parseInt(rid),
                    date: date
                },
                select: {
                    id:true,
                    bid: true,
                    arrivaltime: true,
                    deptrtime: true,
                    remaining: true,
                    owner: { // Assuming you have a relation named `blueBusOwner`
                        select: {
                            bname: true,
                            regno: true
                        }
                    }
                }
            });

            return NextResponse.json({ data: res });
        } catch (error) {
            console.error("Error fetching bus routes:", error);
            return NextResponse.json({ msg: "Error fetching bus routes" }, { status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    }
}
