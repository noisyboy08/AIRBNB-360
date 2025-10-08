import { AirbnbListing } from '../types/listing';
import {
  EnrichedListing,
  HostPersonality,
  RiskScore,
  SustainabilityScore,
  AccessibilityIndex,
  TrustScore,
  PriceAnalysis,
  NeighborhoodVibe,
  HostGrowthPotential
} from '../types/enriched';

export const classifyHostPersonality = (houseRules: string): HostPersonality => {
  const rules = (houseRules || 'No rules given').toLowerCase();

  const keywords = {
    friendly: ['welcome', 'enjoy', 'relax', 'comfortable', 'happy', 'feel free', 'mi casa'],
    strict: ['no', 'prohibited', 'not allowed', 'forbidden', 'must', 'required', 'strictly'],
    family: ['family', 'children', 'kids', 'baby', 'child-friendly', 'playground', 'safe'],
    party: ['party', 'music', 'events', 'celebration', 'gathering', 'loud', 'nightlife'],
    minimalist: ['quiet', 'simple', 'minimal', 'clean', 'tidy', 'organized', 'basic'],
    professional: ['business', 'work', 'wifi', 'desk', 'professional', 'suitable for', 'workspace']
  };

  const scores: Record<string, number> = {};
  const foundKeywords: string[] = [];

  for (const [personality, words] of Object.entries(keywords)) {
    scores[personality] = 0;
    for (const word of words) {
      if (rules.includes(word)) {
        scores[personality]++;
        if (!foundKeywords.includes(word)) {
          foundKeywords.push(word);
        }
      }
    }
  }

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) {
    return {
      tag: 'Unknown',
      confidence: 0,
      keywords: []
    };
  }

  const dominant = Object.entries(scores).find(([, score]) => score === maxScore)?.[0] as any;
  const confidence = Math.min(maxScore / 5, 1);

  return {
    tag: dominant.charAt(0).toUpperCase() + dominant.slice(1),
    confidence: confidence,
    keywords: foundKeywords.slice(0, 5)
  };
};

export const calculateRiskScore = (
  listing: AirbnbListing,
  neighborhoodAvgPrice: number
): RiskScore => {
  const factors: string[] = [];
  let riskPoints = 0;

  if (!listing.host_identity_verified || listing.host_identity_verified.toLowerCase() === 'unconfirmed') {
    riskPoints += 30;
    factors.push('Host not verified');
  }

  if (listing['availability 365'] === 365 && listing['number of reviews'] === 0) {
    riskPoints += 40;
    factors.push('Always available with no reviews');
  }

  const priceDiff = Math.abs(listing.price - neighborhoodAvgPrice) / neighborhoodAvgPrice;
  if (priceDiff > 1.5) {
    riskPoints += 20;
    factors.push(listing.price > neighborhoodAvgPrice ? 'Price significantly above market' : 'Price suspiciously low');
  }

  if (listing['number of reviews'] === 0 && listing['availability 365'] > 300) {
    riskPoints += 15;
    factors.push('New listing with high availability');
  }

  if (listing['minimum nights'] > 30) {
    riskPoints += 10;
    factors.push('Unusual minimum stay requirement');
  }

  const level = riskPoints > 50 ? 'High' : riskPoints > 25 ? 'Medium' : 'Low';

  return {
    level,
    score: Math.min(riskPoints, 100),
    factors: factors.length > 0 ? factors : ['No risk factors detected']
  };
};

export const calculateSustainabilityScore = (listing: AirbnbListing): SustainabilityScore => {
  const currentYear = new Date().getFullYear();
  const buildingAge = listing['Construction year'] > 0 ? currentYear - listing['Construction year'] : 50;

  const ageScore = buildingAge < 10 ? 90 : buildingAge < 30 ? 70 : buildingAge < 50 ? 50 : 30;

  const turnoverRate = listing['number of reviews'] > 0
    ? (listing['reviews per month'] * 12) / listing['availability 365']
    : 0;
  const turnoverScore = turnoverRate > 0.5 ? 40 : turnoverRate > 0.3 ? 60 : turnoverRate > 0.1 ? 80 : 70;

  const longStayScore = listing['minimum nights'] >= 7 ? 90 : listing['minimum nights'] >= 3 ? 70 : 50;

  const totalScore = (ageScore * 0.4 + turnoverScore * 0.3 + longStayScore * 0.3);

  const rating: 'Excellent' | 'Good' | 'Fair' | 'Poor' =
    totalScore >= 80 ? 'Excellent' :
    totalScore >= 65 ? 'Good' :
    totalScore >= 50 ? 'Fair' : 'Poor';

  return {
    score: Math.round(totalScore),
    rating,
    ecoFriendly: totalScore >= 75,
    factors: {
      buildingAge: Math.round(ageScore),
      energyEfficiency: Math.round((100 - buildingAge) * 0.8),
      turnover: Math.round(turnoverScore)
    }
  };
};

export const calculateAccessibilityIndex = (listing: AirbnbListing): AccessibilityIndex => {
  const text = `${listing.NAME} ${listing.house_rules}`.toLowerCase();

  const features = {
    wheelchair: /wheelchair|accessible|disability|ramp/i.test(text),
    elevator: /elevator|lift/i.test(text),
    pets: /pet|dog|cat|animal/i.test(text),
    kids: /kid|child|family|baby/i.test(text),
    parking: /parking|garage|car/i.test(text)
  };

  const score = (Object.values(features).filter(Boolean).length / 5) * 100;

  const rating: 'Excellent' | 'Good' | 'Limited' | 'Poor' =
    score >= 80 ? 'Excellent' :
    score >= 60 ? 'Good' :
    score >= 40 ? 'Limited' : 'Poor';

  return {
    score: Math.round(score),
    features,
    rating
  };
};

export const calculateTrustScore = (listing: AirbnbListing): TrustScore => {
  const verificationScore = listing.host_identity_verified?.toLowerCase() === 'verified' ? 100 : 40;

  const reviewScore = Math.min((listing['number of reviews'] / 50) * 100, 100);

  const responseScore = listing['reviews per month'] > 1 ? 90 : listing['reviews per month'] > 0.5 ? 75 : 50;

  const cancellationScore =
    listing.cancellation_policy?.toLowerCase() === 'flexible' ? 100 :
    listing.cancellation_policy?.toLowerCase() === 'moderate' ? 85 :
    listing.cancellation_policy?.toLowerCase() === 'strict' ? 60 : 50;

  const overall = (
    verificationScore * 0.3 +
    reviewScore * 0.3 +
    responseScore * 0.2 +
    cancellationScore * 0.2
  );

  return {
    overall: Math.round(overall),
    verification: verificationScore,
    reviews: Math.round(reviewScore),
    responseRate: responseScore,
    cancellationPolicy: cancellationScore
  };
};

export const analyzePricing = (
  listing: AirbnbListing,
  neighborhoodAvgPrice: number
): PriceAnalysis => {
  const priceDiff = (listing.price - neighborhoodAvgPrice) / neighborhoodAvgPrice;
  const fairness = 100 - Math.min(Math.abs(priceDiff) * 100, 100);

  const vsNeighborhood = priceDiff * 100;

  const trend: 'rising' | 'stable' | 'falling' =
    listing['reviews per month'] > 2 && listing['availability 365'] < 180 ? 'rising' :
    listing['availability 365'] > 300 ? 'falling' : 'stable';

  const seasonalFactor = trend === 'rising' ? 1.1 : trend === 'falling' ? 0.95 : 1.0;

  return {
    fairness: Math.round(fairness),
    vsNeighborhood: Math.round(vsNeighborhood),
    trend,
    forecast: {
      nextMonth: Math.round(listing.price * seasonalFactor),
      nextQuarter: Math.round(listing.price * seasonalFactor * 1.05)
    }
  };
};

export const calculateNeighborhoodVibe = (listings: AirbnbListing[]): NeighborhoodVibe => {
  const avgPrice = listings.reduce((sum, l) => sum + l.price, 0) / listings.length;

  const budget = avgPrice < 100 ? 80 : avgPrice < 200 ? 50 : 20;
  const luxury = avgPrice > 300 ? 90 : avgPrice > 200 ? 60 : 30;

  const familyListings = listings.filter(l =>
    /family|kid|child/i.test(l.house_rules || '') || l['minimum nights'] >= 3
  ).length;
  const family = (familyListings / listings.length) * 100;

  const partyListings = listings.filter(l =>
    /party|event|nightlife/i.test(l.house_rules || '') || l['minimum nights'] === 1
  ).length;
  const party = (partyListings / listings.length) * 100;

  const overall =
    budget > 60 ? 'Budget-Friendly' :
    luxury > 70 ? 'Luxury' :
    family > 50 ? 'Family-Oriented' :
    party > 40 ? 'Entertainment District' : 'Balanced';

  return {
    budget: Math.round(budget),
    luxury: Math.round(luxury),
    family: Math.round(family),
    party: Math.round(party),
    overall
  };
};

export const calculateHostGrowthPotential = (listing: AirbnbListing): HostGrowthPotential => {
  const reviewsPerMonth = listing['reviews per month'];
  const totalReviews = listing['number of reviews'];
  const isVerified = listing.host_identity_verified?.toLowerCase() === 'verified';
  const availability = listing['availability 365'];

  const factors: string[] = [];
  let score = 50;

  if (reviewsPerMonth > 2) {
    score += 20;
    factors.push('High review frequency');
  }

  if (isVerified) {
    score += 15;
    factors.push('Verified host');
  }

  if (totalReviews > 50 && reviewsPerMonth > 1) {
    score += 15;
    factors.push('Strong review momentum');
  }

  if (availability > 0 && availability < 300) {
    score += 10;
    factors.push('Good availability balance');
  }

  if (listing.cancellation_policy?.toLowerCase() === 'flexible') {
    score += 10;
    factors.push('Guest-friendly policies');
  }

  const isRisingStar = reviewsPerMonth > 2 && totalReviews < 50;
  const superHostProbability = Math.min(score, 95);

  const badge: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Rising Star' =
    isRisingStar ? 'Rising Star' :
    score >= 85 ? 'Platinum' :
    score >= 70 ? 'Gold' :
    score >= 55 ? 'Silver' : 'Bronze';

  return {
    score: Math.min(score, 100),
    isRisingStar,
    superHostProbability,
    growthFactors: factors.length > 0 ? factors : ['New host'],
    badge
  };
};

export const enrichListing = (
  listing: AirbnbListing,
  neighborhoodAvgPrice: number
): EnrichedListing => {
  const cleanedRules = listing.house_rules || 'No rules given';

  return {
    ...listing,
    hostPersonality: classifyHostPersonality(cleanedRules),
    riskScore: calculateRiskScore(listing, neighborhoodAvgPrice),
    sustainabilityScore: calculateSustainabilityScore(listing),
    accessibilityIndex: calculateAccessibilityIndex(listing),
    trustScore: calculateTrustScore(listing),
    priceAnalysis: analyzePricing(listing, neighborhoodAvgPrice),
    hostGrowth: calculateHostGrowthPotential(listing),
    cleanedRules,
    parsedLastReview: listing['last review'] ? new Date(listing['last review']) : undefined
  };
};
