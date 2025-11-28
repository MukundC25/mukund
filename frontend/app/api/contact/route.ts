import { NextRequest, NextResponse } from 'next/server';

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

// In-memory storage for demo (replace with MongoDB in production)
const messages: (ContactMessage & { createdAt: string; id: string })[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: ContactMessage = await request.json();

    // Validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Store message (in production, save to MongoDB)
    const newMessage = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    
    messages.push(newMessage);

    // In production, you would:
    // 1. Save to MongoDB using Mongoose
    // 2. Send email notification using nodemailer
    // Example:
    // await ContactMessage.create(newMessage);
    // await sendEmailNotification(newMessage);

    console.log('New contact message:', newMessage);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return stored messages (protected in production)
  return NextResponse.json({ messages, count: messages.length });
}
