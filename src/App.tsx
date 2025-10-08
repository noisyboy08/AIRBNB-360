import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { parseCSV } from './utils/csvParser';
import { enrichListing } from './utils/enrichment';
import { EnrichedListing } from './types/enriched';

function App() {
  const [listings, setListings] = useState<EnrichedListing[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleFileLoaded = (content: string) => {
    try {
      const parsedListings = parseCSV(content);

      const neighborhoodPrices: Record<string, number[]> = {};
      parsedListings.forEach(listing => {
        const neighborhood = listing['neighbourhood group'] || 'Unknown';
        if (!neighborhoodPrices[neighborhood]) {
          neighborhoodPrices[neighborhood] = [];
        }
        neighborhoodPrices[neighborhood].push(listing.price);
      });

      const neighborhoodAvgPrices: Record<string, number> = {};
      Object.entries(neighborhoodPrices).forEach(([neighborhood, prices]) => {
        neighborhoodAvgPrices[neighborhood] = prices.reduce((a, b) => a + b, 0) / prices.length;
      });

      const enrichedListings = parsedListings.map(listing => {
        const neighborhood = listing['neighbourhood group'] || 'Unknown';
        const avgPrice = neighborhoodAvgPrices[neighborhood] || listing.price;
        return enrichListing(listing, avgPrice);
      });

      setListings(enrichedListings);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV file. Please check the file format.');
    }
  };

  const handleReset = () => {
    setListings([]);
    setIsLoaded(false);
  };

  if (!isLoaded) {
    return <FileUpload onFileLoaded={handleFileLoaded} />;
  }

  return <Dashboard listings={listings} onReset={handleReset} />;
}

export default App;
