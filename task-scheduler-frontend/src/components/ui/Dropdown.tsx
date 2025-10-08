import type { FC, ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface DropdownItem {
  label: string;
  icon?: ReactNode;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface DropdownProps {
  label?: string;
  items: DropdownItem[];
}

const Dropdown: FC<DropdownProps> = ({ label = "Actions", items }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Button variant="secondary" size="sm" className="rounded-full" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>
        <span className="mr-1">{label}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>
      {open && (
        <div className="absolute right-0 mt-1 w-36 rounded-xl bg-white shadow-lg ring-1 ring-black/5 py-1 z-50">
          {items.map((item) => {
            const content = (
              <div className={`flex items-center gap-2 px-3 py-1.5 text-sm ${item.disabled ? "text-gray-400" : "text-gray-800 hover:bg-gray-50"}`}>
                {item.icon}
                <span>{item.label}</span>
              </div>
            );
            if (item.to && !item.disabled) {
              return (
                <Link key={item.label} to={item.to} onClick={() => setOpen(false)}>
                  {content}
                </Link>
              );
            }
            return (
              <button key={item.label} type="button" className="w-full text-left" onClick={() => { if (!item.disabled && item.onClick) item.onClick(); setOpen(false); }} disabled={item.disabled}>
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;