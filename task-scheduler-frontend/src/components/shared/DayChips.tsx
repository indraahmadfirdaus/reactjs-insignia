import type { FC } from "react";

interface DayChipsProps {
  selectedIndex?: number;
  compact?: boolean;
}

const DayChips: FC<DayChipsProps> = ({ selectedIndex = 3, compact = false }) => {
  const days = "FRI SAT SUN MON TUE WED THU".split(" ");
  return (
    <div className={`flex gap-2 ${compact ? "px-4" : ""}`}>
      {days.map((d, i) => (
        <div key={d + i} className={`flex flex-col items-center justify-center text-xs ${i===selectedIndex?"text-indigo-700":"text-white/80"}`}>
          <div className={`rounded-full px-3 py-1 ${i===selectedIndex?"bg-white":"bg-white/10"}`}>{d}</div>
        </div>
      ))}
    </div>
  );
};

export default DayChips;