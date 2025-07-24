import { PrismaClient } from '../lib/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (existingAdmin) {
    console.log('👤 Admin user already exists, skipping creation');
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash('admin123@', 12);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      name: 'System Administrator',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Admin user created successfully!');
  console.log('📧 Email: admin@example.com');
  console.log('🔑 Password: admin123@');
  console.log('👤 User ID:', adminUser.id);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
