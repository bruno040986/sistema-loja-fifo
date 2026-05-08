import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const products = await prisma.product.findMany({
    include: { 
      category: true,
      batches: {
        orderBy: { expirationDate: 'asc' }
      }
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        categoryId: data.categoryId,
        active: data.active !== undefined ? data.active : true,
        batches: {
          create: data.batches.map((batch: any) => ({
            expirationDate: new Date(batch.expirationDate),
            price: parseFloat(batch.price),
            bulkPrice: batch.bulkPrice ? parseFloat(batch.bulkPrice) : null,
            bulkQuantity: batch.bulkQuantity ? parseInt(batch.bulkQuantity, 10) : null,
            stock: parseInt(batch.stock, 10),
            isFeatured: batch.isFeatured || false,
          }))
        }
      },
      include: {
        batches: true
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}
