import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export interface ColorSelectProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

const colors = [
  "rgb(71 85 105)",
  "rgb(87 83 78)",
  "rgb(220 38 38)",
  "rgb(234 88 12)",
  "rgb(217 119 6)",
  "rgb(202 138 4)",
  "rgb(101 163 13)",
  "rgb(22 163 74)",
  "rgb(5 150 105)",
  "rgb(13 148 136)",
  "rgb(8 145 178)",
  "rgb(37 99 235)",
  "rgb(67 56 202)",
  "rgb(124 58 237)",
  "rgb(147 51 234)",
  "rgb(192 38 211)",
  "rgb(219 39 119)",
  "rgb(225 29 72)",
];

const ColorSelect = ({ value, onChange, className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex h-7 items-center border pl-3 pr-1 py-0 rounded-md",
            className
          )}
        >
          <div className="min-w-20">
            {value ? (
              <Badge
                style={{ backgroundColor: value }}
                className="text-white min-w-10 h-5"
                variant="outline"
              >
                标签
              </Badge>
            ) : (
              "请选择"
            )}
          </div>

          <ChevronDown />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid grid-cols-4 gap-2 p-2">
          {colors.map((color) => (
            <div
              className={cn(
                "flex items-center justify-center hover:bg-muted/50 rounded-md p-1",
                value === color && "bg-muted"
              )}
            >
              <Badge
                onClick={() => onChange(color)}
                style={{ backgroundColor: color }}
                className="text-white"
                variant="outline"
              >
                标签
              </Badge>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorSelect;
