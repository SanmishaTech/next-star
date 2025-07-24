import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Checking database state...');
    
    const users = await prisma.user.findMany();
    
    console.log(`📊 Found ${users.length} users in the database:`);
    users.forEach(user => {
      console.log(`  ID: ${user.id} (${typeof user.id})`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Created: ${user.createdAt}`);
      console.log('  ---');
    });
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
