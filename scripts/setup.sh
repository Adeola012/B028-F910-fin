#!/bin/bash

echo "🚀 Setting up FormGenie AI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing server dependencies..."
npm install

echo "📦 Installing client dependencies..."
cd client && npm install

echo "📝 Setting up environment variables..."
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Please create one based on .env.example"
fi

echo "✅ Setup complete! Here's what to do next:"
echo ""
echo "1. Set up your Supabase project and update .env with your credentials"
echo "2. Run the database schema in server/database/schema.sql"
echo "3. Set up Clerk authentication and update .env"
echo "4. Set up Groq AI API key in .env"
echo "5. Start development: npm run dev"
echo ""
echo "Happy coding! 🎉"