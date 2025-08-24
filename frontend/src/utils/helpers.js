// Utility functions for Festive Funds

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num) => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + ' Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + ' L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const getProgressPercentage = (raised, goal) => {
  return Math.min((raised / goal) * 100, 100);
};

export const calculateDaysLeft = (targetDate) => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = Math.abs(target - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getFestivalTheme = (festivalName) => {
  const themes = {
    'Diwali': {
      primary: '#FFA500',
      secondary: '#FF8C00',
      gradient: 'from-orange-400 to-orange-600'
    },
    'Holi': {
      primary: '#FF1493',
      secondary: '#FF69B4',
      gradient: 'from-pink-400 to-pink-600'
    },
    'Eid': {
      primary: '#32CD32',
      secondary: '#98FB98',
      gradient: 'from-green-400 to-green-600'
    },
    'Durga Puja': {
      primary: '#FF6347',
      secondary: '#FFA07A',
      gradient: 'from-red-400 to-red-600'
    },
    'Ganesh Chaturthi': {
      primary: '#FFD700',
      secondary: '#FFA500',
      gradient: 'from-yellow-400 to-orange-500'
    },
    'Navratri': {
      primary: '#9370DB',
      secondary: '#BA55D3',
      gradient: 'from-purple-400 to-purple-600'
    }
  };
  
  return themes[festivalName] || themes['Diwali'];
};

export const generateNFTBadgeName = (festivalName, donationAmount) => {
  const festival = festivalName.toLowerCase().replace(' ', '-');
  const year = new Date().getFullYear();
  
  let tier = 'bronze';
  if (donationAmount >= 10000) tier = 'gold';
  else if (donationAmount >= 5000) tier = 'silver';
  
  return `${festival}-${year}-${tier}`;
};

export const validateDonationAmount = (amount, min = 100, max = 1000000) => {
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) {
    return { valid: false, message: 'Please enter a valid amount' };
  }
  
  if (numAmount < min) {
    return { valid: false, message: `Minimum donation is ₹${min}` };
  }
  
  if (numAmount > max) {
    return { valid: false, message: `Maximum donation is ₹${formatNumber(max)}` };
  }
  
  return { valid: true, message: '' };
};

export const generateShareText = (campaign) => {
  return `Help support "${campaign.title}" organized by ${campaign.organizer}. Join me in making this festival celebration possible! 🎉 #FestiveFunds #${campaign.category}`;
};

export const generateShareUrl = (campaignId) => {
  return `${window.location.origin}/campaign/${campaignId}`;
};