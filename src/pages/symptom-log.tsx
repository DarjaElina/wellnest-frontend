import {useQuery} from "@tanstack/react-query";
import {getHealthEntries} from "@/services/health-entry.service.ts";

export default function SymptomLog() {
    const query = useQuery({
        queryKey: ['healthEntries'],
        queryFn: getHealthEntries,
    })
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Symptom Log</h2>
            <p>This is where you will log your symptoms.</p>
            <ul>{query.data?.map((healthEntry: any) => <li key={healthEntry.id}>{healthEntry.notes}</li>)}</ul>
        </div>
    );
}

