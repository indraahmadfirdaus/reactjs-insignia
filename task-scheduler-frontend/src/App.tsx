import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout.tsx";
import TaskList from "./pages/TaskList.tsx";
import TaskForm from "./pages/TaskForm.tsx";
import TaskDetail from "./pages/TaskDetail.tsx";
import TaskLogs from "./pages/TaskLogs.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TaskList />} />
          <Route path="tasks/new" element={<TaskForm />} />
          <Route path="tasks/edit/:id" element={<TaskForm />} />
          <Route path="tasks/:id" element={<TaskDetail />} />
          <Route path="tasks/:id/logs" element={<TaskLogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
