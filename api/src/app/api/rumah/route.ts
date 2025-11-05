import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";



// Create variable prisma client 
const prisma = new PrismaClient();

// arrow function
export const GET = async () => {
    const data = await prisma.rumah.findMany({
        orderBy: {
            id: 'desc'
        }
    });
    return NextResponse.json({ 
        barang: data
     });
}