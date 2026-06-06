import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const product = await prisma.product.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(`GET /api/products/[id] error:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
