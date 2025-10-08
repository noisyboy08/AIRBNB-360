import type { LucideIcon } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  icon: LucideIcon;
  color: 'green' | 'blue' | 'amber' | 'red' | 'cyan' | 'emerald';
  subtitle?: string;
}

const colorClasses = {
  green: {
    bg: 'from-green-100 to-emerald-50',
    text: 'text-green-700',
    ring: 'stroke-green-600',
    fill: 'stroke-green-200'
  },
  blue: {
    bg: 'from-blue-100 to-blue-50',
    text: 'text-blue-700',
    ring: 'stroke-blue-600',
    fill: 'stroke-blue-200'
  },
  amber: {
    bg: 'from-amber-100 to-amber-50',
    text: 'text-amber-700',
    ring: 'stroke-amber-600',
    fill: 'stroke-amber-200'
  },
  red: {
    bg: 'from-red-100 to-red-50',
    text: 'text-red-700',
    ring: 'stroke-red-600',
    fill: 'stroke-red-200'
  },
  cyan: {
    bg: 'from-cyan-100 to-cyan-50',
    text: 'text-cyan-700',
    ring: 'stroke-cyan-600',
    fill: 'stroke-cyan-200'
  },
  emerald: {
    bg: 'from-emerald-100 to-emerald-50',
    text: 'text-emerald-700',
    ring: 'stroke-emerald-600',
    fill: 'stroke-emerald-200'
  }
};

export const ScoreCard = ({ title, score, maxScore = 100, icon: Icon, color, subtitle }: ScoreCardProps) => {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const classes = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{title}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${classes.bg}`}>
          <Icon className={`w-5 h-5 ${classes.text}`} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="45"
              className={classes.fill}
              fill="none"
              strokeWidth="8"
            />
            <circle
              cx="48"
              cy="48"
              r="45"
              className={`${classes.ring} transition-all duration-1000`}
              fill="none"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${classes.text}`}>{Math.round(score)}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Score</span>
              <span className="font-semibold">{Math.round(percentage)}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${classes.bg} ${classes.text} transition-all duration-1000`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
