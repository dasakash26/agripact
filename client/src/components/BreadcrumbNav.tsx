import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Grid } from "lucide-react";

interface BreadcrumbNavProps {
  category: string | null;
  resultsCount: number;
  onClear: () => void;
}

export function BreadcrumbNav({ category }: BreadcrumbNavProps) {
  if (!category) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Grid size={16} />
          <BreadcrumbLink href="/search">Categories</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>{category.toLowerCase()}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
