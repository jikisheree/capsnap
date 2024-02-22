import React from "react";

interface StatProps {
  name: string;
  value: number;
  desc: string;
}

const Stat = ({ data }: { data: StatProps }) => {
  return (
    <div className="stat overflow-hidden">
      <div className="stat-title">{data.name}</div>
      <div className="stat-value">{data.value}</div>
      <div className="stat-desc">{data.desc}</div>
    </div>
  );
};

export default Stat;
