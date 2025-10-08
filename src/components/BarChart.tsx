interface BarChartProps {
  data: Record<string, number>;
  maxItems?: number;
}

export const BarChart = ({ data, maxItems = 10 }: BarChartProps) => {
  const sortedEntries = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxItems);

  const maxValue = Math.max(...sortedEntries.map(([, value]) => value));

  return (
    <div className="space-y-4">
      {sortedEntries.map(([label, value], index) => {
        const percentage = (value / maxValue) * 100;
        const colors = [
          'from-cyan-500 to-cyan-600',
          'from-blue-500 to-blue-600',
          'from-sky-500 to-sky-600',
          'from-teal-500 to-teal-600',
          'from-cyan-400 to-blue-500'
        ];
        const colorClass = colors[index % colors.length];

        return (
          <div key={label} className="space-y-2 group">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800 truncate text-sm">{label}</span>
              <span className="text-slate-600 ml-2 font-bold text-sm">{value.toLocaleString()}</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-700 group-hover:scale-x-105 origin-left shadow-sm`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
