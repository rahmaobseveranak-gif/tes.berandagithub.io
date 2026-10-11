/**
 * DAMPING MARKETPLACE — DATA SIMULASI DEMO
 * Data statis untuk katalog belajar, guru privat, lembaga bimbel, program, dan kegiatan outdoor.
 * Semua data ditandai sebagai simulasi UI prototype.
 */

window.DAMPING_DATA = {
  PRESET_LOCATIONS: [
    { name: 'Tebet', label: 'Tebet, Jakarta Selatan', city: 'Jakarta Selatan', lat: -6.2383, lng: 106.8530 },
    { name: 'Kemang', label: 'Kemang, Jakarta Selatan', city: 'Jakarta Selatan', lat: -6.2750, lng: 106.8166 },
    { name: 'Kebayoran Baru', label: 'Kebayoran Baru, Jakarta Selatan', city: 'Jakarta Selatan', lat: -6.2415, lng: 106.7972 },
    { name: 'Bintaro', label: 'Bintaro Sektor 7-9, Tangerang Selatan', city: 'Tangerang Selatan', lat: -6.2785, lng: 106.7262 },
    { name: 'BSD City', label: 'BSD City, Tangerang Selatan', city: 'Tangerang Selatan', lat: -6.3015, lng: 106.6528 },
    { name: 'Margonda', label: 'Margonda, Depok', city: 'Depok', lat: -6.3728, lng: 106.8317 },
    { name: 'Dago', label: 'Dago - Coblong, Bandung', city: 'Bandung', lat: -6.8856, lng: 107.6136 },
    { name: 'Kelapa Gading', label: 'Kelapa Gading, Jakarta Utara', city: 'Jakarta Utara', lat: -6.1581, lng: 106.9073 }
  ],

  TUTORS: [
    {
      id: 'tutor-1',
      name: 'Kak Nadia Rahma, S.Si.',
      photoUrl: 'assets/images/tutor-nadia.jpg',
      headline: 'Tutor Matematika & Sains Berbasis Pengalaman Nyata (Alumni Matematika ITB)',
      bio: 'Saya meyakini setiap anak memiliki kecepatan dan cara mencerna logika yang unik. Pembelajaran matematika bukan sekadar menghafal rumus cepat, melainkan membangun intuisi visual dan kontekstual melalui simulasi kehidupan sehari-hari, manipulatif, dan pemecahan masalah bertahap.',
      education: 'S1 Matematika — Institut Teknologi Bandung (ITB)',
      experienceYears: 5,
      subjects: ['Matematika', 'IPA', 'Calistung'],
      levels: ['SD', 'SMP'],
      hourlyRate: 110000,
      sessionDurationMinutes: 90,
      serviceAreaName: 'Tebet & Pancoran, Jakarta Selatan',
      serviceRadiusKm: 6,
      lat: -6.2383,
      lng: 106.8530,
      teachingMethods: ['tatap_muka', 'online', 'outdoor'],
      topicsMastered: ['Pecahan & Desimal', 'Bilangan Bulat & Soal Cerita', 'Aljabar Dasar', 'Geometri Bangun Datar', 'Statistika Sederhana'],
      teachingApproaches: [
        'Belajar Melalui Permainan & Simulasi',
        'Manipulatif Visual & Bar Model',
        'Eksplorasi Konsep Nyata di Sekitar',
        'Latihan Soal Bertahap Tanpa Tekanan'
      ],
      topicApproachExample: {
        topic: 'Konsep Pecahan & Operasi Hitung (Kelas 5 SD)',
        approach: 'Manipulatif Toko Roti & Potongan Pizza',
        description: 'Alih-alih langsung menyamakan penyebut rumus abstrak, anak diajak membagi kue simulasi 1/2 dan 2/4 untuk memahami pecahan senilai. Setelah konsep tertanam, baru beralih ke soal cerita ujian sekolah.'
      },
      childPreferenceFit: [
        'Anak yang butuh visualisasi konkret',
        'Anak yang cemas atau tidak percaya diri dengan matematika',
        'Anak yang aktif bertanya dan suka eksperimen langsung'
      ],
      scheduleSlots: [
        { id: 's1', day: 'Senin', time: '15:30 - 17:00', period: 'Sore' },
        { id: 's2', day: 'Rabu', time: '16:00 - 17:30', period: 'Sore' },
        { id: 's3', day: 'Sabtu', time: '09:00 - 10:30', period: 'Pagi' },
        { id: 's4', day: 'Sabtu', time: '14:00 - 15:30', period: 'Siang' }
      ],
      specializations: ['Pecahan & Aljabar Dasar', 'Persiapan Ujian Sekolah SD', 'Eksperimen Sains Anak'],
      reviews: [
        {
          id: 'rev-1',
          author: 'Ibu Ratna',
          studentRole: 'Orang tua Farel (Kelas 5 SD)',
          rating: 5,
          date: '02 Okt 2026',
          comment: 'Kak Nadia sangat sabar dan telaten. Farel yang tadinya takut soal pecahan sekarang jadi suka karena diajarkan lewat visual dan analogi kue.',
          subject: 'Matematika SD',
          programOrTopic: 'Pecahan & Soal Cerita'
        },
        {
          id: 'rev-2',
          author: 'Pak Hendra',
          studentRole: 'Orang tua Dimas (Kelas 7 SMP)',
          rating: 5,
          date: '18 Sep 2026',
          comment: 'Nilai ulangan IPA anak saya meningkat dari 68 ke 88. Metode belajarnya kontekstual dan komunikasinya dengan orang tua sangat terbuka.',
          subject: 'IPA SMP',
          programOrTopic: 'Ekosistem & Besaran Pengukuran'
        }
      ],
      ratingAverage: 4.9,
      totalSessionsCompleted: 240,
      isAcceptingStudents: true,
      verificationBadge: 'Terverifikasi Damping (ITB)',
      tutorType: 'independent'
    },
    {
      id: 'tutor-2',
      name: 'Kak Dimas Prasetyo, S.Pd.',
      photoUrl: 'assets/images/tutor-dimas.jpg',
      headline: 'Spesialis Konsep Fisika & Matematika SMP-SMA (Tutor Nurul Fikri Kemang)',
      bio: 'Fokus membantu siswa menembus kebuntuan pemahaman fisika dan matematika melalui penalaran analogi logika sehari-hari dan latihan soal bergradasi dari dasar hingga tipe HOTS dan UTBK.',
      education: 'S1 Pendidikan Fisika — Universitas Negeri Jakarta (UNJ)',
      experienceYears: 4,
      subjects: ['Fisika', 'Matematika'],
      levels: ['SMP', 'SMA', 'UTBK / SBMPTN'],
      hourlyRate: 125000,
      sessionDurationMinutes: 90,
      serviceAreaName: 'Kemang & Mampang, Jakarta Selatan',
      serviceRadiusKm: 5,
      lat: -6.2750,
      lng: 106.8166,
      teachingMethods: ['tatap_muka', 'online'],
      topicsMastered: ['Persamaan Kuadrat & Fungsi', 'Gerak Lurus & Gaya Newton', 'Listrik Dinamis & Magnet', 'Trigonometri Analitik'],
      teachingApproaches: [
        'Problem Solving Kontekstual',
        'Analogi Fenomena Alam Nyata',
        'Latihan Soal HOTS Bergradasi',
        'Refleksi Pemahaman di Akhir Sesi'
      ],
      topicApproachExample: {
        topic: 'Persamaan Kuadrat & Titik Puncak Parabola (Kelas 9 SMP)',
        approach: 'Simulasi Lintasan Bola Basket & Ketapel',
        description: 'Menjelaskan sumbu simetri dan titik maksimum parabola melalui kurva tembakan bola basket sebelum masuk ke rumus -b/2a agar anak paham arti geometrisnya.'
      },
      childPreferenceFit: [
        'Anak yang menyukai diskusi logika mendalam',
        'Siswa persiapan ujian sekolah & tes seleksi masuk SMA favorit',
        'Siswa yang butuh bimbingan sistematis dan terstruktur'
      ],
      scheduleSlots: [
        { id: 's5', day: 'Selasa', time: '16:00 - 17:30', period: 'Sore' },
        { id: 's6', day: 'Kamis', time: '16:00 - 17:30', period: 'Sore' },
        { id: 's7', day: 'Minggu', time: '10:00 - 11:30', period: 'Pagi' }
      ],
      specializations: ['Fisika SMP-SMA', 'Aljabar & Persamaan Kuadrat', 'Trik TPS SNBT'],
      reviews: [
        {
          id: 'rev-3',
          author: 'Ibu Widya',
          studentRole: 'Orang tua Aisyah (Kelas 9 SMP)',
          rating: 5,
          date: '28 Sep 2026',
          comment: 'Penjelasan Kak Dimas sangat terstruktur. Materi persamaan kuadrat yang tadinya membingungkan jadi gampang dipahami anak saya.',
          subject: 'Matematika SMP',
          programOrTopic: 'Persamaan Kuadrat'
        }
      ],
      ratingAverage: 4.8,
      totalSessionsCompleted: 195,
      isAcceptingStudents: true,
      verificationBadge: 'Tutor Tim Bimbel (UNJ)',
      tutorType: 'bimbel_team',
      bimbelId: 'bimbel-1',
      bimbelName: 'Bimbel Nurul Fikri — Cabang Kemang'
    },
    {
      id: 'tutor-3',
      name: 'Kak Sarah Wijaya, B.Ed.',
      photoUrl: 'assets/images/tutor-sarah.jpg',
      headline: 'Guru Bahasa Inggris Interaktif & Fonik Anak (Bintang Pelajar Kebayoran)',
      bio: 'Mengajar Bahasa Inggris dengan pendekatan immersion ramah anak, percakapan bermakna, games berbasis cerita, dan penguatan fonik tanpa rasa takut salah berbicara.',
      education: 'Bachelor of Education in TESOL — Universitas Atma Jaya',
      experienceYears: 6,
      subjects: ['Bahasa Inggris', 'Conversation'],
      levels: ['PAUD / TK', 'SD', 'SMP'],
      hourlyRate: 130000,
      sessionDurationMinutes: 90,
      serviceAreaName: 'Kebayoran Baru & Senayan, Jakarta Selatan',
      serviceRadiusKm: 5,
      lat: -6.2415,
      lng: 106.7972,
      teachingMethods: ['tatap_muka', 'online'],
      topicsMastered: ['Phonics & Early Reading', 'Confidence Daily Speaking', 'Cambridge Primary English Support', 'Grammar in Fun Context'],
      teachingApproaches: [
        'Storytelling & Roleplay Interaktif',
        'Lagu, Gerak & Visual Flashcard',
        'Pembelajaran Tanpa Rasa Takut Salah'
      ],
      topicApproachExample: {
        topic: 'Daily Conversation & Vocabulary (Kelas 3 SD)',
        approach: 'Simulasi Kafe Mini & Pesan Makanan',
        description: 'Anak dan tutor bermain peran sebagai kasir dan pelanggan kafe, melatih percakapan bahasa Inggris natural dengan menu buatan anak sendiri.'
      },
      childPreferenceFit: [
        'Anak pemalu yang butuh dorongan rasa percaya diri berbahasa',
        'Siswa sekolah bilingual / Cambridge curriculum support'
      ],
      scheduleSlots: [
        { id: 's8', day: 'Senin', time: '16:00 - 17:30', period: 'Sore' },
        { id: 's9', day: 'Jumat', time: '15:30 - 17:00', period: 'Sore' },
        { id: 's10', day: 'Sabtu', time: '10:30 - 12:00', period: 'Pagi' }
      ],
      specializations: ['Speaking Percaya Diri', 'Phonics & Reading', 'Cambridge Primary Support'],
      reviews: [
        {
          id: 'rev-4',
          author: 'Ibu Melissa',
          studentRole: 'Orang tua Chloe (Kelas 4 SD)',
          rating: 5,
          date: '25 Sep 2026',
          comment: 'Kak Sarah sangat ceria dan sabar. Anak saya sekarang percaya diri berbicara bahasa Inggris saat presentasi di sekolahnya.',
          subject: 'Bahasa Inggris SD',
          programOrTopic: 'Speaking & Phonics'
        }
      ],
      ratingAverage: 5.0,
      totalSessionsCompleted: 310,
      isAcceptingStudents: true,
      verificationBadge: 'Tutor Tim Bimbel (Atma Jaya)',
      tutorType: 'bimbel_team',
      bimbelId: 'bimbel-2',
      bimbelName: 'Bintang Pelajar — Cabang Kebayoran Baru'
    },
    {
      id: 'tutor-4',
      name: 'Kak Budi Santoso, M.Si.',
      photoUrl: 'assets/images/tutor-budi.jpg',
      headline: 'Tutor Sains Eksploratif & Pembimbing Olimpiade IPA SD (Alumni Biologi Unpad)',
      bio: 'Memandu anak-anak menemukan keajaiban sains dan biologi melalui eksperimen mandiri berbahan dapur, investigasi alam sekitar, dan penguatan konsep ilmiah.',
      education: 'S2 Biologi — Universitas Padjadjaran (Unpad)',
      experienceYears: 7,
      subjects: ['IPA', 'Biologi'],
      levels: ['SD', 'SMP', 'SMA'],
      hourlyRate: 135000,
      sessionDurationMinutes: 90,
      serviceAreaName: 'Tebet & Pancoran, Jakarta Selatan',
      serviceRadiusKm: 7,
      lat: -6.2383,
      lng: 106.8530,
      teachingMethods: ['tatap_muka', 'outdoor', 'hybrid'],
      topicsMastered: ['Sistem Pencernaan & Peredaran Darah', 'Ekosistem & Rantai Makanan', 'Fotosintesis & Tumbuhan', 'Persiapan OSN IPA SD'],
      teachingApproaches: [
        'Eksperimen Sains Ramah Lingkungan',
        'Investigasi Lapangan & Flora Fauna',
        'Analisis Data & Pemikiran Kritis'
      ],
      topicApproachExample: {
        topic: 'Ekosistem & Rantai Makanan (Kelas 5 SD)',
        approach: 'Pembuatan Terarium Mini & Pengamatan Serangga',
        description: 'Anak membuat ekosistem mini dalam toples kaca untuk melihat siklus air dan dekomposisi secara nyata sebelum mengaitkannya ke soal ujian.'
      },
      childPreferenceFit: [
        'Anak dengan rasa ingin tahu tinggi terhadap alam dan hewan',
        'Siswa persiapan lomba sains atau OSN SD'
      ],
      scheduleSlots: [
        { id: 's11', day: 'Rabu', time: '16:00 - 17:30', period: 'Sore' },
        { id: 's12', day: 'Sabtu', time: '13:30 - 15:00', period: 'Siang' }
      ],
      specializations: ['Eksperimen Sains Rumah', 'Persiapan OSN IPA SD', 'Ekosistem & Biologi'],
      reviews: [
        {
          id: 'rev-5',
          author: 'Pak Danang',
          studentRole: 'Orang tua Rafa (Kelas 5 SD)',
          rating: 4.9,
          date: '05 Okt 2026',
          comment: 'Anak saya sangat antusias belajar dengan Kak Budi. Materi sains jadi hidup karena selalu ada eksperimen langsung.',
          subject: 'IPA SD',
          programOrTopic: 'Pembinaan OSN IPA'
        }
      ],
      ratingAverage: 4.9,
      totalSessionsCompleted: 160,
      isAcceptingStudents: true,
      verificationBadge: 'Terverifikasi Damping (Unpad)',
      tutorType: 'independent'
    },
    {
      id: 'tutor-5',
      name: 'Kak Rizky Ananda, S.Kom.',
      photoUrl: 'assets/images/tutor-rizky.jpg',
      headline: 'Instruktur Coding Anak Scratch & Logika Algoritma (Kalananti STEM BSD)',
      bio: 'Mengajarkan computational thinking dan logika komputasi melalui pembuatan game 2D mandiri, animasi interaktif, dan pemrograman visual yang mengasah kreativitas pemecahan masalah anak.',
      education: 'S1 Teknik Informatika — Universitas Bina Nusantara (Binus)',
      experienceYears: 4,
      subjects: ['Coding Anak', 'Matematika Terapan'],
      levels: ['SD', 'SMP'],
      hourlyRate: 140000,
      sessionDurationMinutes: 90,
      serviceAreaName: 'BSD City & Serpong, Tangerang Selatan',
      serviceRadiusKm: 8,
      lat: -6.3015,
      lng: 106.6528,
      teachingMethods: ['tatap_muka', 'online'],
      topicsMastered: ['Scratch 3.0 Game Design', 'Logika Percabangan & Loop Algoritma', 'Python Dasar untuk Remaja', 'Matematika Terapan dalam Game Physics'],
      teachingApproaches: [
        'Project-Based Game Creation',
        'Trial & Error Debugging Didampingi',
        'Showcase Karya Digital Anak'
      ],
      topicApproachExample: {
        topic: 'Logika Variabel & Sistem Skor (Kelas 4 SD)',
        approach: 'Membuat Game Tangkap Buah Jatuh di Scratch',
        description: 'Anak diajak merancang game di mana skor bertambah saat keranjang menangkap buah, menghubungkan konsep aljabar matematika dasar dengan coding visual.'
      },
      childPreferenceFit: [
        'Anak yang menyukai game dan ingin belajar membuatnya sendiri',
        'Anak yang tertarik dengan komputer dan teknologi'
      ],
      scheduleSlots: [
        { id: 's13', day: 'Rabu', time: '16:00 - 17:30', period: 'Sore' },
        { id: 's14', day: 'Sabtu', time: '10:00 - 11:30', period: 'Pagi' }
      ],
      specializations: ['Scratch Game Creator', 'Logika Algoritma Anak', 'Python Pemula'],
      reviews: [
        {
          id: 'rev-6',
          author: 'Pak Gunawan',
          studentRole: 'Orang tua Kevin (Kelas 6 SD)',
          rating: 5,
          date: '19 Sep 2026',
          comment: 'Kevin sekarang bisa membuat game labirin sendiri dan memahami konsep koordinat X-Y matematika lebih cepat.',
          subject: 'Coding Anak',
          programOrTopic: 'Scratch Game Development'
        }
      ],
      ratingAverage: 4.8,
      totalSessionsCompleted: 110,
      isAcceptingStudents: true,
      verificationBadge: 'Tutor Tim STEM (Binus)',
      tutorType: 'bimbel_team',
      bimbelId: 'bimbel-3',
      bimbelName: 'Kalananti STEM & Coding Academy — BSD City'
    }
  ],

  BIMBELS: [
    {
      id: 'bimbel-1',
      name: 'Bimbel Nurul Fikri — Cabang Kemang',
      brandCode: 'NF-KMG',
      logoUrl: 'assets/images/bimbel-nf.jpg',
      tagline: 'Bimbingan Belajar Islami & Pembinaan Karakter Berprestasi',
      description: 'Lembaga bimbingan belajar dengan rekam jejak lebih dari 20 tahun. Memiliki fasilitas ruang belajar AC (maks 12 siswa), klinik konsultasi PR tatap muka 1-on-1, simulasi CBT SNBT berkala, dan tim tutor spesialis seleksi PTN.',
      branchAddress: 'Jl. Kemang Selatan No. 18, Mampang Prapatan, Jakarta Selatan',
      districtName: 'Kemang, Jakarta Selatan',
      lat: -6.2750,
      lng: 106.8166,
      phone: '021-789-2231',
      subjects: ['Fisika', 'Matematika', 'Kimia', 'Biologi', 'Persiapan UTBK'],
      levels: ['SMP', 'SMA', 'UTBK / SBMPTN'],
      priceRangeText: 'Rp 650.000 – Rp 1.250.000 / bulan',
      minMonthlyFee: 650000,
      maxMonthlyFee: 1250000,
      teachingMethods: ['tatap_muka', 'online', 'hybrid'],
      ratingAverage: 4.9,
      totalStudents: 320,
      isAcceptingRegistration: true,
      verificationBadge: 'Lembaga Resmi Berizin',
      accreditation: 'Terakreditasi A — Kemendikbudristek',
      facilities: ['Ruang Kelas AC (Maks 12 Siswa)', 'Klinik Konsultasi Soal 1-on-1', 'Akses Bank Soal LessApp', 'Tryout SNBT Terkomputerisasi'],
      tutorIds: ['tutor-2'],
      programs: [
        {
          id: 'prog-nf-1',
          name: 'Program Reguler SNBT Intensif SMA',
          description: 'Pendampingan 3x seminggu materi TKA & TPS, bedah soal HOTS, dan konsultasi strategi pilihan jurusan PTN.',
          levels: ['SMA', 'UTBK / SBMPTN'],
          priceRange: 'Rp 950.000 / bulan',
          method: 'hybrid'
        },
        {
          id: 'prog-nf-2',
          name: 'Program Bimbingan Belajar Reguler SMP',
          description: 'Pendampingan penguasaan konsep matematika & IPA, persiapan ujian sekolah, dan pendampingan PR harian.',
          levels: ['SMP'],
          priceRange: 'Rp 650.000 / bulan',
          method: 'tatap_muka'
        }
      ]
    },
    {
      id: 'bimbel-2',
      name: 'Bintang Pelajar — Cabang Kebayoran Baru',
      brandCode: 'BP-KBY',
      logoUrl: 'assets/images/bimbel-bp.jpg',
      tagline: 'Pelopor Bimbingan Belajar Islami & Bilingual School Support',
      description: 'Menyediakan kelas kecil eksklusif (maksimal 5 siswa per kelas) dengan pendekatan pembinaan akhlak dan prestasi akademik. Dilengkapi modul bilingual dan pengajar bersertifikat.',
      branchAddress: 'Jl. Kyai Maja No. 31, Kebayoran Baru, Jakarta Selatan',
      districtName: 'Kebayoran Baru, Jakarta Selatan',
      lat: -6.2415,
      lng: 106.7972,
      phone: '021-722-4410',
      subjects: ['Bahasa Inggris', 'Matematika', 'IPA', 'Conversation'],
      levels: ['SD', 'SMP', 'SMA'],
      priceRangeText: 'Rp 550.000 – Rp 1.100.000 / bulan',
      minMonthlyFee: 550000,
      maxMonthlyFee: 1100000,
      teachingMethods: ['tatap_muka', 'online', 'hybrid'],
      ratingAverage: 4.8,
      totalStudents: 210,
      isAcceptingRegistration: true,
      verificationBadge: 'Lembaga Resmi Berizin',
      accreditation: 'Terakreditasi A',
      facilities: ['Kelas Eksklusif (5 Siswa)', 'Modul Kurikulum Cambridge / Nasional', 'Laporan Berkala Orang Tua di LessApp'],
      tutorIds: ['tutor-3'],
      programs: [
        {
          id: 'prog-bp-1',
          name: 'Bilingual English Masterclass',
          description: 'Fokus speaking, grammar kontekstual, dan pendampingan kurikulum internasional sekolah bilingual.',
          levels: ['SD', 'SMP', 'SMA'],
          priceRange: 'Rp 850.000 / bulan',
          method: 'hybrid'
        }
      ]
    },
    {
      id: 'bimbel-3',
      name: 'Kalananti STEM & Coding Academy — BSD City',
      brandCode: 'KLN-BSD',
      logoUrl: 'assets/images/bimbel-kalananti.jpg',
      tagline: 'Pusat Pembelajaran Coding & Logika Komputasi Anak Usia 6-16 Tahun',
      description: 'Lembaga edutech spesialis teknologi anak yang mengajarkan computational thinking melalui pembuatan game Scratch, robotika sederhana, dan bahasa pemrograman Python.',
      branchAddress: 'Ruko Icon Business Park Blok F No. 8, BSD City, Tangerang Selatan',
      districtName: 'BSD City, Tangerang Selatan',
      lat: -6.3015,
      lng: 106.6528,
      phone: '021-505-8900',
      subjects: ['Coding Anak', 'Matematika Terapan', 'Teknologi'],
      levels: ['SD', 'SMP', 'SMA'],
      priceRangeText: 'Rp 750.000 – Rp 1.450.000 / bulan',
      minMonthlyFee: 750000,
      maxMonthlyFee: 1450000,
      teachingMethods: ['tatap_muka', 'online'],
      ratingAverage: 4.9,
      totalStudents: 180,
      isAcceptingRegistration: true,
      verificationBadge: 'Lembaga Resmi Berizin',
      accreditation: 'STEM.org Certified Program',
      facilities: ['Komputer iMac & PC Lab', 'Showcase Proyek Akhir', 'Sertifikat Portofolio Digital'],
      tutorIds: ['tutor-5'],
      programs: [
        {
          id: 'prog-kln-1',
          name: 'Young Game Creators (Scratch 3.0)',
          description: 'Belajar logika pemrograman dasar dengan mendesain dan mempublikasikan game 2D mandiri.',
          levels: ['SD', 'SMP'],
          priceRange: 'Rp 750.000 / bulan',
          method: 'tatap_muka'
        }
      ]
    },
    {
      id: 'bimbel-4',
      name: 'Ganesha Operation — Cabang Dago Bandung',
      brandCode: 'GO-DGO',
      logoUrl: 'assets/images/bimbel-go.jpg',
      tagline: 'Bimbel Terbesar & Pencetak Kelulusan Terbanyak ke PTN Favorit',
      description: 'Lembaga bimbingan belajar dengan formula The King untuk pemecahan soal cepat, drilling ribuan bank soal, dan evaluasi berkala sistematis.',
      branchAddress: 'Jl. Ir. H. Juanda (Dago) No. 122, Coblong, Bandung',
      districtName: 'Dago - Coblong, Bandung',
      lat: -6.8856,
      lng: 107.6136,
      phone: '022-250-1920',
      subjects: ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Persiapan UTBK'],
      levels: ['SMP', 'SMA', 'UTBK / SBMPTN'],
      priceRangeText: 'Rp 700.000 – Rp 1.500.000 / bulan',
      minMonthlyFee: 700000,
      maxMonthlyFee: 1500000,
      teachingMethods: ['tatap_muka', 'hybrid'],
      ratingAverage: 4.8,
      totalStudents: 450,
      isAcceptingRegistration: true,
      verificationBadge: 'Lembaga Resmi Berizin',
      accreditation: 'Terakreditasi A',
      facilities: ['Kelas Nyaman Full AC', 'Buku Panduan The King Soal', 'Tryout CBT Berkala'],
      tutorIds: [],
      programs: [
        {
          id: 'prog-go-1',
          name: 'Program Eksekutif Sukses SNBT PTN',
          description: 'Drilling soal HOTS harian, konsultasi passing grade jurusan, dan tryout berbasis sistem UTBK.',
          levels: ['SMA', 'UTBK / SBMPTN'],
          priceRange: 'Rp 1.200.000 / bulan',
          method: 'tatap_muka'
        }
      ]
    }
  ],

  PROGRAMS: [
    {
      id: 'prog-1',
      title: 'Master Pecahan & Penalaran Soal Cerita Kelas 5 SD',
      subject: 'Matematika',
      topic: 'Pecahan',
      level: 'Kelas 5 SD',
      targetGoal: 'Penguatan Konsep & Soal Cerita Ujian Sekolah',
      learningGoalCategory: 'penguatan_dasar',
      teachingApproach: 'Manipulatif Visual, Game Simulasi & Latihan Terstruktur',
      sessionCount: 4,
      totalPrice: 380000,
      providerType: 'guru_privat',
      providerId: 'tutor-1',
      providerName: 'Kak Nadia Rahma, S.Si.',
      providerPhotoOrLogo: 'assets/images/tutor-nadia.jpg',
      tutorName: 'Kak Nadia Rahma, S.Si.',
      activities: [
        'Sesi 1: Membangun intuisi pecahan senilai lewat simulasi pizza & kue',
        'Sesi 2: Menjumlahkan & mengurangkan pecahan beda penyebut via bar model',
        'Sesi 3: Perkalian & pembagian pecahan dalam konteks belanja sehari-hari',
        'Sesi 4: Membedah 10 pola soal cerita pecahan yang sering keluar di ujian sekolah'
      ],
      expectedOutcomes: [
        'Anak memahami alasan rumus pecahan tanpa perlu hafalan buta',
        'Mampu memecahkan soal cerita bertingkat dengan percaya diri',
        'Laporan portofolio perkembangan kemampuan anak diberikan ke orang tua'
      ],
      prerequisites: 'Telah menguasai perkalian dan pembagian dasar 1-100',
      method: 'tatap_muka',
      districtName: 'Tebet, Jakarta Selatan',
      lat: -6.2383,
      lng: 106.8530
    },
    {
      id: 'prog-2',
      title: 'Trik Persamaan Kuadrat & Fungsi SMP Kelas 9',
      subject: 'Matematika',
      topic: 'Persamaan Kuadrat',
      level: 'Kelas 9 SMP',
      targetGoal: 'Kesiapan Ulangan Harian & Seleksi SMA Favorit',
      learningGoalCategory: 'persiapan_ujian',
      teachingApproach: 'Analisis Pola, Metode Pemfaktoran Cepat, Geometri Visual',
      sessionCount: 4,
      totalPrice: 450000,
      providerType: 'guru_privat',
      providerId: 'tutor-2',
      providerName: 'Kak Dimas Prasetyo, S.Pd.',
      providerPhotoOrLogo: 'assets/images/tutor-dimas.jpg',
      tutorName: 'Kak Dimas Prasetyo, S.Pd.',
      activities: [
        'Sesi 1: Menemukan akar dengan pemfaktoran cepat dan kuadrat sempurna',
        'Sesi 2: Memahami diskriminan dan jenis akar secara intuitif',
        'Sesi 3: Menggambar grafik fungsi kuadrat dan sumbu simetri',
        'Sesi 4: Soal aplikasi pemodelan matematika (lintasan proyektil, luas maksimum)'
      ],
      expectedOutcomes: [
        'Siswa mampu menyelesaikan persamaan kuadrat dalam < 2 menit per soal',
        'Pemahaman visual bentuk parabola dan nilai optimum',
        'Siap menghadapi soal HOTS di Asesmen Madrasah / Ujian Sekolah'
      ],
      method: 'tatap_muka',
      districtName: 'Kemang, Jakarta Selatan',
      lat: -6.2750,
      lng: 106.8166
    },
    {
      id: 'prog-3',
      title: 'Mini Lab Sains Ramah Lingkungan & Eksperimen Proyek',
      subject: 'IPA',
      topic: 'Ekosistem & Sains',
      level: 'Kelas 4-6 SD',
      targetGoal: 'Eksperimen Mandiri & Pengayaan Sains Kreatif',
      learningGoalCategory: 'proyek_eksplorasi',
      teachingApproach: 'Project-Based Learning, Eksperimen Rumah & Diskusi Ilmiah',
      sessionCount: 4,
      totalPrice: 500000,
      providerType: 'guru_privat',
      providerId: 'tutor-4',
      providerName: 'Kak Budi Santoso, M.Si.',
      providerPhotoOrLogo: 'assets/images/tutor-budi.jpg',
      tutorName: 'Kak Budi Santoso, M.Si.',
      activities: [
        'Sesi 1: Eksperimen kapilaritas tanaman dan pigmen fotosintesis',
        'Sesi 2: Pembuatan mikroskop tetes air sederhana untuk melihat mikroba',
        'Sesi 3: Investigasi rantai makanan dan siklus dekomposisi',
        'Sesi 4: Pembuatan karya terarium mini mandiri yang dapat disimpan di rumah'
      ],
      expectedOutcomes: [
        'Membangkitkan kecintaan anak pada sains dan alam',
        'Portofolio foto eksperimen yang terdokumentasi di LessApp',
        'Koneksi materi praktikum dengan konsep IPA Kurikulum Merdeka'
      ],
      method: 'tatap_muka',
      districtName: 'Tebet, Jakarta Selatan',
      lat: -6.2383,
      lng: 106.8530
    },
    {
      id: 'prog-4',
      title: 'Intensif Penalaran Matematika & TPS SNBT 2027',
      subject: 'Persiapan UTBK',
      topic: 'TPS SNBT',
      level: 'SMA / UTBK',
      targetGoal: 'Peningkatan Skor Subtes Penalaran Matematika > 650',
      learningGoalCategory: 'persiapan_ujian',
      teachingApproach: 'Drilling Soal Asli SNBT, Manajemen Waktu, Bedah Jebakan Logika',
      sessionCount: 8,
      totalPrice: 850000,
      providerType: 'lembaga_bimbel',
      providerId: 'bimbel-1',
      providerName: 'Bimbel Nurul Fikri — Cabang Kemang',
      providerPhotoOrLogo: 'assets/images/bimbel-nf.jpg',
      tutorName: 'Tim Spesialis TPS Bimbel NF',
      activities: [
        'Sesi 1-2: Penalaran Kuantitatif & Logika Aritmatika Sosial',
        'Sesi 3-4: Geometri Bangun Datar & Koordinat Kartesius SNBT',
        'Sesi 5-6: Peluang, Kombinatorika & Interpretasi Grafik Data',
        'Sesi 7-8: Simulasi CBT Berwaktu & Evaluasi Personal'
      ],
      expectedOutcomes: [
        'Prediksi skor dan analisis kelemahan per subtopik',
        'Kuasai strategi menjawab soal pilihan ganda efisien tanpa panik'
      ],
      method: 'hybrid',
      districtName: 'Kemang, Jakarta Selatan',
      lat: -6.2750,
      lng: 106.8166
    },
    {
      id: 'prog-5',
      title: 'Young Game Creator: Coding Scratch 3.0',
      subject: 'Coding Anak',
      topic: 'Coding Scratch',
      level: 'Kelas 3-6 SD',
      targetGoal: 'Pembuatan 3 Game Mandiri & Computational Thinking',
      learningGoalCategory: 'minat_bakat',
      teachingApproach: 'Project-Based Learning, Desain Karakter, Logika Algoritma',
      sessionCount: 6,
      totalPrice: 750000,
      providerType: 'lembaga_bimbel',
      providerId: 'bimbel-3',
      providerName: 'Kalananti STEM & Coding Academy — BSD City',
      providerPhotoOrLogo: 'assets/images/bimbel-kalananti.jpg',
      tutorName: 'Kak Rizky Ananda, S.Kom.',
      activities: [
        'Sesi 1: Pengenalan sprite, backdrop, dan gerak dasar sumbu X-Y',
        'Sesi 2: Logika percabangan (if-else) & sensor sentuhan',
        'Sesi 3: Sistem variabel poin score & nyawa game',
        'Sesi 4: Proyek 1: Game Tangkap Buah',
        'Sesi 5: Proyek 2: Game Labirin Berhalangan',
        'Sesi 6: Final Showcase: Publikasi dan presentasi game ke orang tua'
      ],
      expectedOutcomes: [
        'Anak memahami logika algoritma secara terstruktur dan menyenangkan',
        'Tiga game karya anak tersimpan di akun Scratch pribadi'
      ],
      method: 'tatap_muka',
      districtName: 'BSD City, Tangerang Selatan',
      lat: -6.3015,
      lng: 106.6528
    }
  ],

  OUTDOOR_ACTIVITIES: [
    {
      id: 'outdoor-naturalis-ragunan',
      title: 'Misi Naturalis — Mengenal Ekosistem & Adaptasi Satwa',
      locationName: 'Taman Margasatwa Ragunan, Jakarta Selatan',
      meetingPoint: 'Pintu Masuk Barat (Dekat Pusat Primata Schmutzer)',
      lat: -6.3121,
      lng: 106.8201,
      date: '15 November 2026',
      timeSlot: '08:00 – 10:00 WIB',
      durationMinutes: 120,
      capacityTotal: 12,
      capacityBooked: 8,
      pricePerChild: 150000,
      feeIncludes: [
        'Tiket Masuk Peserta & Kartu Identitas Naturalis',
        'Buku Jurnal Misi Eksplorasi & Lembar Observasi Bergambar',
        'Kaca Pembesar (Dipinjamkan) & Stiker Badge Misi Selesai',
        'Snack Sehat & Susu UHT',
        'Pendampingan Intensif oleh 2 Guru Spesialis (Rasio 1:6)'
      ],
      targetAudience: 'Anak usia 7–12 tahun (Kelas 2–6 SD) yang tertarik mengeksplorasi alam, mengamati satwa, dan belajar langsung di lapangan.',
      subject: 'IPA (Biologi & Ekologi)',
      curriculumCompetency: 'Menganalisis hubungan antara bentuk tubuh satwa dengan adaptasi habitatnya, jaring-jaring makanan, dan pelestarian lingkungan (Kurikulum Merdeka IPAS Fase B & C).',
      activitiesList: [
        '07:45 - 08:00: Registrasi di Titik Kumpul & Pembagian Jurnal Naturalis',
        '08:00 - 08:20: Briefing Keselamatan, Misi Detektif Alam, & Ice Breaking Ramah Anak',
        '08:20 - 09:15: Eksplorasi Zona Herbivora & Primata (Pengamatan Ciri Fisik, Pola Makan, & Adaptasi)',
        '09:15 - 09:40: Misi Pencatatan Jurnal & Sketsa Pengamatan Satwa di Lapangan',
        '09:40 - 10:00: Lingkaran Refleksi, Diskusi Konsep IPA Sekolah, & Penyerahan Badge Misi'
      ],
      coordinators: [
        {
          name: 'Kak Nadia Rahma, S.Si.',
          role: 'Pemandu Eksplorasi Alam & Observasi Lapangan',
          background: 'S1 Matematika ITB, 5 tahun pengalaman memandu pembelajaran kontekstual & hands-on sains anak.',
          photoUrl: 'assets/images/tutor-nadia.jpg',
          tutorId: 'tutor-1'
        },
        {
          name: 'Kak Dimas Prasetyo, S.Pd.',
          role: 'Fasilitator Diskusi, Refleksi & Konseptualisasi Akademik IPA',
          background: 'S1 Pendidikan Fisika & IPA UNJ, spesialis perancangan aktivitas belajar aktif dan kurikulum sekolah.',
          photoUrl: 'assets/images/tutor-dimas.jpg',
          tutorId: 'tutor-2'
        }
      ],
      equipmentToBring: [
        'Sepatu kets atau sandal gunung yang nyaman untuk berjalan santai',
        'Topi pelindung panas & tumbler air minum pribadi',
        'Alat tulis sederhana (pensil / pulpen warna)',
        'Pakaian cadangan (opsional)'
      ],
      safetyInfo: 'Kegiatan diawasi secara ketat dengan rasio aman 1 guru per 6 anak. Dilengkapi kotak P3K standar, titik kumpul terkontrol, dan komunikasi aktif dengan orang tua selama sesi berlangsung.',
      coverPhotoUrl: 'assets/images/outdoor-ragunan.jpg',
      cancellationPolicy: {
        description: 'Kebijakan pembatalan fleksibel dan transparan untuk kenyamanan orang tua.',
        parentCancellationTiers: [
          { timeframe: 'H-3 sebelum tanggal kegiatan', refundPercentage: 80, notes: 'Pengembalian 80% (dipotong 20% biaya administrasi & logistik jurnal yang telah dicetak)' },
          { timeframe: 'H-1 sebelum tanggal kegiatan', refundPercentage: 50, notes: 'Pengembalian 50% karena persiapan tiket dan konsumsi telah difinalisasi' },
          { timeframe: 'Hari H (hari pelaksanaan)', refundPercentage: 0, notes: 'Tidak ada pengembalian dana karena kuota kursi tidak dapat dialihkan lagi' }
        ],
        organizerCancellationPolicy: 'Jika kegiatan dibatalkan oleh penyelenggara karena cuaca ekstrem atau faktor darurat, orang tua berhak memilih 100% refund penuh atau penjadwalan ulang ke tanggal berikutnya.',
        noShowPolicy: 'Peserta yang tidak hadir tanpa pemberitahuan sebelumnya tidak berhak atas refund.'
      }
    },
    {
      id: 'outdoor-geometri-tebet',
      title: 'Ekspedisi Geometri & Bentuk Alam — Tebet Eco Park',
      locationName: 'Tebet Eco Park, Jakarta Selatan',
      meetingPoint: 'Plaza Utara (Dekat Jembatan Infinity Link Bridge)',
      lat: -6.2372,
      lng: 106.8538,
      date: '22 November 2026',
      timeSlot: '08:30 – 10:30 WIB',
      durationMinutes: 120,
      capacityTotal: 10,
      capacityBooked: 7,
      pricePerChild: 125000,
      feeIncludes: [
        'Buku Panduan Detektif Geometri',
        'Pita Pengukur & Busur Derajat Lapangan (Dipinjamkan)',
        'Stiker Badge & Dokumentasi Foto Portofolio',
        'Pendampingan 2 Guru Spesialis'
      ],
      targetAudience: 'Anak usia 8–13 tahun (Kelas 3–7 SMP). Menghubungkan bentuk geometri daun, jembatan, dan sarang laba-laba dengan konsep matematika.',
      subject: 'Matematika (Geometri & Sudut)',
      curriculumCompetency: 'Mengidentifikasi bangun datar, sudut, simetri lipat, dan pola simetri fraktal di alam bebas.',
      activitiesList: [
        '08:15 - 08:30: Berkumpul di Plaza Utara & Pembagian Pita Ukur',
        '08:30 - 09:20: Berburu Pola Sudut & Simetri pada Infinity Bridge dan Daun Taman',
        '09:20 - 10:00: Pengukuran Luas & Keliling Area Rumput secara Nyata',
        '10:00 - 10:30: Refleksi & Pembuatan Peta Geometri Versi Anak'
      ],
      coordinators: [
        {
          name: 'Kak Nadia Rahma, S.Si.',
          role: 'Pemandu Eksplorasi Geometri Lapangan',
          background: 'S1 Matematika ITB.',
          photoUrl: 'assets/images/tutor-nadia.jpg',
          tutorId: 'tutor-1'
        },
        {
          name: 'Kak Dimas Prasetyo, S.Pd.',
          role: 'Fasilitator Diskusi & Hubungan Matematika Sekolah',
          background: 'S1 Pendidikan UNJ.',
          photoUrl: 'assets/images/tutor-dimas.jpg',
          tutorId: 'tutor-2'
        }
      ],
      equipmentToBring: ['Sepatu kets nyaman', 'Tumbler air minum', 'Topi'],
      safetyInfo: 'Area taman hijau ramah anak dengan jalur pedestrian tertata rapi.',
      coverPhotoUrl: 'assets/images/outdoor-tebet.jpg',
      cancellationPolicy: {
        description: 'Kebijakan refund standar Damping.',
        parentCancellationTiers: [
          { timeframe: 'H-3 sebelum kegiatan', refundPercentage: 80, notes: 'Refund 80%' },
          { timeframe: 'H-1 sebelum kegiatan', refundPercentage: 50, notes: 'Refund 50%' },
          { timeframe: 'Hari H', refundPercentage: 0, notes: 'Tidak ada refund' }
        ],
        organizerCancellationPolicy: '100% refund atau opsi jadwal alternatif jika cuaca buruk.',
        noShowPolicy: 'Tidak ada refund untuk peserta yang tidak hadir.'
      }
    },
    {
      id: 'outdoor-detektif-air-srengseng',
      title: 'Detektif Air & Keanekaragaman Hayati Hutan Kota',
      locationName: 'Hutan Kota Srengseng, Kembangan, Jakarta Barat',
      meetingPoint: 'Dermaga Danau Buatan Hutan Kota Srengseng',
      lat: -6.2081,
      lng: 106.7622,
      date: '29 November 2026',
      timeSlot: '08:00 – 10:00 WIB',
      durationMinutes: 120,
      capacityTotal: 8,
      capacityBooked: 6,
      pricePerChild: 140000,
      feeIncludes: [
        'Kit Uji Kejernihan Air Sederhana & Kertas Lakmus',
        'Jurnal Detektif Air Hutan Kota',
        'Dokumentasi & Portofolio Kurikulum'
      ],
      targetAudience: 'Anak usia 9–14 tahun (Kelas 4 SD – 2 SMP) yang gemar eksperimen air dan pelestarian alam.',
      subject: 'IPA (Sains Lingkungan & Kimia Dasar)',
      curriculumCompetency: 'Menguji sifat asam-basa air alami dan memahami siklus hidrologi perkotaan.',
      activitiesList: [
        '08:00 - 08:30: Pengambilan sampel air danau & uji lakmus warna',
        '08:30 - 09:30: Pengamatan serangga air bioindikator dan vegetasi mangrove darat',
        '09:30 - 10:00: Analisis temuan dan diskusi peran hutan kota bagi resapan air Jakarta'
      ],
      coordinators: [
        {
          name: 'Kak Budi Santoso, M.Si.',
          role: 'Pemandu Ekosistem Air & Pengambilan Sampel',
          background: 'S2 Biologi Unpad.',
          photoUrl: 'assets/images/tutor-budi.jpg',
          tutorId: 'tutor-4'
        },
        {
          name: 'Kak Dimas Prasetyo, S.Pd.',
          role: 'Fasilitator Diskusi & Hubungan Sains Kurikulum',
          background: 'S1 Pendidikan IPA UNJ.',
          photoUrl: 'assets/images/tutor-dimas.jpg',
          tutorId: 'tutor-2'
        }
      ],
      equipmentToBring: ['Sepatu antiselip', 'Baju ganti', 'Tumbler air'],
      safetyInfo: 'Dilengkapi pelampung pengaman di area bibir dermaga dan pengawasan 1 guru per 4 anak.',
      coverPhotoUrl: 'assets/images/outdoor-srengseng.jpg',
      cancellationPolicy: {
        description: 'Kebijakan refund standar Damping.',
        parentCancellationTiers: [
          { timeframe: 'H-3 sebelum kegiatan', refundPercentage: 80, notes: 'Refund 80%' },
          { timeframe: 'H-1 sebelum kegiatan', refundPercentage: 50, notes: 'Refund 50%' },
          { timeframe: 'Hari H', refundPercentage: 0, notes: 'Tidak ada refund' }
        ],
        organizerCancellationPolicy: '100% refund jika ada kendala cuaca ekstrem.',
        noShowPolicy: 'Tidak ada refund untuk peserta tidak hadir.'
      }
    }
  ],

  INITIAL_TICKETS: [
    {
      id: 'ticket-demo-1',
      bookingCode: 'DMP-RAG-2611-081',
      activityId: 'outdoor-naturalis-ragunan',
      activityTitle: 'Misi Naturalis — Mengenal Ekosistem & Adaptasi Satwa',
      activityDate: '15 November 2026',
      activityTime: '08:00 – 10:00 WIB',
      activityLocation: 'Taman Margasatwa Ragunan, Jakarta Selatan',
      meetingPoint: 'Pintu Masuk Barat (Dekat Pusat Primata Schmutzer)',
      parentName: 'Ibu Ratna Wardani',
      parentPhone: '0812-3456-7890',
      childrenNames: ['Farel Pratama (Kelas 5 SD)'],
      childCount: 1,
      pricePerChild: 150000,
      totalFee: 150000,
      status: 'terdaftar',
      bookingDate: '08 Okt 2026, 14:20 WIB',
      qrCodeDemo: 'QR-DMP-RAG-FAREL-2611',
      paymentSimulatedAt: '08 Okt 2026, 14:22 WIB'
    },
    {
      id: 'ticket-demo-past-1',
      bookingCode: 'DMP-TEB-2610-044',
      activityId: 'outdoor-geometri-tebet',
      activityTitle: 'Ekspedisi Geometri & Bentuk Alam — Tebet Eco Park',
      activityDate: '04 Oktober 2026',
      activityTime: '08:30 – 10:30 WIB',
      activityLocation: 'Tebet Eco Park, Jakarta Selatan',
      meetingPoint: 'Plaza Utara (Dekat Jembatan Infinity)',
      parentName: 'Ibu Ratna Wardani',
      parentPhone: '0812-3456-7890',
      childrenNames: ['Farel Pratama (Kelas 5 SD)'],
      childCount: 1,
      pricePerChild: 125000,
      totalFee: 125000,
      status: 'selesai',
      bookingDate: '28 Sep 2026, 10:15 WIB',
      qrCodeDemo: 'QR-DMP-TEB-FAREL-2610',
      paymentSimulatedAt: '28 Sep 2026, 10:16 WIB'
    }
  ],

  STUDENT_PORTFOLIOS: [
    {
      id: 'port-farel-ragunan',
      studentName: 'Farel Pratama',
      studentAccessCode: 'Z5C78E',
      activityId: 'outdoor-naturalis-ragunan',
      activityTitle: 'Misi Naturalis — Mengenal Ekosistem & Adaptasi Satwa',
      completionDate: '04 Oktober 2026',
      competencyAchievements: [
        'Mengidentifikasi 4 bentuk adaptasi morfologi paruh burung pemakan biji vs ikan',
        'Menganalisis hubungan rantai makanan produsen-konsumen di zona hutan tropis',
        'Mendokumentasikan data lapangan ke dalam jurnal pengamatan mandiri'
      ],
      photos: [
        'assets/images/portfolio-ragunan.jpg'
      ],
      observationNotes: [
        {
          coordinatorName: 'Kak Nadia Rahma, S.Si.',
          role: 'Pemandu Eksplorasi Alam',
          notes: 'Farel menunjukkan rasa ingin tahu yang sangat tinggi saat mengamati perilaku kera hitam Sulawesi. Farel mampu mengaitkan bentuk jari tangan primata dengan cara memanjat pohon sebelum diarahkan oleh guru.'
        },
        {
          coordinatorName: 'Kak Dimas Prasetyo, S.Pd.',
          role: 'Fasilitator Diskusi & Konsep Akademik',
          notes: 'Pada sesi refleksi akhir, Farel sangat aktif menjelaskan perbedaan herbivora dan karnivora di depan teman-temannya. Ia memiliki daya ingat visual yang kuat terhadap data yang dicatatnya di jurnal.'
        }
      ],
      strengths: [
        'Antusiasme belajar tinggi dan berani bertanya di lapangan',
        'Kekuatan pemahaman konsep visual dan spasial',
        'Kemampuan mencatat data pengamatan secara rapi'
      ],
      areasToDevelop: [
        'Perlu latihan menyusun kesimpulan dalam kalimat tertulis yang lebih sistematis',
        'Latihan menghubungkan hasil observasi langsung dengan tipe soal cerita ujian IPA sekolah'
      ],
      nextStepRecommendation: 'Direkomendasikan melanjutkan pendampingan les privat Matematika & Sains dengan pendekatan hands-on agar minat belajar yang terbangun di lapangan dapat memperkuat nilai akademik sekolahnya.',
      recommendedTutorId: 'tutor-1',
      recommendedProgramId: 'prog-1'
    }
  ],

  STUDENT_CODES: {
    'Z5C78E': {
      code: 'Z5C78E',
      studentName: 'Farel Pratama',
      parentName: 'Ibu Ratna Wardani',
      parentPhone: '0812-3456-7890',
      grade: 'Kelas 5 SD',
      school: 'SD Menteng 01 Jakarta Selatan',
      activeTutorId: 'tutor-1',
      activeTutorName: 'Kak Nadia Rahma, S.Si.',
      activeSubject: 'Matematika & Sains',
      upcomingSchedule: 'Rabu, 16:00 - 17:30 WIB (Tatap Muka di Rumah)',
      completedSessionsCount: 14,
      attendanceRate: '100% (14 dari 14 sesi hadir)',
      learningSummary: 'Farel sudah menguasai materi pecahan senilai dan perkalian desimal. Sesi saat ini fokus pada pemodelan soal cerita matematika dan persiapan ulangan tengah semester.',
      completedActivities: ['outdoor-naturalis-ragunan', 'outdoor-geometri-tebet'],
      recentActivityPortfolioId: 'port-farel-ragunan'
    },
    'NF8821': {
      code: 'NF8821',
      studentName: 'Aisyah Putri',
      parentName: 'Ibu Widya Astuti',
      parentPhone: '0813-8899-7711',
      grade: 'Kelas 9 SMP',
      school: 'SMP Labschool Kebayoran Jakarta Selatan',
      activeTutorId: 'tutor-2',
      activeTutorName: 'Kak Dimas Prasetyo, S.Pd. (via Bimbel Nurul Fikri)',
      activeSubject: 'Matematika SMP',
      upcomingSchedule: 'Kamis, 16:00 - 17:30 WIB (Cabang Kemang)',
      completedSessionsCount: 20,
      attendanceRate: '95% (19 dari 20 sesi hadir)',
      learningSummary: 'Aisyah menunjukkan pemahaman kuat pada aljabar dan persamaan linier. Saat ini masuk materi persamaan kuadrat dan persiapan tes seleksi SMA.',
      completedActivities: [],
      recentActivityPortfolioId: null
    }
  },

  INITIAL_REQUESTS: [
    {
      id: 'req-1',
      targetType: 'guru_privat',
      targetId: 'tutor-1',
      targetName: 'Kak Nadia Rahma, S.Si.',
      targetPhoto: 'assets/images/tutor-nadia.jpg',
      studentName: 'Farel Pratama',
      parentName: 'Ibu Ratna Wardani',
      parentPhone: '0812-3456-7890',
      subject: 'Matematika',
      level: 'SD',
      method: 'tatap_muka',
      preferredDay: 'Rabu',
      preferredTimeSlot: '16:00 - 17:30',
      parentLocationName: 'Tebet, Jakarta Selatan',
      meetingNotes: 'Mohon dibantu penguatan soal cerita pecahan dan persiapan ulangan tengah semester.',
      totalFee: 110000,
      createdAt: '10 Okt 2026, 09:30 WIB',
      status: 'DITERIMA',
      tutorResponseNote: 'Permintaan les diterima. Saya akan hadir sesuai jadwal di rumah Ibu Ratna.',
      respondedAt: '10 Okt 2026, 11:15 WIB',
      studentAccessCode: 'Z5C78E'
    }
  ]
};
