import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Since we're using stateless JWT tokens, logout is primarily handled on the client side
    // by removing the token from localStorage/sessionStorage
    // However, we can log the logout action or implement token blacklisting if needed
    
    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
