import { Skeleton } from "@/components/ui/skeleton";

export function JournalViewSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
