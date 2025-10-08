import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Task Scheduler</h1>
        </div>
        <nav className="mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 text-gray-600 hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `block px-4 py-2 text-gray-600 hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Tasks
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
