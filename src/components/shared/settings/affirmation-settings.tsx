import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { getAffirmationsPreview } from "@/services/affirmation";
import { DialogDescription } from "@radix-ui/react-dialog";
import type {
  AffirmationCategory,
  AffirmationSetPreview,
} from "@/types/affirmation.types";
import { useIsDemo } from "@/context/demoContext";
import { demoSets } from "@/data/demo/affirmation";
import type { UserSettings } from "@/types/settings.types";
import { useUpdateRemoteSettings } from "@/hooks/useUpdateRemoteSettings";
import { useSettings } from "@/context/settingsContext";

export default function AffirmationSettings() {
  const isDemo = useIsDemo();
  const updateRemoteSettings = useUpdateRemoteSettings();
  const { settings, updateSettings } = useSettings();

  const handleUpdateSettings = async (
    key: keyof UserSettings,
    value: unknown,
  ) => {
    const newSettings = { ...settings, [key]: value };
    if (!isDemo) {
      await updateRemoteSettings.mutateAsync(newSettings);
    }

    updateSettings(newSettings);
  };

  const {
    data: affirmationSets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["affirmationSets"],
    queryFn: getAffirmationsPreview,
    enabled: !isDemo,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading affirmation sets.</p>;
  }

  const setsToShow = isDemo ? demoSets : affirmationSets;

  return (
    <div className="space-y-6 mt-6">
      <div className="space-y-1">
        <Label className="mb-3">Affirmation Set</Label>
        <p className="text-sm text-muted-foreground mb-1">
          Choose your preferred affirmation set
        </p>

        <div className="flex items-center gap-2">
          <Select
            value={isDemo ? "Self-love" : settings.affirmationSet}
            onValueChange={(val: AffirmationCategory) =>
              handleUpdateSettings("affirmationSet", val)
            }
            disabled={isDemo}
          >
            <SelectTrigger>
              <SelectValue
                className="mb-3"
                placeholder="Select affirmation set"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Sets</SelectLabel>
                {setsToShow.map((set: AffirmationSetPreview) => (
                  <SelectItem key={set.category} value={set.category}>
                    {set.category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer" variant="ghost" size="sm">
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Affirmation Sets Preview</DialogTitle>
                <DialogDescription className="sr-only">
                  Example affirmations
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {setsToShow.map((set: AffirmationSetPreview) => (
                  <div key={set.category} className="border rounded p-3">
                    <h4 className="font-semibold mb-1">🌸 {set.category}</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {set.preview.length > 0 ? (
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {set.preview.map((a: string) => (
                            <li className="list-none" key={a}>
                              {a}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          No preview available.
                        </p>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {isDemo && (
          <p className="text-xs text-muted-foreground my-3">
            This settings are not editable in demo mode 💙
          </p>
        )}
      </div>
    </div>
  );
}
