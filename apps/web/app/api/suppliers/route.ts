import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');


    // Build query
    let query = supabase
      .from('suppliers')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,contact_name.ilike.%${search}%`
      );
    }

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: suppliers, error, count } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      suppliers: suppliers || [],
      count: suppliers?.length || 0,
      total: count || 0,
      fromCache: false
    });
  } catch (error) {
    console.error('Suppliers API GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch suppliers',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      category,
      contact_name,
      email,
      phone,
      address,
      rating,
      delivery_time,
      materials = []
    } = body;

    // Validate required fields
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }

    // Create supplier
    const { data: supplier, error } = await supabase
      .from('suppliers')
      .insert({
        name,
        category,
        contact_name,
        email,
        phone,
        address,
        rating,
        delivery_time,
        materials
      })
      .select()
      .single();

    if (error) {
      throw error;
    }


    return NextResponse.json({
      success: true,
      supplier,
      message: 'Supplier created successfully'
    });
  } catch (error) {
    console.error('Suppliers API POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create supplier',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Supplier ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { data: supplier, error } = await supabase
      .from('suppliers')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }


    return NextResponse.json({
      success: true,
      supplier,
      message: 'Supplier updated successfully'
    });
  } catch (error) {
    console.error('Suppliers API PUT error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update supplier',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Supplier ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }


    return NextResponse.json({
      success: true,
      message: 'Supplier deleted successfully'
    });
  } catch (error) {
    console.error('Suppliers API DELETE error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete supplier',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
