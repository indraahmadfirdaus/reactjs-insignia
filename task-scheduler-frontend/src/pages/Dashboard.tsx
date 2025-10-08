import { useEffect, useState } from "react";
import { getDashboardStats } from "../lib/api";
import { Card } from "../components/ui/Card";
import type { DashboardStats } from "../types";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError("Failed to fetch dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h2 className="text-lg font-semibold">Total Tasks</h2>
          <p className="text-3xl font-bold">{stats?.totalTasks}</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Active Tasks</h2>
          <p className="text-3xl font-bold">{stats?.activeTasks}</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Failed Tasks</h2>
          <p className="text-3xl font-bold">{stats?.failedTasks}</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;