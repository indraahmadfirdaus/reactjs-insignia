Konteks Proyek: Frontend Penjadwal Tugas (Task Scheduler)
Tujuan Utama
Membangun antarmuka pengguna (frontend) yang modern, responsif, dan fungsional untuk aplikasi "Task Scheduler". Frontend ini akan berinteraksi dengan backend yang sudah ada untuk mengelola tugas terjadwal yang mengirim notifikasi ke Discord.

Tumpukan Teknologi (Tech Stack)
Framework: Vite dengan React dan TypeScript.

Styling: Tailwind CSS untuk desain yang modern dan responsif.

Manajemen State: Menggunakan React Hooks bawaan (useState, useEffect, useContext).

Pemanggilan API: fetch API atau axios.

Routing: react-router-dom.

Referensi Desain
Gunakan file design-inspiration.webp (diasumsikan ada di root folder) sebagai referensi utama untuk tata letak, skema warna, dan gaya komponen. UI harus bersih, intuitif, dan terinspirasi dari desain modern di Dribbble.

Detail API Backend
Backend berjalan di http://localhost:3005. Semua permintaan yang memerlukan autentikasi harus menyertakan header X-API-KEY.

Endpoint Utama
Dashboard

GET /api/tasks/dashboard/stats: Mengambil statistik ringkasan (total tugas, aktif, gagal).

Manajemen Tugas

GET /api/tasks: Mengambil semua tugas dengan paginasi.

POST /api/tasks: Membuat tugas baru.

GET /api/tasks/:id: Mengambil detail satu tugas beserta log eksekusinya.

PATCH /api/tasks/:id: Memperbarui tugas yang ada.

DELETE /api/tasks/:id: Menghapus tugas.

POST /api/tasks/:id/toggle: Mengaktifkan atau menonaktifkan tugas.

Log Eksekusi

GET /api/logs: Mengambil semua log eksekusi dengan filter.

GET /api/tasks/:taskId/logs: Mengambil log untuk tugas spesifik.

Model Data (Struktur Data)
Task Model

interface Task {
  id: string;
  name: string;
  schedule: string; // format cron
  webhookUrl: string;
  payload: Record<string, any>; // JSON
  maxRetry: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

TaskLog Model

interface TaskLog {
  id: string;
  taskId: string;
  executionTime: string; // ISO Date String
  status: 'SUCCESS' | 'FAILED' | 'RETRYING';
  retryCount: number;
  message?: string;
  createdAt: string; // ISO Date String
}

Halaman dan Fitur yang Diperlukan
Dashboard: Menampilkan kartu statistik dari endpoint stats.

Daftar Tugas (Task List):

Menampilkan semua tugas dalam bentuk tabel atau daftar kartu.

Menampilkan status tugas (Aktif/Tidak Aktif) dengan indikator visual (badge).

Menyediakan tombol aksi untuk: edit, hapus, dan toggle status.

Ada tombol untuk navigasi ke halaman pembuatan tugas baru.

Formulir Buat/Edit Tugas:

Input untuk name, schedule (cron), webhookUrl, dan maxRetry.

Editor JSON atau textarea untuk memasukkan payload.

Validasi form sebelum pengiriman.

Halaman Detail Tugas & Log Viewer:

Menampilkan detail lengkap dari satu tugas.

Menampilkan daftar log eksekusi untuk tugas tersebut dalam format tabel.

Log harus menampilkan waktu eksekusi, status (berhasil/gagal), dan pesan error jika ada.