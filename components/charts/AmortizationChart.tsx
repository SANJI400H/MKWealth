"use client";

export type AmortizationYear = {
  year: number;
  interest: number;
  principal: number;
  equity: number;
};

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 0 });
}

/** Yearly interest versus principal bars, with cumulative equity as a line. */
export default function AmortizationChart({
  years,
  startLabel,
}: {
  years: AmortizationYear[];
  startLabel: string;
}) {
  if (years.length === 0) return null;

  const width = 720;
  const height = 300;
  const pad = { top: 20, right: 12, bottom: 36, left: 12 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const maxStack = Math.max(...years.map((year) => year.interest + year.principal), 1);
  const maxEquity = Math.max(...years.map((year) => year.equity), 1);
  const slot = innerW / years.length;

  const equityLine = years
    .map((year, index) => {
      const x = pad.left + slot * index + slot / 2;
      const y = pad.top + innerH - (year.equity / maxEquity) * innerH;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <figure>
      <figcaption className="text-sm font-medium text-ink">
        Interest, principal and equity built ({startLabel})
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="amort-title amort-desc"
        className="mt-3 h-auto w-full"
      >
        <title id="amort-title">Amortization by year</title>
        <desc id="amort-desc">
          Burgundy is interest. Silver is principal. The line is cumulative equity, meaning principal repaid.
        </desc>
        {years.map((year, index) => {
          const barW = Math.max(4, Math.min(18, slot * 0.62));
          const x = pad.left + slot * index + (slot - barW) / 2;
          const interestH = (year.interest / maxStack) * innerH;
          const principalH = (year.principal / maxStack) * innerH;
          const principalY = pad.top + innerH - principalH;
          const interestY = principalY - interestH;
          const equityY = pad.top + innerH - (year.equity / maxEquity) * innerH;
          const showLabel = years.length <= 12 || year.year === 1 || year.year === years.length || year.year % 5 === 0;
          return (
            <g key={year.year}>
              <rect x={x} y={interestY} width={barW} height={interestH} fill="#681A2B">
                <title>
                  Year {year.year}: interest AED {money(year.interest)}, principal AED {money(year.principal)}, equity AED{" "}
                  {money(year.equity)}
                </title>
              </rect>
              <rect x={x} y={principalY} width={barW} height={principalH} fill="#C4C7CB" />
              <circle cx={x + barW / 2} cy={equityY} r="2.5" fill="#111111" />
              {showLabel ? (
                <text x={x + barW / 2} y={height - 12} textAnchor="middle" fill="#5c5c5c" fontSize="10">
                  {year.year}
                </text>
              ) : null}
            </g>
          );
        })}
        <polyline points={equityLine} fill="none" stroke="#111111" strokeWidth="1.5" />
      </svg>
      <p className="mt-2 text-xs text-ink-muted">
        Burgundy is interest. Silver is principal. The line is equity you have repaid.
      </p>
    </figure>
  );
}
