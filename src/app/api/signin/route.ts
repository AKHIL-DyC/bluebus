import { NextRequest, NextResponse } from "next/server";
import{PrismaClient}from"@prisma/client"
import { Phone } from "lucide-react";
const client=new PrismaClient();
export async function POST(req:NextRequest) {
    const body=await req.json()
    try{
       const response =await client.blueBusUser.create({
            data:{
                name:body.name,
                gmail:body.email,
                password:body.password,
                phone:body.phno
            }
        })
    }
    catch (e){
        return NextResponse.json({message:"some error occured in db"+e})
    }
    return  NextResponse.json({message:"user created"})
}