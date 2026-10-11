================================================================================
DAMPING — PERSONALIZED LEARNING ECOSYSTEM & MARKETPLACE (STATIC HTML/CSS/JS)
================================================================================

Website ini adalah hasil konversi lengkap dari prototipe Damping Marketplace
menjadi versi statis murni (Vanilla HTML, CSS, JavaScript).

--------------------------------------------------------------------------------
1. CARA MEMBUKA DAN MENGGUNAKAN WEBSITE
--------------------------------------------------------------------------------
Website ini TIDAK MEMERLUKAN Node.js, npm, Vite, server backend, atau database.

Cara termudah:
1. Buka folder "damping-marketplace-html/".
2. Klik ganda (double-click) pada file "index.html".
3. File akan langsung terbuka di peramban web (Google Chrome, Edge, Safari, Firefox).

Atau jika ingin menggunakan web server lokal ringan (opsional):
- Buka terminal di folder ini, lalu jalankan:
  python -m http.server 8080
  Lalu buka peramban di http://localhost:8080/

--------------------------------------------------------------------------------
2. STRUKTUR FOLDER & FILE
--------------------------------------------------------------------------------
damping-marketplace-html/
├── index.html         - Kerangka utama halaman, kartu, dan 12 modal dialog
├── style.css          - Desain responsif bertema Cream & Sage Green
├── script.js         - Logika aplikasi, navigasi, filter, pemesanan tiket & refund
├── data.js            - Data simulasi statis (guru, bimbel, program, outdoor, portofolio)
├── assets/
│   └── images/        - 13 file gambar lokal (foto guru, logo bimbel, cover outdoor)
└── README.txt         - Petunjuk penggunaan ini

--------------------------------------------------------------------------------
3. KODE AKSES SISWA DEMO (UNTUK ORANG TUA LAMA)
--------------------------------------------------------------------------------
Gunakan kode akses 6-digit berikut pada Gateway A atau tombol "Kode Siswa":

1. Kode: Z5C78E
   - Murid: Farel Pratama (Kelas 5 SD, SD Menteng 01 Jakarta Selatan)
   - Pendamping Aktif: Kak Nadia Rahma, S.Si. (Matematika & Sains)
   - Status: Memiliki portofolio selesai dari kegiatan "Misi Naturalis Ragunan".
   - Dapat langsung membuka portofolio dan mencoba tombol "Lanjutkan Les".

2. Kode: NF8821
   - Murid: Aisyah Putri (Kelas 9 SMP, SMP Labschool Kebayoran)
   - Pendamping Aktif: Kak Dimas Prasetyo, S.Pd. (via Bimbel Nurul Fikri)
   - Status: Aktif bimbingan persiapan materi SMA.

--------------------------------------------------------------------------------
4. FITUR-FITUR UTAMA YANG DAPAT DIUJI
--------------------------------------------------------------------------------
1. Pemisahan Dua Pintu Masuk di Beranda:
   - Gateway A: Masuk kode akses 6 digit untuk memantau anak berjalan.
   - Gateway B: Eksplorasi katalog pembelajaran bagi orang tua baru.

2. 5 Kategori Marketplace:
   - "Semua": Gabungan terstruktur dari seluruh layanan.
   - "Guru Privat": Menampilkan profil guru independen dengan metode belajar aktif.
   - "Lembaga Bimbel": Menampilkan entitas bimbel dengan tim tutor terikat resmi.
   - "Program Belajar": Menampilkan paket bimbingan materi terstruktur per topik.
   - "Kegiatan Outdoor": Menampilkan ekspedisi sains lapangan.

3. Filter Pencarian Relevan:
   - Filter Topik Spesifik: Pecahan, Persamaan Kuadrat, Ekosistem, TPS SNBT, Coding.
   - Filter Jenjang: SD, SMP, SMA, UTBK.
   - Filter Lokasi Presets: Tebet, Kemang, Kebayoran Baru, BSD City, Margonda, dll.
   - Range tarif per sesi dan urutan jarak terdekat.

4. Fitur Unggulan Kegiatan Outdoor (Misi Naturalis Ragunan):
   - 2 Peran Pendamping Komplementer:
     * Kak Nadia Rahma, S.Si. (Pemandu Observasi Alam & Lapangan)
     * Kak Dimas Prasetyo, S.Pd. (Refleksi & Penghubung Konsep Akademik IPA)
   - Keterkaitan dengan materi kurikulum IPA sekolah.
   - Tabel Kebijakan Refund transparan sebelum pemesanan (H-3 80%, H-1 50%, Hari H 0%).

5. Sistem Tiket Kereta-Style:
   - Memilih 1 atau lebih anak; total biaya dihitung otomatis.
   - Validasi ketat kuota: tidak dapat memesan melebihi sisa kursi yang tersedia.
   - Tiket demo terbit lengkap dengan Kode Booking dan status terdaftar.

6. Pembatalan & Simulasi Refund:
   - Buka menu "Tiket Saya" di header.
   - Klik "Batalkan Tiket" pada tiket yang terdaftar.
   - Sistem menghitung simulasi refund 80% sesuai kebijakan H-3.
   - Kuota kursi kegiatan outdoor otomatis dipulihkan kembali ke sistem.

7. Portofolio & Kelanjutan Les:
   - Dari menu tiket yang selesai atau portal siswa Z5C78E, buka Portofolio.
   - Menampilkan catatan pengamatan kedua guru, capaian kompetensi, dan evaluasi.
   - Klik "Lanjutkan Les dengan Guru Ini (Kak Nadia Rahma)" untuk langsung membuka
     formulir pengajuan les privat guru tersebut secara otomatis.

8. Switch Mode Guru / Pengajar:
   - Klik tombol "Guru" di pojok kanan atas header untuk membuka dashboard guru.
   - Menampilkan pengajuan les yang masuk, serta opsi Terima atau Tolak.

--------------------------------------------------------------------------------
5. CATATAN SIMULASI & PENYIMPANAN DATA
--------------------------------------------------------------------------------
- Semua transaksi pembayaran, kode tiket, refund, dan nomor telepon adalah simulasi UI.
- Perubahan status tiket dan pengajuan baru disimpan di memori "localStorage" browser.
- Untuk mengembalikan seluruh data ke kondisi awal, cukup klik tombol "↺ Reset"
  di bagian filter atau bersihkan cache localStorage browser Anda.

================================================================================
Damping Learning Ecosystem — Warm Cream & Sage Green
================================================================================
