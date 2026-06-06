import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!currentUser?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const [users, products, orders] = await Promise.all([
      prisma.user.findMany(),
      prisma.product.findMany(),
      prisma.order.findMany({ orderBy: { createdAt: 'desc' } })
    ]);

    return NextResponse.json({ users, products, orders });
  } catch (error) {
    console.error("GET /api/admin error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!currentUser?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();
    const { action, userId, payload } = body;

    if (action === "updateUser") {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: payload
      });
      return NextResponse.json(updatedUser);
    }

    if (action === "updateProduct") {
      const { productId, ...productData } = payload;
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: productData
      });
      return NextResponse.json(updatedProduct);
    }
    
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("PUT /api/admin error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!currentUser?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();
    const { action, payload } = body;

    if (action === "createProduct") {
      const newProduct = await prisma.product.create({
        data: {
          id: `prod-${Date.now()}`,
          name: payload.name,
          symbol: "UNK",
          atomicNumber: 999,
          description: payload.description,
          price: payload.price,
          imageUrl: payload.imageUrl,
          stock: payload.stock
        }
      });
      return NextResponse.json(newProduct);
    }
    
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("POST /api/admin error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!currentUser?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (productId) {
      await prisma.product.delete({ where: { id: productId } });
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("DELETE /api/admin error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
