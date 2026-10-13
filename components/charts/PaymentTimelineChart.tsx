"use client";

type Stage = { label: string; amount: number };

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 0 });
}

/** Milestone bars plus a cumulative cash-outlay line. */
export default function PaymentTimelineChart({ stages }: { stages: Stage[] }) {
  const rows = stages.filter((stage) => stage.amount > 0 && stage.label.trim());
  if (rows.length === 0) {
    return <p className="text-sm text-ink-muted">Add payment stages to draw the timeline.</p>;
  }

  const width = 640;
  const height = 280;
  const pad = { top: 24, right: 16, bottom: 64, left: 16 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const max = Math.max(...rows.map((row) => row.amount));
  const slot = innerW / rows.length;
  let running = 0;
  const points = rows.map((row, index) => {
    running += row.amount;
    const x = pad.left + slot * index + slot / 2;
    const y = pad.top + innerH - (running / (running === 0 ? 1 : rows.reduce((sum, item) => sum + item.amount, 0))) * innerH;
    return { ...row, x, y, cumulative: running };
  });
  const total = points[points.length - 1]?.cumulative ?? 0;
  const line = points
    .map((point) => {
      const y = pad.top + innerH - (point.cumulative / (total || 1)) * innerH;
      return `${point.x},${y}`;
    })
    .join(" ");

  return (
    <figure className="mt-6">
      <figcaption className="text-sm font-medium text-ink">Payment timeline</figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="payment-chart-title payment-chart-desc"
        className="mt-3 h-auto w-full"
      >
        <title id="payment-chart-title">Payment plan by milestone</title>
        <desc id="payment-chart-desc">
          Bars show each cash milestone. The line shows cumulative cash outlay.
        </desc>
        {points.map((point) => {
          const barH = (point.amount / (max || 1)) * (innerH * 0.72);
          const barW = Math.min(48, slot * 0.55);
          const x = point.x - barW / 2;
          const y = pad.top + innerH - barH;
          const lineY = pad.top + innerH - (point.cumulative / (total || 1)) * innerH;
          return (
            <g key={point.label} className="chart-draw">
              <rect x={x} y={y} width={barW} height={barH} fill="#681A2B" rx="2">
                <title>
                  {point.label}: AED {money(point.amount)}. Cumulative AED {money(point.cumulative)}.
                </title>
              </rect>
              <circle cx={point.x} cy={lineY} r="4" fill="#111111" />
              <text
                x={point.x}
                y={height - 28}
                textAnchor="middle"
                fill="#5c5c5c"
                fontSize="11"
              >
                {point.label.length > 16 ? `${point.label.slice(0, 14)}…` : point.label}
              </text>
            </g>
          );
        })}
        <polyline points={line} fill="none" stroke="#111111" strokeWidth="2" />
      </svg>
      <ul className="mt-2 space-y-1 text-sm text-ink-muted">
        {points.map((point) => (
          <li key={point.label} className="flex justify-between gap-4">
            <span>{point.label}</span>
            <span className="text-ink">
              AED {money(point.amount)} · cumulative AED {money(point.cumulative)}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
