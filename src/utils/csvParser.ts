import { AirbnbListing } from '../types/listing';

export const parseCSV = (csvText: string): AirbnbListing[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const listings: AirbnbListing[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== headers.length) continue;

    const listing: any = {};
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      listing[header] = value;
    });

    try {
      const parsedListing: AirbnbListing = {
        id: parseInt(listing.id) || 0,
        NAME: listing.NAME || '',
        'host id': parseInt(listing['host id']) || 0,
        host_identity_verified: listing.host_identity_verified || '',
        'host name': listing['host name'] || '',
        'neighbourhood group': listing['neighbourhood group'] || '',
        neighbourhood: listing.neighbourhood || '',
        lat: parseFloat(listing.lat) || 0,
        long: parseFloat(listing.long) || 0,
        country: listing.country || '',
        'country code': listing['country code'] || '',
        instant_bookable: listing.instant_bookable || '',
        cancellation_policy: listing.cancellation_policy || '',
        'room type': listing['room type'] || '',
        'Construction year': parseInt(listing['Construction year']) || 0,
        price: parseFloat(listing.price) || 0,
        'service fee': parseFloat(listing['service fee']) || 0,
        'minimum nights': parseInt(listing['minimum nights']) || 0,
        'number of reviews': parseInt(listing['number of reviews']) || 0,
        'last review': listing['last review'] || '',
        'reviews per month': parseFloat(listing['reviews per month']) || 0,
        'review rate number': parseFloat(listing['review rate number']) || 0,
        'calculated host listings count': parseInt(listing['calculated host listings count']) || 0,
        'availability 365': parseInt(listing['availability 365']) || 0,
        house_rules: listing.house_rules || ''
      };

      listings.push(parsedListing);
    } catch (error) {
      console.error('Error parsing row:', error);
    }
  }

  return listings;
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
};
