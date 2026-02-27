import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const name = searchParams.get('name');

    const clients = await database.getClients();

    let filteredClients: any[] = clients;
    if (email) {
      filteredClients = filteredClients.filter(client =>
        client.email && client.email.toLowerCase().includes(email.toLowerCase())
      );
    }
    if (name) {
      filteredClients = filteredClients.filter(client =>
        (client.firstName && client.firstName.toLowerCase().includes(name.toLowerCase())) ||
        (client.lastName && client.lastName.toLowerCase().includes(name.toLowerCase()))
      );
    }

    return NextResponse.json({
      success: true,
      clients: filteredClients,
      count: filteredClients.length
    });
  } catch (error) {
    console.error('Clients API GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch clients',
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
      firstName,
      lastName,
      email,
      phone,
      company,
      status = 'active',
      notes = ''
    } = body;

    // Validate required fields
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'First name and email are required' },
        { status: 400 }
      );
    }

    // Create client using database service
    const clientData = {
      firstName,
      lastName,
      email,
      phone,
      company,
      status,
      notes
    };

    const client = await database.createClient(clientData);

    return NextResponse.json({
      success: true,
      client,
      message: 'Client created successfully'
    });
  } catch (error) {
    console.error('Clients API POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create client',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
