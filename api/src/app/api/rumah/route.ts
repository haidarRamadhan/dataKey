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
    { Harga_rumah: data },
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

// create POST service (save data)
export const POST = async (request: Request) => {
    // read data from reqeust 
    // then change into json
    const data = await request.json();

    // check if data has saved to avoid redudancty data
    const checkData = await prisma.rumah.findFirst({
      where: {
        houseSize: data.houseSize,
      },
      select: {
        houseSize: true
      }
    });

    // if data code is exist 
    if (checkData) {
      return NextResponse.json({
        message: "Ukuran rumah sudah ada",
        success: false
      })
    }

    // if data code doesn't exist
    else {
      // save houseSize as request
      await prisma.rumah.create({
        data: {
          houseSize: data.houseSize,
        }
      });
      return NextResponse.json({
        message: "Data ukuran rumah berhasil disimpan",
        success: true
      })
      }
}