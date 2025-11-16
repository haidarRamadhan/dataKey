import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// create servive DELETE
export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  console.log(slug);

  const checkData = await prisma.rumah.findUnique({
    where: { id: Number(slug) },
  });

  if (!checkData) {
    return NextResponse.json(
      { message: "Data tidak ditemukan", success: false },
      { status: 404 }
    );
  }

  await prisma.rumah.delete({
    where: { id: Number(slug) },
  });

  return NextResponse.json({
    message: "Data berhasil dihapus",
    success: true,
  });
};

// buat service PUT (change data)
export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  const body = await request.json();

  const checkData = await prisma.rumah.findFirst({
    where: {
      id: Number(slug),
    },
  });

  // chekc if data is not exist
  if (!checkData) {
    return NextResponse.json(
      {
        message: "Gagal diubah, data tidak ada",
        success: false,
      },
      { status: 404 }
    );
  }
  // check if data is exist
  else
    await prisma.rumah.update({
      where: {
        id: Number(slug),
      },
      data: {
        houseSize: body.houseSize,
      },
    });
  return NextResponse.json({
    message: "Data berhasil diubah",
    success: true,
  });
};
