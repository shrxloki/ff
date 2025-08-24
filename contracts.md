# Festive Funds - Backend Integration Contracts

## Overview
This document outlines the API contracts and integration requirements for converting the frontend-only Festive Funds application into a full-stack platform.

## Current Mock Data Implementation
The frontend currently uses mock data from `/app/frontend/src/data/mockData.js`:
- **mockCampaigns**: Festival fundraising campaigns with details like title, organizer, raised amount, goals, donors, etc.
- **mockUsers**: User profiles with donation history and favorite festivals
- **mockFestivals**: Festival categories with active campaigns and total raised amounts
- **mockStats**: Platform-wide statistics

## API Contracts Needed

### 1. Authentication APIs
```
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET /api/auth/me - Get current user profile
PUT /api/auth/profile - Update user profile
```

### 2. Campaign Management APIs
```
GET /api/campaigns - List all campaigns (with filters)
GET /api/campaigns/:id - Get single campaign details
POST /api/campaigns - Create new campaign (authenticated)
PUT /api/campaigns/:id - Update campaign (owner only)
DELETE /api/campaigns/:id - Delete campaign (owner only)
POST /api/campaigns/:id/updates - Add campaign update
GET /api/campaigns/:id/updates - Get campaign updates
```

### 3. Donation APIs
```
POST /api/donations - Create donation
GET /api/donations/user/:userId - Get user donation history
POST /api/donations/:id/nft - Generate NFT for donation
GET /api/campaigns/:id/donors - Get campaign donors list
```

### 4. Festival Management APIs
```
GET /api/festivals - List all festivals
GET /api/festivals/:id - Get festival details
GET /api/festivals/:id/campaigns - Get campaigns by festival
```

### 5. Statistics APIs
```
GET /api/stats/platform - Platform-wide statistics
GET /api/stats/campaigns/:id - Individual campaign statistics
```

## Database Models Required

### 1. User Model
```
- id: ObjectId
- name: String
- email: String (unique)
- password: String (hashed)
- profileImage: String (URL)
- favoriteFestivals: [String]
- totalDonated: Number
- createdAt: Date
- updatedAt: Date
```

### 2. Campaign Model
```
- id: ObjectId
- title: String
- organizer: String
- description: String
- image: String (URL)
- raised: Number
- goal: Number
- donors: Number
- daysLeft: Number (calculated)
- category: String (festival name)
- location: String
- userId: ObjectId (creator)
- status: String (active, completed, cancelled)
- createdAt: Date
- updatedAt: Date
- updates: [{
    title: String,
    content: String,
    date: Date
  }]
```

### 3. Donation Model
```
- id: ObjectId
- campaignId: ObjectId
- userId: ObjectId
- amount: Number
- nftBadge: String
- paymentId: String
- status: String (pending, completed, failed)
- createdAt: Date
```

### 4. Festival Model
```
- id: ObjectId
- name: String
- description: String
- date: Date
- color: String
- activeCampaigns: Number (calculated)
- totalRaised: Number (calculated)
```

## Frontend Integration Changes

### 1. Replace Mock Data Usage
- Remove dependencies on `/app/frontend/src/data/mockData.js`
- Replace with API calls using axios
- Implement proper error handling and loading states

### 2. Add State Management
- Implement user authentication state
- Add campaign creation/editing forms
- Handle real-time donation updates

### 3. Update Components
- **Header.jsx**: Add real authentication logic
- **HeroSection.jsx**: Fetch real festival data for floating categories  
- **StatsSection.jsx**: Fetch real platform statistics
- **TrendingCampaigns.jsx**: Fetch real campaign data with proper pagination
- **HomePage.jsx**: Add loading states and error handling

## Authentication Flow
1. User registration/login with email and password
2. JWT token management for API authentication
3. Protected routes for campaign creation and management
4. User profile management with donation history

## Payment Integration (Future Enhancement)
- UPI payment gateway integration
- Net banking support
- Credit/Debit card processing
- Payment confirmation and receipt generation

## NFT Generation System
- Festival-themed NFT badge creation
- Donation tier-based NFT variants (bronze, silver, gold)
- IPFS storage for NFT metadata
- Wallet integration for NFT delivery

## Error Handling Strategy
- Consistent error response format
- Frontend error boundary implementation
- User-friendly error messages
- Logging for debugging

## Security Considerations
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- CORS configuration
- File upload security for campaign images

## Performance Optimizations
- Campaign data caching
- Image optimization and CDN usage
- Pagination for large datasets
- Database indexing strategy

## Testing Requirements
- Unit tests for all API endpoints
- Integration tests for payment flows
- Frontend component testing
- End-to-end testing for critical user journeys

## Deployment Considerations
- Environment variable management
- Database migration scripts
- File storage configuration
- Monitoring and analytics setup

This contract will serve as the roadmap for backend implementation while maintaining the existing frontend design and user experience.