#!/usr/bin/env node

/**
 * Test script for active user functionality
 * This script tests the login API with active/inactive users
 */

const { PrismaClient } = require('./lib/generated/prisma');

const prisma = new PrismaClient();

async function testActiveUserCheck() {
  const baseUrl = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing Active User Functionality...');
    
    // Step 1: Test login with active user
    console.log('\n1️⃣ Testing login with active user...');
    let loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123@',
      }),
    });

    let loginData = await loginResponse.json();
    
    if (loginResponse.ok && loginData.success) {
      console.log('✅ Active user login successful');
    } else {
      console.log('❌ Active user login failed:', loginData.error);
      return;
    }

    // Step 2: Deactivate the user
    console.log('\n2️⃣ Deactivating admin user...');
    await prisma.user.update({
      where: { email: 'admin@example.com' },
      data: { status: false },
    });
    console.log('✅ User deactivated');

    // Step 3: Test login with inactive user
    console.log('\n3️⃣ Testing login with inactive user...');
    loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123@',
      }),
    });

    loginData = await loginResponse.json();
    
    if (!loginResponse.ok && !loginData.success && loginData.error.includes('deactivated')) {
      console.log('✅ Inactive user properly rejected');
      console.log('📝 Error message:', loginData.error);
    } else {
      console.log('❌ Security issue: Inactive user was allowed to login!');
    }

    // Step 4: Reactivate the user
    console.log('\n4️⃣ Reactivating admin user...');
    await prisma.user.update({
      where: { email: 'admin@example.com' },
      data: { status: true },
    });
    console.log('✅ User reactivated');

    // Step 5: Test login with reactivated user
    console.log('\n5️⃣ Testing login with reactivated user...');
    loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123@',
      }),
    });

    loginData = await loginResponse.json();
    
    if (loginResponse.ok && loginData.success) {
      console.log('✅ Reactivated user login successful');
    } else {
      console.log('❌ Reactivated user login failed:', loginData.error);
    }

    console.log('\n🎉 Active user check tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Make sure the development server is running: npm run dev');
  } finally {
    // Ensure user is always reactivated
    try {
      await prisma.user.update({
        where: { email: 'admin@example.com' },
        data: { status: true },
      });
      console.log('🔄 Ensured admin user is active');
    } catch (error) {
      console.error('⚠️  Failed to reactivate user:', error.message);
    }
    
    await prisma.$disconnect();
  }
}

testActiveUserCheck();
