import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { 
        batches: {
          orderBy: { expirationDate: 'asc' }
        } 
      }
    });
    
    if (!product) return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar produto' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const data = await request.json();

    // First delete all existing batches to simplify update, then recreate them
    // This is a naive approach for MVP. In production, we'd update existing ones and create new ones.
    await prisma.productBatch.deleteMany({
      where: { productId: id }
    });

    const product = await prisma.product.update({
      where: { id },
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
            isFeatured: batch.isFeatured !== undefined ? batch.isFeatured : false,
          }))
        }
      },
      include: {
        batches: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;

    // Optional: instead of real delete, you can soft delete by updating active = false
    // But since the user wants "Ativo/Inativo" we use PUT for that. We'll leave DELETE functional just in case.
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 });
  }
}
