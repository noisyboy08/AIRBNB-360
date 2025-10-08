import { Search, Filter } from 'lucide-react';

interface FiltersProps {
  roomTypes: string[];
  neighbourhoods: string[];
  selectedRoomType: string;
  selectedNeighbourhood: string;
  minPrice: string;
  maxPrice: string;
  searchTerm: string;
  onRoomTypeChange: (value: string) => void;
  onNeighbourhoodChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export const Filters = ({
  roomTypes,
  neighbourhoods,
  selectedRoomType,
  selectedNeighbourhood,
  minPrice,
  maxPrice,
  searchTerm,
  onRoomTypeChange,
  onNeighbourhoodChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSearchChange
}: FiltersProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-slate-100">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl">
          <Filter className="w-5 h-5 text-cyan-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Filter & Search</h3>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
            Room Type
          </label>
          <select
            value={selectedRoomType}
            onChange={(e) => onRoomTypeChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white outline-none transition-all text-slate-900"
          >
            <option value="">All Types</option>
            {roomTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
            Neighbourhood
          </label>
          <select
            value={selectedNeighbourhood}
            onChange={(e) => onNeighbourhoodChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white outline-none transition-all text-slate-900"
          >
            <option value="">All Neighbourhoods</option>
            {neighbourhoods.map(neighbourhood => (
              <option key={neighbourhood} value={neighbourhood}>{neighbourhood}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
            Min Price ($)
          </label>
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
            Max Price ($)
          </label>
          <input
            type="number"
            placeholder="1000"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>
  );
};
