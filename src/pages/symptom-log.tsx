import { useQuery } from "@tanstack/react-query";
import { getHealthEntries } from "@/services/health-entry.service.ts";
import {DataTable} from "@/components/symptom-logs/data-table.tsx";
import {columns, type SymptomLogEntry} from "@/components/symptom-logs/columns.tsx";

export const symptomLogData: SymptomLogEntry[] = [
    {
        id: "1",
        symptom: "Headache",
        severity: 7,
        notes: "Started after long screen time. Felt pressure around temples.",
        date: "2025-07-01 18:30",
    },
    {
        id: "2",
        symptom: "Nausea",
        severity: 4,
        notes: "Mild discomfort in the morning, subsided by noon.",
        date: "2025-06-30 09:15",
    },
    {
        id: "3",
        symptom: "Fatigue",
        severity: 6,
        notes: "Low energy all day, despite 8 hours of sleep.",
        date: "2025-06-29 20:45",
    },
    {
        id: "4",
        symptom: "Anxiety",
        severity: 8,
        notes: "Worsened before violin lesson. Practiced breathing, helped a bit.",
        date: "2025-06-28 16:10",
    },
]


export default function SymptomLog() {
  const query = useQuery({
    queryKey: ["healthEntries"],
    queryFn: getHealthEntries,
  });
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Symptom Log</h2>
        <DataTable columns={columns} data={symptomLogData} />
    </div>
  );
}
