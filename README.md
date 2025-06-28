# Quote Vote

A text-first civic engagement platform for creating posts, voting on specific text passages, and thoughtful discussions. Built with React/GraphQL frontend and Node.js backend, featuring targeted voting, quotes, social features, and moderation tools for transparent public dialogue.

## 🚀 Features

### Core Functionality
- **Text-First Posts**: Create and share detailed text-based content
- **Targeted Voting**: Vote on specific text passages within posts
- **Quote System**: Highlight and discuss specific quotes from content
- **Social Features**: User profiles, following, and activity feeds
- **Moderation Tools**: Admin panel for content moderation and user management
- **Real-time Chat**: Live discussions and reactions on posts
- **Search & Discovery**: Advanced search functionality with filters

### User Experience
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Material-UI Components**: Modern, accessible interface components
- **Real-time Updates**: Live notifications and activity updates
- **Dark/Light Themes**: Customizable user interface themes
- **Accessibility**: WCAG compliant design with screen reader support

## 🛠 Tech Stack

### Frontend (`client/`)
- **React 17** - UI framework
- **GraphQL** - Data querying with Apollo Client
- **Material-UI** - Component library
- **Redux Toolkit** - State management
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **Cypress** - E2E testing
- **Storybook** - Component documentation

### Backend (`server/`)
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Apollo Server** - GraphQL server
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication
- **WebSocket** - Real-time subscriptions
- **Stripe** - Payment processing
- **Nodemailer** - Email functionality

## 📁 Project Structure

```
monorepo/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── views/          # Page components
│   │   ├── layouts/        # Layout components
│   │   ├── graphql/        # GraphQL queries/mutations
│   │   ├── store/          # Redux store configuration
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   ├── cypress/            # E2E tests
│   └── docs/               # Documentation
├── server/                 # Node.js backend application
│   ├── app/
│   │   ├── data/           # GraphQL schema and resolvers
│   │   ├── types/          # Type definitions
│   │   └── utils/          # Utility functions
│   ├── tests/              # Unit and integration tests
│   └── dev_db/             # Development database setup
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 8
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd monorepo
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   npm install --legacy-peer-deps
   
   # Install backend dependencies
   cd ../server
   npm install --legacy-peer-deps
   ```

3. **Environment Setup**
   
   Create `.env` files in both `client/` and `server/` directories:
   
   **Server Environment Variables:**
   ```env
   NODE_ENV=development
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/quote-vote
   JWT_SECRET=your-jwt-secret
   STRIPE_SECRET_KEY=your-stripe-secret
   EMAIL_SERVICE=your-email-service
   EMAIL_USER=your-email-user
   EMAIL_PASS=your-email-password
   ```
   
   **Client Environment Variables:**
   ```env
   REACT_APP_API_URL=http://localhost:4000/graphql
   REACT_APP_WS_URL=ws://localhost:4000/graphql
   ```

4. **Start Development Database**
   ```bash
   cd server
   npm run dev-db-start
   ```

5. **Run the Application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev-mac  # For macOS/Linux
   # or
   npm run dev      # For Windows
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - GraphQL Playground: http://localhost:4000/graphql

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm run test              # Run unit tests
npm run test:coverage     # Run tests with coverage
npm run cypress:open      # Run E2E tests
```

### Backend Testing
```bash
cd server
npm run test              # Run unit tests
npm run unittest          # Run integration tests
```

## 📚 Documentation

- **Storybook**: Component documentation and testing
  ```bash
  cd client
  npm run storybook
  ```
- **API Documentation**: Available at GraphQL Playground
- **Component Documentation**: See `client/docs/` for detailed guides

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd server
npm run build
npm start  # Uses PM2 for production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Oliver Molina** - Lead Developer (olivermolina10@gmail.com)

## 🐛 Issues

If you encounter any issues, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🔗 Links

- **Repository**: [GitHub Repository]
- **Live Demo**: [Demo URL]
- **Documentation**: [Documentation URL]

---

Built with ❤️ for transparent civic engagement and thoughtful public dialogue.
