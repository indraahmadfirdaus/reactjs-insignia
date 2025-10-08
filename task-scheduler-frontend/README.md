# Task Scheduler Frontend (React + TypeScript + Vite)

Frontend untuk aplikasi Task Scheduler. Menyediakan halaman daftar task, pembuatan dan pengeditan task, tampilan log eksekusi dengan filter dan pagination, serta statistik ringkas di header.

## Fitur

- Dashboard header dengan statistik: `Total`, `Active`, `Inactive`, `Failed`.
- Daftar task dengan status, jadwal, dan menu `Actions` (Edit, Logs, Delete, Activate/Deactivate).
- Halaman logs per task: filter `Status`, `Limit`, pagination, header sticky, konten tabel scrollable.
- Edit dan tambah task dengan validasi cron dan input yang rapi.
- Refetch statistik otomatis setelah aksi pada task (create/update/delete/toggle).

## Tech Stack

- `React` + `TypeScript` + `Vite`.
- `Tailwind CSS` untuk styling komponen (`Button`, `Badge`, `Card`, `Dropdown`).

## Struktur Utama

- `src/components/shared/Layout.tsx` — kerangka UI, header, dan listener `refresh-stats`.
- `src/pages/TaskList.tsx` — daftar task + dropdown Actions.
- `src/pages/TaskForm.tsx` — form tambah/edit task.
- `src/pages/TaskLogs.tsx` — logs per task (filter, pagination, scrollable table).
- `src/lib/api.ts` — klien API (tasks, logs, dashboard stats).
- `src/types/index.ts` — tipe data Task, TaskLog, dan respons paginasi.

## Rute Aplikasi

- `/` — TaskList
- `/tasks/new` — Tambah Task
- `/tasks/edit/:id` — Edit Task
- `/tasks/:id/logs` — Logs Task

## Persiapan & Menjalankan

1. Instalasi dependencies:
   - `npm install`
2. Konfigurasi environment (`.env`):
   - `VITE_API_BASE_URL` — base URL untuk backend Task Scheduler.
3. Jalankan mode pengembangan:
   - `npm run dev`
   - Buka `http://localhost:5173/` (otomatis pindah port jika 5173 sudah dipakai).
4. Build produksi:
   - `npm run build`
   - Artefak tersedia di folder `dist/`.

## Kontrak API yang Digunakan

- `GET /tasks` — daftar task
- `GET /tasks/:id` — detail task
- `POST /tasks` — membuat task
- `PUT /tasks/:id` — memperbarui task
- `DELETE /tasks/:id` — menghapus task
- `POST /tasks/:id/toggle` — mengaktifkan/menonaktifkan task
- `GET /tasks/:id/logs?page&limit&status` — logs eksekusi per task (paginasi + filter status)
- `GET /dashboard/stats` — statistik ringkas (total/active/inactive/failed)

## Catatan Pengembangan

- Layout mendengarkan event global `refresh-stats` dan akan memanggil ulang `getDashboardStats`. Event ini dikirim dari `TaskList` (delete/toggle) dan `TaskForm` (create/update).
- Tabel logs dibuat scrollable agar tidak keluar dari frame; header tabel sticky untuk keterbacaan saat scroll.
- Dropdown Actions memakai komponen reusable `src/components/ui/Dropdown.tsx` dengan z-index dinaikkan agar tidak terpotong.

## Lisensi

Internal proyek. Jangan menambahkan header lisensi kecuali diminta.
