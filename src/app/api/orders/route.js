import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export function GET(){
    const prisma=new PrismaClient();
    const {searcParams}=new URL(req.URL)
    const uid=searcParams.get('uid');
    try{
        if(!uid){
            return NextResponse.json({msg:"uid not found"});
        }
        else{
           const rbid= prisma.resevation.findMany({
                where:{
                    uid:uid
                },
                select:{
                    rbid:true
                }
            })
            const data=prisma.routebus.findFirst({
                where:{
                    id:rbid
                },
                select:{
                    bid:true,
                    rid:true,
                    date:true,
                }
            })
            return NextResponse.json({data})
        }
    }
    
    catch{
     return   NextResponse.json({msg:"some db error"})
    }
}