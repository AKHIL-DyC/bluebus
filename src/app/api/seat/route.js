import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req) {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(req.url);
    const bid = searchParams.get('bid');
    const rid = searchParams.get('rid');
    const date = searchParams.get('date');

    try {
        const routeBus = await prisma.routebus.findFirst({
            where: {
                bid:parseInt(bid),
                rid:parseInt(rid),
                date
            },
            select: {
                s1: true, s2: true, s3: true, s4: true, s5: true, s6: true, s7: true, s8: true, s9: true, s10: true,
                s11: true, s12: true, s13: true, s14: true, s15: true, s16: true, s17: true, s18: true, s19: true, s20: true,
                s21: true, s22: true, s23: true, s24: true, s25: true, s26: true, s27: true, s28: true, s29: true, s30: true,
                s31: true, s32: true, s33: true, s34: true, s35: true, s36: true, s37: true, s38: true, s39: true, s40: true
            }
        });

        if (!routeBus) {
            return NextResponse.json({ message: 'No data found' });
        }

        // Map the seats into an array
        const seatArray = [
            routeBus.s1, routeBus.s2, routeBus.s3, routeBus.s4, routeBus.s5, routeBus.s6, routeBus.s7, routeBus.s8, routeBus.s9, routeBus.s10,
            routeBus.s11, routeBus.s12, routeBus.s13, routeBus.s14, routeBus.s15, routeBus.s16, routeBus.s17, routeBus.s18, routeBus.s19, routeBus.s20,
            routeBus.s21, routeBus.s22, routeBus.s23, routeBus.s24, routeBus.s25, routeBus.s26, routeBus.s27, routeBus.s28, routeBus.s29, routeBus.s30,
            routeBus.s31, routeBus.s32, routeBus.s33, routeBus.s34, routeBus.s35, routeBus.s36, routeBus.s37, routeBus.s38, routeBus.s39, routeBus.s40
        ];

        return NextResponse.json({ seats: seatArray });
    } catch (error) {
        console.error('Error fetching seat data:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    } finally {
        await prisma.$disconnect(); // Ensure Prisma disconnects from the database
    }
}
