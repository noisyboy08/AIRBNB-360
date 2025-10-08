interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard = ({ title, children }: ChartCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-slate-100">
      <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">{title}</h3>
      {children}
    </div>
  );
};
