# Bijak Technology — Portal Editorial Koran Premium (Astro 7)

Repositori ini memuat kode sumber website **Bijak Technology** yang telah dimigrasikan dari WordPress ke platform static-first **Astro 7** dengan gaya desain editorial koran klasik yang premium (*newspaper-grade high-contrast layout*), terinspirasi dari layout *Daily*.

## 🛠️ Spesifikasi Teknologi

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Core Framework** | [Astro 7.0](https://astro.build) | Static Site Generator super cepat dengan modul kompilasi Rust. |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com) | Framework utilitas CSS untuk tata letak Grid & visual modern. |
| **Content Engine** | [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) | Pengolah tipe konten terstruktur aman (Markdown/MDX). |
| **Package Manager** | [pnpm](https://pnpm.io) | Pengelola modul cepat dan hemat ruang disk. |

---

## 📂 Struktur Proyek

```text
/Users/user/kerjaan/web-astro/
├── src/
│   ├── content/
│   │   └── blog/            # Berkas tulisan artikel Markdown (.md)
│   ├── data/
│   │   └── projects.json    # Metadata database portofolio proyek
│   ├── layouts/
│   │   └── Layout.astro     # Bingkai layout utama koran & navigasi
│   └── pages/
│       ├── about.astro      # Halaman profil visi & misi
│       ├── contact.astro    # Formulir & info korespondensi
│       ├── project.astro    # Halaman pameran portofolio
│       ├── blog/
│       │   ├── index.astro  # Arsip berita & filter kategori
│       │   └── [id].astro   # Detail artikel blog dinamis
│       └── index.astro      # Headline portal koran utama (Home)
├── tailwind.config.mjs      # Aturan utility class Tailwind CSS
├── astro.config.mjs         # Integrasi Astro & modul MDX + Tailwind
└── package.json
```

---

## 🚀 Perintah Dasar Terminal

Gunakan perintah di bawah ini dari folder root proyek untuk mengelola situs:

### 1. Memulai Server Pengembangan (Dev Mode)
Menjalankan server lokal dengan fitur hot-reload cepat di [http://localhost:4321](http://localhost:4321):
```bash
pnpm run dev
```

### 2. Kompilasi Produksi (Static Build)
Membundel seluruh halaman menjadi file HTML/CSS statis siap saji di dalam direktori `./dist/`:
```bash
pnpm run build
```

### 3. Pratinjau Hasil Kompilasi
Menjalankan server lokal khusus untuk menguji hasil build produksi:
```bash
pnpm run preview
```

---

## ✍️ Cara Menambahkan Artikel Baru
Cukup buat berkas Markdown (`.md` atau `.mdx`) baru di dalam folder `src/content/blog/` dengan skema data berikut pada bagian atas file (Frontmatter):

```markdown
---
title: "Judul Berita Anda"
description: "Ringkasan penjelasan berita yang memikat pembaca."
pubDate: 2026-07-09
author: "Nama Penulis"
category: "Blockchain" # Pilihan: Blockchain, AI, Programming, Social Mining
tags: ["Tag1", "Tag2"]
---
Konten artikel Anda ditulis di sini menggunakan format Markdown standar...
```
Jaringan otomatis akan mendeteksi, melakukan validasi tipe data secara ketat, dan mempublikasikannya langsung ke dalam layout koran utama.
