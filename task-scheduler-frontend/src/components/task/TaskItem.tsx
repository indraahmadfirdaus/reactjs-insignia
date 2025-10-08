import type { FC } from "react";
import { Badge } from "../ui/Badge";

interface TaskItemProps {
  start: string;
  end: string;
  title: string;
  durationLabel?: string;
  status?: "ACTIVE" | "INACTIVE" | "SUCCESS" | "FAILED";
  color?: "violet" | "blue" | "cyan" | "rose";
}

const colorMap: Record<NonNullable<TaskItemProps["color"]>, string> = {
  violet: "bg-violet-100",
  blue: "bg-blue-100",
  cyan: "bg-cyan-100",
  rose: "bg-rose-100",
};

const TaskItem: FC<TaskItemProps> = ({ start, end, title, durationLabel = "", status = "ACTIVE", color = "violet" }) => {
  return (
    <div className={`rounded-xl p-4 ${colorMap[color]} mb-3 shadow-sm`}> 
      <div className="flex items-start gap-3">
        <div className="mt-2 h-2 w-2 rounded-full bg-white/70 border border-white" />
        <div className="flex-1">
          <div className="text-xs text-gray-700">{start} - {end}</div>
          <div className="mt-1 font-medium text-gray-800">{title}</div>
          <div className="mt-1 flex items-center gap-2">
            {durationLabel && <span className="text-xs text-gray-600">{durationLabel}</span>}
            <Badge variant={status}>{status === "ACTIVE" ? "In Progress" : status === "SUCCESS" ? "Done" : status}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;