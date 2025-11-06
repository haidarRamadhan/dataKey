import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";



// Create variable prisma client 
const prisma = new PrismaClient();

// arrow function
export const GET = async () => {
  const data = await prisma.rumah.findMany({
    orderBy: { id: "desc" },
  });

  return NextResponse.json(
    { barang: data },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    }
  );
};

// handle preflight
export const OPTIONS = async () =>
    NextResponse.json({}, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
    });
