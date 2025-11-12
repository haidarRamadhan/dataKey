import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { houseSize } = body;

    if (typeof houseSize !== "number") {
      return NextResponse.json(
        { error: "houseSize must be a number" },
        { status: 400 }
      );
    }

    // Send houseSize to Flask API
    const resp = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ houseSize }),
    });
    const result = await resp.json();
    console.log("Flask response:", result);

    if (!result.price) {
      return NextResponse.json(
        { error: "FLask did not return price" },
        { status: 500 }
      );
    }

    const price = result.price;

    // Save to database
    const saved = await prisma.rumah.create({
      data: { houseSize, price },
    });

    return NextResponse.json({
      message: "Predcition saved succesfully",
      data: saved,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
