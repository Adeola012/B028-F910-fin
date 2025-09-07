# FormGenie AI

An AI-powered form builder that creates intelligent, continuously optimizing forms using behavioral analytics and machine learning.

## 🚀 Features

- **AI-Powered Form Creation**: Generate complete forms from simple text prompts
- **FormGenie Optimizer™**: Continuous post-deployment optimization based on user behavior
- **Advanced Analytics**: Deep insights into user behavior and form performance
- **Multi-modal Input**: Create forms from text, voice, PDFs, or screenshots
- **Accessibility Compliance**: Built-in WCAG 2.1 compliance checking
- **Real-time Translation**: 50+ languages supported with context preservation
- **Integration Ecosystem**: 100+ native integrations plus Zapier/Make support

## 🏗️ Architecture

```
formgenie-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Utility functions
│   └── package.json
├── server/               # Node.js/Express backend
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   └── database/        # Database schemas
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Groq AI API key
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd formgenie-ai
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client && npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   # Server Configuration
   NODE_ENV=development
   PORT=3001
   FRONTEND_URL=http://localhost:3000

   # Supabase Configuration
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

   # Groq AI Configuration
   GROQ_API_KEY=your-groq-api-key

   # Clerk Authentication
   CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   ```

5. **Set up database**
   - Run the schema in `server/database/schema.sql` in your Supabase SQL editor
   - Enable Row Level Security (RLS) policies as defined in the schema

6. **Start development servers**
   ```bash
   # Start backend (from root directory)
   npm run dev

   # Start frontend (in another terminal)
   cd client && npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 📊 Database Schema

The application uses Supabase with the following key tables:

- **forms**: Stores form definitions and metadata
- **form_submissions**: Tracks form submissions
- **form_views**: Records form views for analytics
- **form_interactions**: Detailed interaction tracking
- **form_optimizations**: Stores optimization history
- **form_analytics**: Aggregated analytics data
- **ab_tests**: A/B testing configurations

## 🔧 API Endpoints

### Forms
- `POST /api/forms` - Create new form
- `GET /api/forms/user/:userId` - Get user's forms
- `GET /api/forms/:formId` - Get specific form
- `PUT /api/forms/:formId` - Update form
- `DELETE /api/forms/:formId` - Delete form
- `POST /api/forms/generate` - AI form generation

### Analytics
- `POST /api/analytics/track/view` - Track form view
- `POST /api/analytics/track/submission` - Track submission
- `GET /api/analytics/:formId` - Get analytics for form

### Optimization
- `GET /api/optimization/recommendations/:formId` - Get AI recommendations
- `POST /api/optimization/apply/:formId` - Apply optimization
- `GET /api/optimization/history/:formId` - Get optimization history

### AI Services
- `POST /api/ai/generate-form` - Generate form from prompt
- `POST /api/ai/field-suggestions` - Get field improvement suggestions

## 🎯 Development Roadmap

### Phase 1: Core Platform (Q3 2025)
- [x] Basic form builder UI
- [x] AI form generation
- [x] Analytics tracking
- [ ] FormGenie Optimizer™ beta
- [ ] Essential integrations

### Phase 2: Advanced AI Features (Q4 2025)
- [ ] Full FormGenie Optimizer™ release
- [ ] Enhanced behavioral analytics
- [ ] A/B testing capabilities
- [ ] Advanced conditional logic

### Phase 3: Enterprise Capabilities (Q1 2026)
- [ ] Team collaboration features
- [ ] Advanced security and compliance
- [ ] Custom branding options
- [ ] Enterprise API and SDK

## 🧪 Testing

Run tests with:
```bash
# Server tests
npm test

# Client tests
cd client && npm test
```

## 🚀 Deployment

### Production Build
```bash
# Build client
cd client && npm run build

# Start production server
NODE_ENV=production npm start
```

### Environment Variables for Production
- Update all API keys and URLs for production
- Enable production mode in Clerk
- Set up production Supabase project
- Configure domain URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@formgenie.ai or join our Discord community.