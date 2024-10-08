import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const client=new PrismaClient()
export async function GET(req){
    const { searchParams } = new URL(req.url);
    const rid = searchParams.get('rid');
    try{
        const response=await client.blueBusRoute.findFirst(
            {
                where:{
                    rid:parseInt(rid)
                },
                select:{
                    from:true,
                    to:true
                }
            }
        )
        return NextResponse.json({response})
    }
    catch(e){
        return NextResponse.json({msg:"some db error"+e})
    }
}