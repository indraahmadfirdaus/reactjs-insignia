import type { FC, InputHTMLAttributes } from "react";
import cronstrue from "cronstrue";
import { normalizeCron, isValidCron } from "../../lib/cron";
import { Input } from "./Input";

interface CronInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  id: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CronInput: FC<CronInputProps> = ({ id, value, onChange, className, ...props }) => {
  const parts = normalizeCron(value || "").split(" ");
  const [m = "*", h = "*", dom = "*", mon = "*", dow = "*"] = parts.length === 5 ? parts : ["*", "*", "*", "*", "*"];

  const setPart = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = [m, h, dom, mon, dow];
    next[index] = e.target.value.trim() || "*";
    const cron = normalizeCron(next.join(" "));
    onChange(cron);
  };

  const cronComposed = normalizeCron([m, h, dom, mon, dow].join(" "));
  let description = "";
  try {
    description = cronstrue.toString(cronComposed);
  } catch {
    description = "Cron tidak valid";
  }

  const valid = isValidCron(cronComposed);

  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        <div>
          <div className="text-[10px] text-gray-500 mb-1">minute</div>
          <Input id={`${id}-m`} value={m} onChange={setPart(0)} placeholder="0-59" className={`rounded-full bg-gray-50 ${className ?? ""}`} {...props} />
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1">hour</div>
          <Input id={`${id}-h`} value={h} onChange={setPart(1)} placeholder="0-23" className={`rounded-full bg-gray-50 ${className ?? ""}`} {...props} />
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1">day</div>
          <Input id={`${id}-dom`} value={dom} onChange={setPart(2)} placeholder="1-31" className={`rounded-full bg-gray-50 ${className ?? ""}`} {...props} />
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1">month</div>
          <Input id={`${id}-mon`} value={mon} onChange={setPart(3)} placeholder="1-12" className={`rounded-full bg-gray-50 ${className ?? ""}`} {...props} />
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1">weekday</div>
          <Input id={`${id}-dow`} value={dow} onChange={setPart(4)} placeholder="0-6" className={`rounded-full bg-gray-50 ${className ?? ""}`} {...props} />
        </div>
      </div>
      <div className={`mt-2 text-sm ${valid ? "text-gray-700" : "text-red-600"}`}>{description}</div>
      <div className="mt-2 text-[10px] text-gray-500">
        Gunakan token: `*`, `,`, `-`, `/` dan nama hari/bulan.
      </div>
    </div>
  );
};

export default CronInput;