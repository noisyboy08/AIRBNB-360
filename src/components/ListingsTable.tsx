import { EnrichedListing } from '../types/enriched';
import { MapPin, Star, Shield, Leaf, AlertTriangle, Sparkles } from 'lucide-react';

interface ListingsTableProps {
  listings: EnrichedListing[];
}

export const ListingsTable = ({ listings }: ListingsTableProps) => {
  if (listings.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center border border-slate-100">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-10 h-10 text-slate-400" />
          </div>
          <p className="text-slate-600 text-lg font-medium">No listings found matching your filters</p>
          <p className="text-slate-400 text-sm mt-2">Try adjusting your search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Property</th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Location</th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Room Type</th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Price</th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">ML Scores</th>
              <th className="px-6 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {listings.slice(0, 50).map((listing) => (
              <tr key={listing.id} className="hover:bg-gradient-to-r hover:from-cyan-50/30 hover:to-blue-50/30 transition-all duration-200">
                <td className="px-6 py-5">
                  <div className="max-w-xs">
                    <p className="font-semibold text-slate-900 truncate">{listing.NAME}</p>
                    <p className="text-sm text-slate-500 mt-0.5">Host: {listing['host name']}</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="p-1.5 bg-slate-100 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-slate-600" />
                    </div>
                    <span className="truncate max-w-[150px] font-medium">{listing.neighbourhood}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 ml-7">{listing['neighbourhood group']}</p>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 border border-cyan-200/50">
                    {listing['room type']}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <p className="font-bold text-slate-900 text-lg">${listing.price}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {listing.priceAnalysis.fairness >= 80 ? '✓ Fair price' : listing.priceAnalysis.vsNeighborhood > 0 ? '↑ Above market' : '↓ Below market'}
                  </p>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-cyan-600" />
                      <span className="text-xs font-semibold text-slate-700">Trust: {listing.trustScore.overall}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-semibold text-slate-700">Eco: {listing.sustainabilityScore.score}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-xs font-semibold text-slate-700">{listing.hostPersonality.tag}</span>
                    </div>
                    {listing.hostGrowth.isRisingStar && (
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        <span className="text-xs font-bold text-amber-600">Rising Star</span>
                      </div>
                    )}
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-bold ${
                      listing.hostGrowth.badge === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                      listing.hostGrowth.badge === 'Gold' ? 'bg-amber-100 text-amber-700' :
                      listing.hostGrowth.badge === 'Silver' ? 'bg-slate-200 text-slate-700' :
                      listing.hostGrowth.badge === 'Rising Star' ? 'bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {listing.hostGrowth.badge === 'Platinum' ? '🏆' :
                       listing.hostGrowth.badge === 'Gold' ? '🥇' :
                       listing.hostGrowth.badge === 'Silver' ? '🥈' :
                       listing.hostGrowth.badge === 'Rising Star' ? '🌟' : '🥉'} {listing.hostGrowth.badge}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    listing.riskScore.level === 'Low' ? 'bg-green-100 text-green-700 border border-green-200' :
                    listing.riskScore.level === 'Medium' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                    'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {listing.riskScore.level}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{listing.riskScore.score} pts</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {listings.length > 50 && (
        <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 px-6 py-4 border-t border-slate-200">
          <p className="text-sm text-slate-600 text-center font-medium">
            Displaying <span className="font-bold text-slate-900">50</span> of <span className="font-bold text-slate-900">{listings.length.toLocaleString()}</span> total listings
          </p>
        </div>
      )}
    </div>
  );
};
