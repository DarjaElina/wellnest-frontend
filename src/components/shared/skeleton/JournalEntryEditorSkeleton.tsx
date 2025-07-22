import { Skeleton } from "@/components/ui/skeleton";
export function JournalEntryEditorSkeleton() {
  return (
    <div className="p-6 max-w-full lg:max-w-3xl xl:max-w-5xl mx-auto bg-card rounded-xl shadow space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-40" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-[55vh] w-full rounded-xl" />
      <div className="flex flex-wrap gap-2 mt-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}
