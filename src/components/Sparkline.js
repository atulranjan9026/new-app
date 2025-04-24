import React from 'react';

const Sparkline = ({ data }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);

  return (
    <svg width="100" height="40" className="sparkline">
      {data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = ((max - value) / (max - min)) * 40;
        return (
          <circle key={index} cx={x} cy={y} r="1.5" fill="#16c784" />
        );
      })}
      <polyline
        fill="none"
        stroke="#16c784"
        strokeWidth="1"
        points={data
          .map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = ((max - value) / (max - min)) * 40;
            return `${x},${y}`;
          })
          .join(' ')}
      />
    </svg>
  );
};

export default Sparkline;