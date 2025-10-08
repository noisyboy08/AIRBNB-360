import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export const StatsCard = ({ title, value, icon: Icon, iconColor, bgColor }: StatsCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:scale-105">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</p>
            <p className="text-4xl font-bold text-slate-900">{value}</p>
          </div>
          <div className={`p-4 rounded-2xl ${bgColor} shadow-md group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
