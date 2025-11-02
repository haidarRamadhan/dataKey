import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";



// Create variable prisma client 
//const prisma = new PrismaClient();

// arrow function
export const GET = async () => {
    return new NextResponse(JSON.stringify({
        message: "Test API",
        success: true
    }));
}