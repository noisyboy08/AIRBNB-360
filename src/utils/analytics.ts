import { AirbnbListing, DashboardStats } from '../types/listing';
import { EnrichedListing } from '../types/enriched';

export type DaysOption = 1 | 3 | 5;

// Restore stats utilities used across the app
export const calculateStats = (listings: AirbnbListing[] | EnrichedListing[]): DashboardStats => {
  if (listings.length === 0) {
    return {
      totalListings: 0,
      averagePrice: 0,
      averageReviews: 0,
      averageAvailability: 0,
      roomTypeDistribution: {},
      neighbourhoodDistribution: {},
      priceRanges: []
    };
  }

  const totalPrice = listings.reduce((sum, l) => sum + (l.price || 0), 0);
  const totalReviews = listings.reduce((sum, l) => sum + (l['number of reviews'] || 0), 0);
  const totalAvailability = listings.reduce((sum, l) => sum + (l['availability 365'] || 0), 0);

  const roomTypeDistribution: Record<string, number> = {};
  const neighbourhoodDistribution: Record<string, number> = {};

  listings.forEach(listing => {
    const roomType = listing['room type'] || 'Unknown';
    roomTypeDistribution[roomType] = (roomTypeDistribution[roomType] || 0) + 1;

    const neighbourhood = listing['neighbourhood group'] || 'Unknown';
    neighbourhoodDistribution[neighbourhood] = (neighbourhoodDistribution[neighbourhood] || 0) + 1;
  });

  const priceRanges = [
    { range: '$0-50', count: 0 },
    { range: '$51-100', count: 0 },
    { range: '$101-200', count: 0 },
    { range: '$201-500', count: 0 },
    { range: '$500+', count: 0 }
  ];

  listings.forEach(listing => {
    const price = listing.price || 0;
    if (price <= 50) priceRanges[0].count++;
    else if (price <= 100) priceRanges[1].count++;
    else if (price <= 200) priceRanges[2].count++;
    else if (price <= 500) priceRanges[3].count++;
    else priceRanges[4].count++;
  });

  return {
    totalListings: listings.length,
    averagePrice: totalPrice / listings.length,
    averageReviews: totalReviews / listings.length,
    averageAvailability: totalAvailability / listings.length,
    roomTypeDistribution,
    neighbourhoodDistribution,
    priceRanges
  };
};

export const filterListings = <T extends AirbnbListing>(
  listings: T[],
  filters: {
    roomType?: string;
    neighbourhood?: string;
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
  }
): T[] => {
  return listings.filter(listing => {
    if (filters.roomType && listing['room type'] !== filters.roomType) {
      return false;
    }

    if (filters.neighbourhood && listing['neighbourhood group'] !== filters.neighbourhood) {
      return false;
    }

    if (filters.minPrice !== undefined && listing.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== undefined && listing.price > filters.maxPrice) {
      return false;
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const searchableText = `${listing.NAME} ${listing.neighbourhood} ${listing['neighbourhood group']}`.toLowerCase();
      if (!searchableText.includes(term)) {
        return false;
      }
    }

    return true;
  });
};

// Normalize types to capitalized levels
export const computeRegulatoryRisk = (
  listings: EnrichedListing[]
): { group: string; score: number; level: 'low' | 'Medium' | 'High'; factors: string[] }[] => {
  const byGroup: Record<string, EnrichedListing[]> = {};
  listings.forEach(l => {
    const g = l['neighbourhood group'] || 'Unknown';
    byGroup[g] = byGroup[g] || [];
    byGroup[g].push(l);
  });
  const results: { group: string; score: number; level: 'low' | 'Medium' | 'High'; factors: string[] }[] = [];
  for (const [group, ls] of Object.entries(byGroup)) {
    const highDensity = ls.length > 150 ? 25 : ls.length > 80 ? 15 : 5;
    const shortStays = ls.filter(l => l['minimum nights'] <= 2).length / ls.length;
    const touristShare = ls.filter(l => l['room type'] === 'Entire home/apt').length / ls.length;
    let score = highDensity + shortStays * 50 + touristShare * 30;
    score = Math.min(100, Math.round(score));
    const level: 'low' | 'Medium' | 'High' = score > 70 ? 'High' : score > 40 ? 'Medium' : 'low';
    const factors = [
      `Listing density: ${ls.length}`,
      `Short-stay share: ${(shortStays * 100).toFixed(0)}%`,
      `Entire-home share: ${(touristShare * 100).toFixed(0)}%`
    ];
    results.push({ group, score, level, factors });
  }
  return results;
};
