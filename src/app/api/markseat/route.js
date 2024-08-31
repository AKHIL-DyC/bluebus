import { PrismaClient } from "@prisma/client";

export async function POST(req) {
    const prisma = new PrismaClient();
    const { id, seatno,uid } = await req.json();

    if (!id ||!uid|| !seatno || !Array.isArray(seatno)) {
        return new Response(JSON.stringify({ error: "Missing or invalid required fields" }), { status: 400 });
    }

    try {
        // Build an object that will hold the seat fields to update
        const updateData = seatno.reduce((acc, seat) => {
            const seatField = `s${seat}`;
            acc[seatField] = true; // Set the selected seat to true
            return acc;
        }, {});

        const updatedBus = await prisma.routebus.updateMany({
            where: {
                id: id
            },
            data: updateData
        });
        const updateReservation=await prisma.resevation.create({
            data:{
                uid:uid,
                rbid:id,
                setno:seatno
            }
        })
        return new Response(JSON.stringify({ success: true, data: updatedBus }), { status: 200 });
    } catch (error) {
        console.error("Error updating seats:", error);
        return new Response(JSON.stringify({ error: "Failed to update seats" }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
