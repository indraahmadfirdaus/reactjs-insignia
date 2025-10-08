Tahap 1: Inisialisasi Proyek dan Struktur Direktori
Prompt 1.1: Setup Proyek Vite + React + TypeScript dengan Tailwind CSS
"Buat proyek baru menggunakan Vite dengan template React dan TypeScript. Setelah itu, konfigurasikan Tailwind CSS mengikuti panduan instalasi resminya."

Prompt 1.2: Buat Struktur Folder
"Buat struktur direktori berikut di dalam folder src:

components/ui: Untuk komponen UI dasar yang dapat digunakan kembali (Button, Card, Input, Badge).

components/shared: Untuk komponen yang lebih kompleks seperti Navbar, Sidebar, atau Layout.

pages: Untuk setiap halaman aplikasi (Dashboard, TaskList, TaskCreate, TaskDetail).

lib: Untuk utilitas, seperti helper untuk API.

types: Untuk definisi tipe TypeScript."

Tahap 2: Tipe, Utilitas API, dan Komponen Dasar
Prompt 2.1: Definisikan Tipe Data
"Buat file src/types/index.ts dan definisikan interface TypeScript untuk Task, TaskLog, dan DashboardStats berdasarkan konteks di GEMINI.md."

Prompt 2.2: Buat API Client
"Buat file src/lib/api.ts. Buat sebuah class atau object bernama apiClient yang menangani semua pemanggilan ke backend.

Gunakan axios atau fetch.

Konfigurasikan base URL ke http://localhost:3005/api.

Buat sebuah fungsi untuk mengatur header X-API-KEY secara global. Kunci API dapat disimpan di file .env.

Buat fungsi-fungsi berikut:

getDashboardStats()

getTasks()

getTaskById(id: string)

createTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>)

updateTask(id: string, data: Partial<Task>)

deleteTask(id: string)

toggleTaskStatus(id: string)

getLogsForTask(taskId: string)"

Prompt 2.3: Buat Komponen UI Dasar
"Buat komponen-komponen berikut di dalam src/components/ui dengan styling dari Tailwind CSS dan referensi dari design-inspiration.png. Pastikan komponen ini generik dan dapat digunakan kembali.

Button.tsx: Dengan varian primary, secondary, dan danger.

Card.tsx: Komponen kontainer dengan shadow dan border-radius.

Input.tsx: Komponen input teks standar.

Badge.tsx: Untuk menampilkan status, dengan varian warna untuk 'ACTIVE', 'INACTIVE', 'SUCCESS', 'FAILED'."

Tahap 3: Membangun Halaman Aplikasi
Prompt 3.1: Buat Komponen Layout Utama
"Buat komponen src/components/shared/Layout.tsx. Komponen ini harus memiliki struktur dasar dengan sidebar navigasi di sebelah kiri dan area konten utama di sebelah kanan. Tambahkan link navigasi di sidebar untuk: Dashboard, Tasks."

Prompt 3.2: Buat Halaman Dashboard
"Buat halaman src/pages/Dashboard.tsx.

Gunakan useEffect untuk memanggil apiClient.getDashboardStats() saat komponen dimuat.

Tampilkan statistik (total, aktif, gagal) menggunakan komponen Card yang sudah dibuat.

Tampilkan state loading dan error."

Prompt 3.3: Buat Halaman Daftar Tugas (Task List)
"Buat halaman src/pages/TaskList.tsx.

Fetch data tugas menggunakan apiClient.getTasks().

Tampilkan data dalam bentuk tabel atau daftar kartu.

Setiap item harus menampilkan nama tugas, jadwal, dan status (menggunakan komponen Badge).

Tambahkan tombol aksi (Edit, Delete, Toggle) di setiap item. Hubungkan fungsi deleteTask dan toggleTaskStatus ke tombol yang sesuai.

Tambahkan tombol 'Create New Task' yang mengarah ke halaman formulir."

Prompt 3.4: Buat Halaman Form Tambah/Edit Tugas
"Buat halaman src/pages/TaskForm.tsx.

Buat form dengan useState untuk mengelola state setiap input: name, schedule, webhookUrl, maxRetry, dan payload (sebagai string JSON).

Buat fungsi handleSubmit yang akan memanggil apiClient.createTask().

Tambahkan validasi sederhana pada input.

Gunakan kembali komponen Input dan Button."
(Catatan: Logika untuk mode edit bisa ditambahkan di iterasi selanjutnya)

Prompt 3.5: Buat Halaman Detail Tugas dan Log
"Buat halaman src/pages/TaskDetail.tsx. Halaman ini harus menerima id tugas dari URL.

Ambil data tugas dan lognya menggunakan apiClient.getTaskById(id) dan apiClient.getLogsForTask(id).

Tampilkan detail tugas di bagian atas halaman.

Tampilkan log eksekusi dalam tabel di bawahnya, dengan kolom untuk waktu, status (menggunakan Badge), dan pesan."

Tahap 4: Routing dan Finalisasi
Prompt 4.1: Konfigurasi Routing
"Install react-router-dom. Di App.tsx atau main.tsx, konfigurasikan router untuk menghubungkan semua halaman yang telah dibuat:

/: Dashboard

/tasks: TaskList

/tasks/new: TaskForm

/tasks/:id: TaskDetail

/tasks/:id/edit: TaskForm (untuk mode edit)
Gunakan komponen Layout sebagai pembungkus untuk semua halaman."

Prompt 4.2: Finalisasi dan Styling
"Tinjau kembali semua halaman. Pastikan desainnya konsisten, responsif, dan sesuai dengan design-inspiration.png. Tambahkan state loading dan penanganan error di semua tempat yang melakukan pemanggilan API untuk meningkatkan pengalaman pengguna."