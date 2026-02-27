import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, mode = 'chat' } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // In production, this would call Gemini API
    // For now, return mock responses based on mode
    let response: string;
    
    switch (mode) {
      case 'think':
        response = `**Analysis Mode**\n\nAnalyzing: "${message}"\n\nKey insights:\n- This appears to be a strategic question\n- Consider the broader implications\n- Multiple factors at play\n\n**Recommendation:** Approach this systematically with data-driven decisions.`;
        break;
      case 'search':
        response = `**Search Results**\n\nFound 3 relevant items for "${message}":\n\n1. Project: Villa Azure - mentions similar concepts\n2. Client: Elena Rodriguez - related inquiry\n3. Document: Design guidelines - Section 4.2\n\nWould you like me to retrieve any of these?`;
        break;
      case 'maps':
        response = `**Location Intelligence**\n\nSearching for "${message}"...\n\n📍 Found: 2 supplier locations nearby\n📍 3 project sites in the area\n📍 Client concentration: High\n\n**Opportunity:** Consider targeted marketing in this region.`;
        break;
      default:
        response = `I understand you're asking about "${message}". As your StudioOS assistant, I can help with:\n\n• Project management queries\n• Client information lookup\n• Design resource recommendations\n• Analytics and insights\n\nHow would you like me to assist further?`;
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      response,
      mode,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
