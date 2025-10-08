import { AirbnbListing } from './listing';

export interface HostPersonality {
  tag: 'Friendly' | 'Strict' | 'Family' | 'Party' | 'Minimalist' | 'Professional' | 'Unknown';
  confidence: number;
  keywords: string[];
}

export interface RiskScore {
  level: 'Low' | 'Medium' | 'High';
  score: number;
  factors: string[];
}

export interface SustainabilityScore {
  score: number;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  ecoFriendly: boolean;
  factors: {
    buildingAge: number;
    energyEfficiency: number;
    turnover: number;
  };
}

export interface NeighborhoodVibe {
  budget: number;
  luxury: number;
  family: number;
  party: number;
  overall: string;
}

export interface AccessibilityIndex {
  score: number;
  features: {
    wheelchair: boolean;
    elevator: boolean;
    pets: boolean;
    kids: boolean;
    parking: boolean;
  };
  rating: 'Excellent' | 'Good' | 'Limited' | 'Poor';
}

export interface TrustScore {
  overall: number;
  verification: number;
  reviews: number;
  responseRate: number;
  cancellationPolicy: number;
}

export interface PriceAnalysis {
  fairness: number;
  vsNeighborhood: number;
  trend: 'rising' | 'stable' | 'falling';
  forecast?: {
    nextMonth: number;
    nextQuarter: number;
  };
}

export interface HostGrowthPotential {
  score: number;
  isRisingStar: boolean;
  superHostProbability: number;
  growthFactors: string[];
  badge: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Rising Star';
}

export interface EnrichedListing extends AirbnbListing {
  hostPersonality: HostPersonality;
  riskScore: RiskScore;
  sustainabilityScore: SustainabilityScore;
  accessibilityIndex: AccessibilityIndex;
  trustScore: TrustScore;
  priceAnalysis: PriceAnalysis;
  hostGrowth: HostGrowthPotential;
  neighborhoodVibe?: NeighborhoodVibe;
  cleanedRules: string;
  parsedLastReview?: Date;
}

export interface InvestmentIndex {
  score: number;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  factors: {
    growth: number;
    stability: number;
    demand: number;
  };
  recommendation: string;
}

export interface NeighborhoodStats {
  name: string;
  totalListings: number;
  averagePrice: number;
  averageRating: number;
  vibe: NeighborhoodVibe;
  riskLevel: 'Low' | 'Medium' | 'High';
  popularRoomTypes: Record<string, number>;
  center: {
    lat: number;
    lng: number;
  };
}
