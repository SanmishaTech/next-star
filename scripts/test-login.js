#!/usr/bin/env node

/**
 * Test script for login API
 * This script tests the login functionality with the admin user
 */

async function testLogin() {
  const baseUrl = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing Login API...');
    
    // Test login with admin credentials
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123@',
      }),
    });

    const loginData = await loginResponse.json();
    
    if (loginResponse.ok && loginData.success) {
      console.log('✅ Login successful!');
      console.log('📧 User:', loginData.user.email);
      console.log('👤 Role:', loginData.user.role);
      console.log('🔑 Token received:', loginData.token ? 'Yes' : 'No');
      
      // Test the /me endpoint with the token
      console.log('\n🧪 Testing /me endpoint...');
      
      const meResponse = await fetch(`${baseUrl}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
        },
      });

      const meData = await meResponse.json();
      
      if (meResponse.ok && meData.success) {
        console.log('✅ /me endpoint successful!');
        console.log('👤 User data:', meData.user);
      } else {
        console.log('❌ /me endpoint failed:', meData.error);
      }
      
    } else {
      console.log('❌ Login failed:', loginData.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Make sure the development server is running: npm run dev');
  }
}

// Test invalid credentials
async function testInvalidLogin() {
  const baseUrl = 'http://localhost:3000';
  
  try {
    console.log('\n🧪 Testing invalid credentials...');
    
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      }),
    });

    const loginData = await loginResponse.json();
    
    if (!loginResponse.ok && !loginData.success) {
      console.log('✅ Invalid credentials properly rejected');
      console.log('📝 Error message:', loginData.error);
    } else {
      console.log('❌ Security issue: Invalid credentials were accepted!');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

async function runTests() {
  await testLogin();
  await testInvalidLogin();
  console.log('\n🎉 Login API tests completed!');
}

runTests();
