import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <nav className="mb-8">
                <Link to="symptom-log" className="mr-4 text-emerald-600 hover:underline">
                    Symptom Log
                </Link>
            </nav>

            <Outlet />
        </div>
    );
}
