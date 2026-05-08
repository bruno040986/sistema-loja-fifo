import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Check if the admin user exists
    let admin = await prisma.user.findUnique({
      where: { email: 'admin@armazemfifo.com' },
    });

    if (!admin) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('senha_provisoria_123', 10);
      admin = await prisma.user.create({
        data: {
          name: 'Administrador',
          email: 'admin@armazemfifo.com',
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
      return NextResponse.json({ message: 'Database connected and Admin user created successfully!', admin });
    }

    return NextResponse.json({ message: 'Database connected. Admin user already exists.', admin });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Failed to connect to the database.' }, { status: 500 });
  }
}
