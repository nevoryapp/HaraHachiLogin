# REST Express Application

## Overview

This is a full-stack web application built with Express.js and React that provides a member authentication system with a protected member area for the Japanese Method "Hara Hachi Bu" ebook. The application features a simple password-based login system (password: MJP-HHB1) with session management and a comprehensive dashboard interface where authenticated users can download 9 PDF modules including 5 chapters and 3 bonus materials about the Japanese eating philosophy.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but not yet implemented)
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state
- **Authentication**: Session-based authentication with express-session

## Key Components

### Frontend Architecture
- **React Router**: Uses Wouter for lightweight client-side routing
- **Component Library**: shadcn/ui components for consistent UI design
- **Styling**: Tailwind CSS with custom theme variables
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Custom fetch wrapper with credential support

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **Session Management**: In-memory session storage with express-session
- **Authentication**: Simple password-based authentication system
- **API Structure**: Organized route handlers with proper error responses

### Data Storage
- **Database**: Configured for PostgreSQL with Drizzle ORM
- **Session Storage**: Currently using in-memory storage (MemStorage class)
- **Schema**: Shared TypeScript schemas using Zod for validation

### Authentication & Authorization
- **Login System**: Simple password verification against hardcoded password (MJP-HHB1)
- **Session Management**: Server-side sessions with configurable expiration
- **Protected Routes**: Client-side route protection with authentication checks
- **Session Persistence**: HTTP-only cookies for session management

### Content Management
- **PDF Module System**: 9 downloadable PDF files organized as chapters and bonus content
- **File Structure**: 
  - Introduction: Complete method overview
  - Chapter 1-5: Core content about conscious eating and Hara Hachi Bu
  - Bonus 1: 7-day Japanese Detox Guide
  - Bonus 2: 30 Traditional Okinawa Recipes
  - Bonus 3: 5 Zen Meditations for Food Anxiety
- **Download System**: Direct PDF downloads with descriptive filenames

## Data Flow

1. **User Authentication**:
   - User submits login credentials via React form
   - Frontend validates input using Zod schemas
   - Backend verifies password and creates session
   - Session ID stored in HTTP-only cookie
   - User redirected to member area on success

2. **Protected Access**:
   - Member area checks authentication status on load
   - Backend validates session from cookie
   - Unauthorized users redirected to login page
   - Authenticated users see dashboard content

3. **API Communication**:
   - All API requests include credentials automatically
   - TanStack Query manages server state and caching
   - Custom error handling for network and authentication errors

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **State Management**: TanStack Query for server state
- **Form Management**: React Hook Form with Zod resolvers

### Backend Dependencies
- **Database**: Neon Database serverless PostgreSQL
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Storage**: connect-pg-simple for PostgreSQL session store
- **Validation**: Zod for runtime type checking

### Development Tools
- **Build Tool**: Vite for fast development and building
- **TypeScript**: Full TypeScript support across the stack
- **Linting**: ESBuild for production bundling

## Deployment Strategy

The application is configured for deployment with:

- **Development**: Vite dev server with Express API proxy
- **Production**: Static build served by Express with API routes
- **Build Process**: Frontend builds to `dist/public`, backend bundles to `dist`
- **Environment**: Supports both development and production configurations
- **Database**: Ready for PostgreSQL connection via DATABASE_URL environment variable

### Build Commands
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build both frontend and backend for production
- `npm run start`: Start production server
- `npm run db:push`: Push database schema changes

The application is designed to be easily deployable to platforms like Replit, with proper environment variable configuration for database connections and session secrets.