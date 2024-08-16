import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
export async function POST(req:NextRequest){
    const prisma=new PrismaClient();
    const body= await req.json();
    try{
       const response=await prisma.blueBusOwner.create({
            data:{
                name:body.name,
                email:body.email,
                password:body.password,
                bname:body.bname,  
                regno:body.reg,
                phone:body.phno,
                type:body.type  
            }
        })
        return NextResponse.json({msg:"bus created successfully"})
    }
    catch(e){
        return NextResponse.json({msg:"error occured"+e})
    }
    
    
    
    
}