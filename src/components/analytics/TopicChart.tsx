import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';
import type { TopicStat } from '../../types';

interface TopicChartProps {
  topicStats: Record<string, TopicStat>;
}

function barColor(pct: number): string {
  if (pct >= 80) return '#00875A';
  if (pct >= 60) return '#B45309';
  return '#D93025';
}

export default function TopicChart({ topicStats }: TopicChartProps) {
  const data = Object.entries(topicStats)
    .filter(([, s]) => s.attempted > 0)
    .map(([topic, s]) => ({
      topic,
      pct: Math.round((s.correct / s.attempted) * 100),
    }))
    .sort((a, b) => b.pct - a.pct);

  if (!data.length) {
    return (
      <p className="py-6 text-center text-small text-ink-tertiary">
        Answer a few problems to see your topic breakdown.
      </p>
    );
  }

  return (
    <div style={{ height: data.length * 44 + 8 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 36, top: 0, bottom: 0 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="topic"
            width={120}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#6B6B6B', fontFamily: 'Inter' }}
          />
          <Bar dataKey="pct" radius={[4, 4, 4, 4]} barSize={16} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.topic} fill={barColor(d.pct)} />
            ))}
            <LabelList
              dataKey="pct"
              position="right"
              formatter={(v: number) => `${v}%`}
              style={{ fontSize: 12, fill: '#0A0A0A', fontFamily: 'Inter', fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
