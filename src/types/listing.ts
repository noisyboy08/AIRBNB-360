export interface AirbnbListing {
  id: number;
  NAME: string;
  'host id': number;
  host_identity_verified: string;
  'host name': string;
  'neighbourhood group': string;
  neighbourhood: string;
  lat: number;
  long: number;
  country: string;
  'country code': string;
  instant_bookable: string;
  cancellation_policy: string;
  'room type': string;
  'Construction year': number;
  price: number;
  'service fee': number;
  'minimum nights': number;
  'number of reviews': number;
  'last review': string;
  'reviews per month': number;
  'review rate number': number;
  'calculated host listings count': number;
  'availability 365': number;
  house_rules: string;
}

export interface DashboardStats {
  totalListings: number;
  averagePrice: number;
  averageReviews: number;
  averageAvailability: number;
  roomTypeDistribution: Record<string, number>;
  neighbourhoodDistribution: Record<string, number>;
  priceRanges: {
    range: string;
    count: number;
  }[];
}
