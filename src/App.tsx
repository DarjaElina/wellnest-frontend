import { Routes, Route } from "react-router-dom";
import WelcomePage from "@/pages/welcome-page.tsx";
import Dashboard from "@/pages/dashboard.tsx";
import SymptomLog from "@/pages/symptom-log.tsx";

export default function App() {
    return (
        <Routes>
            <Route index element={<WelcomePage />} />

            <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<div>Select a feature from above.</div>} />
                <Route path="symptom-log" element={<SymptomLog />} />
            </Route>
        </Routes>
    );
}

