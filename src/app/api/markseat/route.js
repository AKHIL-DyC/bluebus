import { PrismaClient } from "@prisma/client";

export async function POST(req) {
    const prisma = new PrismaClient();
    const { bid, rid, date, seatno } = await req.json();

    if (!bid || !rid || !date || !seatno) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Dynamically create the seat field key, e.g., 's1', 's2', ..., 's40'
    const seatField = `s${seatno}`;

    try {
        const updatedBus = await prisma.routebus.updateMany({
            where: {
                bid: bid,
                rid: rid,
                date: date
            },
            data: {
                [seatField]: true // Set the selected seat to true
            }
        });

        return new Response(JSON.stringify({ success: true, data: updatedBus }), { status: 200 });
    } catch (error) {
        console.error("Error updating seat:", error);
        return new Response(JSON.stringify({ error: "Failed to update seat" }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
