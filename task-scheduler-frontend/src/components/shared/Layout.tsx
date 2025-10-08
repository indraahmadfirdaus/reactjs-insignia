import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getDashboardStats } from "../../lib/api";
import type { DashboardStats } from "../../types";

const Layout = () => {
  const monthYear = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const refreshStats = useCallback(async () => {
    try {
      const s = await getDashboardStats();
      setStats(s);
    } catch {
      // silently ignore for header UI
    }
  }, []);

  useEffect(() => {
    // initial load
    refreshStats();
  }, [refreshStats]);

  useEffect(() => {
    // listen for global stats refresh events dispatched by task actions
    const handler = () => { refreshStats(); };
    window.addEventListener("refresh-stats", handler);
    return () => window.removeEventListener("refresh-stats", handler);
  }, [refreshStats]);
  return (
    <div className="min-h-screen bg-indigo-50/60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-indigo-400/20" />
        <div className="absolute -bottom-10 -right-8 h-16 w-16 rounded-full bg-blue-400/20" />

        <div className="overflow-visible rounded-3xl shadow-xl bg-white">
          <header className="bg-indigo-700 text-white px-6 pt-6 pb-4 rounded-t-3xl">
            <div className="text-xs uppercase tracking-wide opacity-90 mb-1">Task Scheduler</div>
            <div className="flex items-center justify-between">
              <div className="font-medium">{monthYear}</div>
              <NavLink to="/tasks/new" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30">
                <span className="text-lg leading-none">+</span>
              </NavLink>
            </div>
            {stats && (
              <div className="mt-3 flex items-center gap-2 text-[11px]">
                <div className="rounded-full bg-white/10 px-2.5 py-1">Total <span className="font-semibold">{stats.total}</span></div>
                <div className="rounded-full bg-white/10 px-2.5 py-1">Active <span className="font-semibold">{stats.active}</span></div>
                <div className="rounded-full bg-white/10 px-2.5 py-1">Inactive <span className="font-semibold">{stats.inactive}</span></div>
                <div className="rounded-full bg-white/10 px-2.5 py-1">Failed <span className="font-semibold">{stats.failed}</span></div>
              </div>
            )}
            </header>
          <main className="p-5">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;