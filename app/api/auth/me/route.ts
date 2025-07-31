import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requirePermission, getUserPermissions } from '@/lib/auth';
import { PERMISSIONS } from '@/lib/config/permissions';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication and require dashboard view permission
    const authResult = await requirePermission(request, PERMISSIONS.DASHBOARD_VIEW);
    
    if ('error' in authResult) {
      return authResult.error;
    }

    const { user: authUser } = authResult;

    // Get full user data from database
    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profilePhoto: true,
        emailVerified: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User not found' 
        },
        { status: 404 }
      );
    }

    if (!user.status) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Account is deactivated' 
        },
        { status: 403 }
      );
    }

    // Additional check: ensure status is explicitly true
    if (user.status !== true) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Account status is invalid' 
        },
        { status: 403 }
      );
    }

    // Get user permissions
    const permissions = getUserPermissions(authUser);

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        permissions, // Include user permissions in the response
      },
    });

  } catch (error) {
    console.error('Get user error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
