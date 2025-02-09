import React from "react";
import { Badge } from "@/components/ui/badge";
interface DetailSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function DetailSection({ title, icon, children }: DetailSectionProps) {
  return (
    <div className="border-2 rounded-lg p-4 transition-all hover:bg-secondary">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string | number | undefined;
  icon?: React.ReactNode;
  highlight?: boolean;
}

function DetailItem({ label, value, icon, highlight }: DetailItemProps) {
  return (
    <div className={`flex items-center justify-between`}>
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        {icon}
        <Badge
          variant="secondary"
          className={`hover:bg-secondary hover:text-[#9ab88d] cursor-pointer  ${
            highlight ? "bg-primary" : ""
          }`}
        >
          {value || "Not specified"}
        </Badge>
      </div>
    </div>
  );
}

export { DetailSection, DetailItem };
