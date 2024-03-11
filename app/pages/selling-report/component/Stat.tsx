import React from "react";

interface StatProps {
  name: string | undefined;
  value: number | undefined;
}

const Stat = ({ data }: { data: StatProps }) => {
  return (
    <div className="stat overflow-hidden">
      <div className="stat-title">{data.name}</div>
      <div className="stat-value">{data.value}</div>
    </div>
  );
};

export default Stat;
