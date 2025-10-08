import { useState, useMemo } from 'react';
import { EnrichedListing } from '../types/enriched';
import { calculateStats, filterListings } from '../utils/analytics';
import { StatsCard } from './StatsCard';
import { ChartCard } from './ChartCard';
import { BarChart } from './BarChart';
import { Filters } from './Filters';
import { ListingsTable } from './ListingsTable';
import { Home, DollarSign, Star, Calendar, RotateCcw, Shield, Leaf, AlertTriangle, Sparkles } from 'lucide-react';

interface DashboardProps {
  listings: EnrichedListing[];
  onReset: () => void;
}

export const Dashboard = ({ listings, onReset }: DashboardProps) => {
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const roomTypes = useMemo(() => {
    return Array.from(new Set(listings.map(l => l['room type']).filter(Boolean))).sort();
  }, [listings]);

  const neighbourhoods = useMemo(() => {
    return Array.from(new Set(listings.map(l => l['neighbourhood group']).filter(Boolean))).sort();
  }, [listings]);

  const filteredListings = useMemo(() => {
    return filterListings(listings, {
      roomType: selectedRoomType || undefined,
      neighbourhood: selectedNeighbourhood || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      searchTerm: searchTerm || undefined
    });
  }, [listings, selectedRoomType, selectedNeighbourhood, minPrice, maxPrice, searchTerm]);

  const stats = useMemo(() => calculateStats(filteredListings), [filteredListings]);

  const mlStats = useMemo(() => {
    const avgTrust = filteredListings.reduce((sum, l) => sum + l.trustScore.overall, 0) / filteredListings.length;
    const avgSustainability = filteredListings.reduce((sum, l) => sum + l.sustainabilityScore.score, 0) / filteredListings.length;
    const highRisk = filteredListings.filter(l => l.riskScore.level === 'High').length;
    const ecoFriendly = filteredListings.filter(l => l.sustainabilityScore.ecoFriendly).length;

    return {
      avgTrust: Math.round(avgTrust),
      avgSustainability: Math.round(avgSustainability),
      highRiskCount: highRisk,
      ecoFriendlyCount: ecoFriendly,
      highRiskPercentage: Math.round((highRisk / filteredListings.length) * 100),
      ecoFriendlyPercentage: Math.round((ecoFriendly / filteredListings.length) * 100)
    };
  }, [filteredListings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live Data</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900">Airbnb360 Dashboard</h1>
              <p className="text-slate-600 mt-1.5 text-lg">
                {stats.totalListings.toLocaleString()} properties • AI-Enriched with ML Scores
              </p>
            </div>
            <button
              onClick={onReset}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-2xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
              Load New Data
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Listings"
              value={stats.totalListings.toLocaleString()}
              icon={Home}
              iconColor="text-cyan-600"
              bgColor="bg-gradient-to-br from-cyan-100 to-cyan-50"
            />
            <StatsCard
              title="Average Price"
              value={`$${stats.averagePrice.toFixed(0)}`}
              icon={DollarSign}
              iconColor="text-emerald-600"
              bgColor="bg-gradient-to-br from-emerald-100 to-emerald-50"
            />
            <StatsCard
              title="Avg Reviews"
              value={stats.averageReviews.toFixed(1)}
              icon={Star}
              iconColor="text-amber-600"
              bgColor="bg-gradient-to-br from-amber-100 to-amber-50"
            />
            <StatsCard
              title="Avg Availability"
              value={`${stats.averageAvailability.toFixed(0)} days`}
              icon={Calendar}
              iconColor="text-blue-600"
              bgColor="bg-gradient-to-br from-blue-100 to-blue-50"
            />
          </div>

          <div className="bg-gradient-to-r from-white to-cyan-50/30 rounded-2xl shadow-lg p-6 border border-cyan-100">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-cyan-600" />
              <h3 className="text-lg font-bold text-slate-900">AI-Powered Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                <div className="p-2 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Avg Trust Score</p>
                  <p className="text-xl font-bold text-slate-900">{mlStats.avgTrust}/100</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Eco-Friendly</p>
                  <p className="text-xl font-bold text-slate-900">{mlStats.ecoFriendlyPercentage}%</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                <div className="p-2 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">High Risk</p>
                  <p className="text-xl font-bold text-slate-900">{mlStats.highRiskCount}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                <div className="p-2 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Sustainability</p>
                  <p className="text-xl font-bold text-slate-900">{mlStats.avgSustainability}/100</p>
                </div>
              </div>
            </div>
          </div>

          <Filters
            roomTypes={roomTypes}
            neighbourhoods={neighbourhoods}
            selectedRoomType={selectedRoomType}
            selectedNeighbourhood={selectedNeighbourhood}
            minPrice={minPrice}
            maxPrice={maxPrice}
            searchTerm={searchTerm}
            onRoomTypeChange={setSelectedRoomType}
            onNeighbourhoodChange={setSelectedNeighbourhood}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onSearchChange={setSearchTerm}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard title="Room Type Distribution">
              <BarChart data={stats.roomTypeDistribution} maxItems={5} />
            </ChartCard>

            <ChartCard title="Top Neighbourhoods">
              <BarChart data={stats.neighbourhoodDistribution} maxItems={5} />
            </ChartCard>

            <ChartCard title="Host Personality Types (NLP)">
              <BarChart data={
                filteredListings.reduce((acc, l) => {
                  acc[l.hostPersonality.tag] = (acc[l.hostPersonality.tag] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              } maxItems={6} />
            </ChartCard>
          </div>

          <ChartCard title="Price Range Distribution">
            <div className="space-y-4">
              {stats.priceRanges.map((range, index) => {
                const colors = [
                  'from-emerald-500 to-emerald-600',
                  'from-green-500 to-green-600',
                  'from-teal-500 to-teal-600',
                  'from-cyan-500 to-cyan-600',
                  'from-sky-500 to-sky-600'
                ];
                return (
                  <div key={range.range} className="space-y-2 group">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-800 text-sm">{range.range}</span>
                      <span className="text-slate-600 font-bold text-sm">{range.count.toLocaleString()} listings</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colors[index % colors.length]} rounded-full transition-all duration-700 group-hover:scale-x-105 origin-left shadow-sm`}
                        style={{ width: `${(range.count / stats.totalListings) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-slate-900">Property Listings</h2>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                {filteredListings.length} results
              </span>
            </div>
            <ListingsTable listings={filteredListings} />
          </div>
        </div>
      </main>
    </div>
  );
};
