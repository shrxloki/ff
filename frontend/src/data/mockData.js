// Mock data for Festive Funds platform
export const mockCampaigns = [
  {
    id: 1,
    title: "Community Diwali Celebration 2024",
    organizer: "Mumbai Heritage Society",
    description: "Help us organize a grand community Diwali celebration with traditional performances, food, and fireworks for 5000+ families in Mumbai. This year we aim to make it the biggest celebration yet with cultural programs, rangoli competitions, and community feast.",
    image: "https://images.unsplash.com/photo-1592843997881-cab3860b1067?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
    raised: 450000,
    goal: 600000,
    donors: 234,
    daysLeft: 12,
    category: "Diwali",
    location: "Mumbai, Maharashtra",
    createdAt: "2024-07-15",
    updates: [
      {
        id: 1,
        date: "2024-07-20",
        title: "Venue Confirmed!",
        content: "We've secured the Shivaji Park ground for our celebration. Thank you for your support!"
      }
    ]
  },
  {
    id: 2,
    title: "Holi Colors for Underprivileged Children",
    organizer: "Delhi Youth Foundation",
    description: "Bringing joy to 1000+ underprivileged children with safe, organic colors and traditional Holi treats. Our mission is to ensure every child experiences the joy of Holi regardless of their economic background.",
    image: "https://images.unsplash.com/photo-1721924275114-2c4d3e8a0fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
    raised: 125000,
    goal: 200000,
    donors: 87,
    daysLeft: 45,
    category: "Holi",
    location: "Delhi, India",
    createdAt: "2024-07-10",
    updates: []
  },
  {
    id: 3,
    title: "Eid Feast for Homeless Families",
    organizer: "Bangalore Care Foundation",
    description: "Organizing a special Eid feast and gift distribution for 500 homeless families in Bangalore. We believe everyone deserves to celebrate Eid with dignity and joy.",
    image: "https://images.unsplash.com/photo-1720593446840-b2a993a2c005?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
    raised: 89000,
    goal: 150000,
    donors: 156,
    daysLeft: 8,
    category: "Eid",
    location: "Bangalore, Karnataka",
    createdAt: "2024-07-18",
    updates: []
  },
  {
    id: 4,
    title: "Durga Puja Pandal Construction",
    organizer: "Kolkata Cultural Association",
    description: "Help us build a magnificent Durga Puja pandal that celebrates Bengali culture and traditions. This year's theme focuses on environmental sustainability.",
    image: "https://images.unsplash.com/photo-1590906424086-3dbc808fd54b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
    raised: 320000,
    goal: 500000,
    donors: 198,
    daysLeft: 25,
    category: "Durga Puja",
    location: "Kolkata, West Bengal",
    createdAt: "2024-07-05",
    updates: []
  }
];

export const mockUsers = [
  {
    id: 1,
    name: "Raj Patel",
    email: "raj@example.com",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwaW1hZ2V8ZW58MHx8fHwxNzU2MDMyNDEwfDA&ixlib=rb-4.1.0&q=80&w=100",
    favoritesFestivals: ["Diwali", "Holi"],
    totalDonated: 15000,
    donationHistory: [
      {
        campaignId: 1,
        amount: 5000,
        date: "2024-07-20",
        nftReceived: "diwali-2024-bronze"
      }
    ]
  }
];

export const mockFestivals = [
  {
    id: 1,
    name: "Diwali",
    description: "Festival of Lights",
    date: "2024-11-01",
    color: "#FFA500",
    activeCampaigns: 45,
    totalRaised: 2500000
  },
  {
    id: 2,
    name: "Holi",
    description: "Festival of Colors",
    date: "2025-03-14",
    color: "#FF1493",
    activeCampaigns: 23,
    totalRaised: 1200000
  },
  {
    id: 3,
    name: "Eid",
    description: "Festival of Breaking Fast",
    date: "2024-04-10",
    color: "#32CD32",
    activeCampaigns: 18,
    totalRaised: 890000
  },
  {
    id: 4,
    name: "Durga Puja",
    description: "Worship of Goddess Durga",
    date: "2024-10-15",
    color: "#FF6347",
    activeCampaigns: 31,
    totalRaised: 1800000
  }
];

export const mockStats = {
  totalRaised: 50000000,
  totalCampaigns: 1250,
  totalDonors: 25000,
  averageWeeklyRaising: 5000000
};