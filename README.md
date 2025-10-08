# Task Scheduler Frontend (React + TypeScript + Vite)

A small frontend for a Task Scheduler app. It provides task listing, creation and editing, execution logs with filters and pagination, and a compact header with live statistics.

## Features

- Header badges with statistics: `Total`, `Active`, `Inactive`, `Failed`.
- Task list with status, schedule, and `Actions` menu (Edit, Logs, Delete, Activate/Deactivate).
- Per-task logs page: `Status` and `Limit` filters, pagination, sticky table header, and scrollable table content.
- Create and edit tasks with cron validation and clean inputs.
- Automatically refetches statistics after task actions (create/update/delete/toggle).

## Tech Stack

- `React` + `TypeScript` + `Vite`.
- `Tailwind CSS` for styling (buttons, badges, cards, dropdowns).

## Key Structure

- `src/components/shared/Layout.tsx` — UI frame, header, and global `refresh-stats` listener.
- `src/pages/TaskList.tsx` — task list + Actions dropdown.
- `src/pages/TaskForm.tsx` — create/edit task form.
- `src/pages/TaskLogs.tsx` — task logs (filters, pagination, scrollable table).
- `src/lib/api.ts` — API client (tasks, logs, dashboard stats).
- `src/types/index.ts` — types for Task, TaskLog, and paginated responses.

## Routes

- `/` — TaskList
- `/tasks/new` — Create Task
- `/tasks/edit/:id` — Edit Task
- `/tasks/:id/logs` — Task Logs

## Setup & Run

1. Install dependencies:
   - `npm install`
2. Environment config (`.env`):
   - `VITE_API_BASE_URL` — base URL of the Task Scheduler backend.
3. Start development server:
   - `npm run dev`
   - Open `http://localhost:5173/` (Vite will auto-select another port if needed).
4. Production build:
   - `npm run build`
   - Artifacts will be in the `dist/` folder.

## API Contracts

- `GET /tasks` — list tasks
- `GET /tasks/:id` — get task detail
- `POST /tasks` — create task
- `PUT /tasks/:id` — update task
- `DELETE /tasks/:id` — delete task
- `POST /tasks/:id/toggle` — activate/deactivate task
- `GET /tasks/:id/logs?page&limit&status` — task execution logs (pagination + status filter)
- `GET /dashboard/stats` — header statistics (total/active/inactive/failed)

## Development Notes

- The layout listens for a global `refresh-stats` `CustomEvent` and re-fetches `getDashboardStats`. This event is dispatched from `TaskList` (delete/toggle) and `TaskForm` (create/update).
- The logs table is scrollable so it doesn’t overflow the frame; the table header is sticky for better readability while scrolling.
- The header has rounded top corners to match the card’s bottom rounding.

## License

Internal project. Do not add license headers unless requested.
