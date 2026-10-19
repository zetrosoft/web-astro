import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Direktori output artikel blog
const blogDirId = path.join(rootDir, 'packages/bijak/src/content/blog');
const blogDirEn = path.join(rootDir, 'packages/bijak/src/content/blog_en');

// Katalog Topik Editorial Terjadwal (3x Sehari)
const TOPICS = {
  pagi: [
    {
      slug: 'pusat-grosir-eceran-sembako-karanggeneng-boyolali-toko-kusuma',
      category: 'Local SEO',
      tags: ['Toko Sembako Kusuma', 'Boyolali', 'Sembako', 'Grosir Sembako', 'UMKM', 'Karanggeneng'],
      title: 'Pusat Grosir & Eceran Sembako di Karanggeneng Boyolali: Cara Toko Sembako Kusuma Melayani Pesanan Cepat WhatsApp & Pengadaan Warung',
      titleEn: 'Wholesale & Retail Staple Food Hub in Karanggeneng Boyolali: How Toko Sembako Kusuma Delivers Rapid WhatsApp Ordering & Grocery Supply',
      focus: 'Toko Sembako Kusuma di Jl. Sandang Lawe No.22, Dusun 1, Karanggeneng, Boyolali. Kecepatan order via WhatsApp, pasokan beras C4, minyak goreng, gula, tepung, telur, dan jangkauan kirim radius 20 km.'
    },
    {
      slug: 'strategi-harga-bertingkat-promo-bundling-sembako-toko-kusuma-boyolali',
      category: 'Local SEO',
      tags: ['Toko Sembako Kusuma', 'Boyolali', 'Sembako', 'Grosir Sembako', 'Kulakan Warung', 'Harga Grosir'],
      title: 'Strategi Harga Bertingkat (Tiered Pricing) & Promo Bundling Sembako di Toko Kusuma Boyolali untuk Pelaku Usaha Warung',
      titleEn: 'Tiered Pricing Strategy & Staple Food Bundling at Toko Kusuma Boyolali for Corner Grocery Entrepreneurs',
      focus: 'Cara Toko Sembako Kusuma Karanggeneng Boyolali memberikan harga bertingkat untuk warung kulakan partai besar (beras karungan, minyak kartonan) agar margin keuntungan warung tetap terjaga.'
    },
    {
      slug: 'panduan-belanja-paket-sembako-hajatan-katering-kulakan-warung-boyolali',
      category: 'Local SEO',
      tags: ['Toko Sembako Kusuma', 'Boyolali', 'Sembako Hajatan', 'Katering Boyolali', 'Karanggeneng'],
      title: 'Panduan Belanja Paket Sembako Hajatan, Katering, & Kulakan Warung di Area Boyolali (Karanggeneng, Mojosongo, Teras, Banyudono)',
      titleEn: 'Comprehensive Procurement Guide for Event Catering, Festive Packages, & Retail Grocery in Boyolali',
      focus: 'Paket sembako hajatan, syukuran, dan pasokan dapur katering pernikahan di Boyolali. Penimbangan presisi beras dan minyakita, pemesanan praktis via WhatsApp Toko Kusuma Jl. Sandang Lawe No.22 Karanggeneng.'
    },
    {
      slug: 'cara-toko-sembako-kusuma-boyolali-menjaga-stok-beras-gula-selalu-ready',
      category: 'Local SEO',
      tags: ['Toko Sembako Kusuma', 'Boyolali', 'Manajemen Stok', 'Beras Boyolali', 'Karanggeneng'],
      title: 'Cara Toko Sembako Kusuma Boyolali Menjaga Stok Beras & Gula Selalu Ready Tanpa Takut Fluktuasi Pasar',
      titleEn: 'How Toko Sembako Kusuma Boyolali Maintains Steady Rice & Sugar Inventories Amid Market Volatility',
      focus: 'Manajemen perputaran stok komoditas pokok di gudang Karanggeneng Boyolali, menjaga mutu beras C4 & Rojolele higienis dan kering, serta komitmen harga stabil bagi pembeli.'
    },
    {
      slug: 'rumus-proyeksi-arus-kas-30-hari-toko-grosir-sembako-boyolali',
      category: 'Local SEO',
      tags: ['Toko Sembako Kusuma', 'Boyolali', 'Arus Kas Toko', 'Manajemen Usaha', 'Sembako'],
      title: 'Rumus Pengelolaan Arus Kas 30 Hari Toko Sembako agar Modal Kulakan Tidak Macet Saat Jatuh Tempo Supplier',
      titleEn: '30-Day Cashflow Management Formula for Grocery Wholesalers to Avoid Procurement Bottlenecks',
      focus: 'Tips realistis mengelola cash flow kulakan sembako untuk pemilik warung di Boyolali, rasio perputaran persediaan barang cepat laku (fast-moving), dan belanja terencana di Toko Kusuma Karanggeneng.'
    }
  ],
  siang: [
    {
      slug: 'arsitektur-erpnext-v16-distribusi-manufaktur-vps-kvm',
      category: 'ERPNext',
      tags: ['ERPNext', 'Frappe Framework', 'Cloud VPS', 'Docker', 'Distribusi', 'Database'],
      title: 'Arsitektur ERPNext v16 untuk Perusahaan Distribusi: Panduan Skalabilitas, Kedaulatan Data, dan Deployment Docker di VPS KVM',
      titleEn: 'ERPNext v16 Architecture for Distribution Companies: Scalability, Data Sovereignty, and Docker Deployment Guide on KVM VPS',
      focus: 'Frappe Framework v16, open-source GNU GPL v3, kedaulatan data private cloud, simulasi TCO 3 tahun tanpa lisensi per-user, implementasi ahli bersama Samkarsa.com.'
    },
    {
      slug: 'bedah-tco-5-tahun-implementasi-erpnext-enterprise-perusahaan',
      category: 'ERPNext',
      tags: ['ERPNext', 'Frappe Framework', 'Enterprise ERP', 'Biaya ERP', 'Samkarsa'],
      title: 'Bedah Total Cost of Ownership (TCO) 5 Tahun: Implementasi ERPNext Enterprise untuk Perusahaan dengan 50+ Karyawan',
      titleEn: '5-Year Total Cost of Ownership (TCO) Analysis: ERPNext Enterprise Implementation for 50+ User Corporations',
      focus: 'Kalkulasi rinci efisiensi ERPNext open source versus software berbayar per-user, penghematan ratusan juta rupiah untuk perusahaan manufaktur dan distribusi, didampingi implementor Samkarsa.com.'
    },
    {
      slug: 'kapan-harus-memakai-pos-ritel-vs-naik-kelas-ke-erpnext-enterprise',
      category: 'ERPNext',
      tags: ['ERPNext', 'Frappe Framework', 'Software Bisnis', 'ERP Indonesia', 'Samkarsa'],
      title: 'Kapan Perusahaan Harus Naik Kelas ke ERPNext Enterprise? Indikator Kesiapan Sistem dan Rantai Pasok',
      titleEn: 'When Should Your Enterprise Upgrade to ERPNext? Key Readiness Indicators for Supply Chain Scaling',
      focus: 'Tanda-tanda bisnis perlu beralih dari pencatatan kasir konvensional/spreadsheet ke sistem ERP terintegrasi: rekonsiliasi multi-gudang, audit trail akuntansi PSAK, dan integrasi Samkarsa.com.'
    },
    {
      slug: 'otomatisasi-laporan-keuangan-neraca-dan-rekonsiliasi-pajak-erpnext',
      category: 'ERPNext',
      tags: ['ERPNext', 'Frappe Framework', 'Akuntansi', 'Faktur Pajak', 'Samkarsa'],
      title: 'Otomatisasi Laporan Keuangan, Neraca, dan Rekonsiliasi Pajak di ERPNext v16: Akurasi Finansial Tanpa Silo Data',
      titleEn: 'Automating Financial Reports, Balance Sheets, and Tax Reconciliation in ERPNext v16',
      focus: 'Modul akuntansi Frappe ERPNext v16, kepatuhan PSAK Indonesia, buku besar perpetual, integrasi faktur pajak, dan pendampingan setup akuntansi oleh Samkarsa.com.'
    },
    {
      slug: 'panduan-modul-manufaktur-bom-work-order-erpnext-jawa-tengah',
      category: 'ERPNext',
      tags: ['ERPNext', 'Frappe Framework', 'Manufaktur', 'Pabrik', 'Samkarsa'],
      title: 'Panduan Modul Manufaktur (BOM, Work Order, Subcontracting) di ERPNext: Solusi Efisiensi Pabrik Modern',
      titleEn: 'ERPNext Manufacturing Module Guide (BOM, Work Orders, Subcontracting): Modern Factory Efficiency',
      focus: 'Penerapan Bill of Materials (BOM), pengendalian biaya bahan baku, pencatatan WIP (Work In Progress), dan penjadwalan produksi pabrik bersama Samkarsa.com.'
    }
  ],
  malam: [
    {
      slug: 'panduan-lengkap-real-world-asset-rwa-tokenization',
      category: 'Cloud VPS',
      tags: ['Avalanche', 'Web3', 'RWA', 'Smart Contract', 'Blockchain'],
      title: 'Panduan Lengkap Real World Asset (RWA) Tokenization di Avalanche C-Chain',
      titleEn: 'Comprehensive Guide to Real World Asset (RWA) Tokenization on Avalanche C-Chain',
      focus: 'Tokenisasi aset komoditas fisik, kepatuhan regulasi, smart contract Avalanche C-Chain, dan integrasi VPS backend.'
    },
    {
      slug: 'cara-self-host-erpnext-v16-produksi-hostinger-vps-kvm-docker',
      category: 'Cloud VPS',
      tags: ['Hostinger', 'Cloud VPS', 'ERPNext', 'Docker', 'DevOps'],
      title: 'Cara Self-Host ERPNext v16 Produksi di Hostinger VPS KVM 4: Setup Docker, Nginx, dan MariaDB Tuning',
      titleEn: 'How to Self-Host Production ERPNext v16 on Hostinger KVM 4 VPS: Docker, Nginx, and MariaDB Tuning',
      focus: 'Tutorial deployment mandiri ERPNext v16 menggunakan Docker Compose di Hostinger KVM 4 VPS. Alokasi innodb_buffer_pool_size, Redis, link referral Hostinger (6X5PUTERARQL) dan kupon 6X5PUTERARQL.'
    },
    {
      slug: 'membangun-l1-blockchain-kustom-avalanche-subnets-teleporter',
      category: 'Cloud VPS',
      tags: ['Avalanche', 'Blockchain', 'Web3', 'Subnet', 'Teleporter'],
      title: 'Membangun L1 Blockchain Kustom untuk Supply Chain Menggunakan Avalanche Subnets & Teleporter (ICM)',
      titleEn: 'Building Custom L1 Blockchains for Supply Chains with Avalanche Subnets & Teleporter (ICM)',
      focus: 'Arsitektur Avalanche Subnet / L1 berdaulat untuk pencatatan rantai pasok perusahaan, komunikasi lintas-rantai Teleporter ICM, dan deployment validator node di Hostinger VPS KVM.'
    },
    {
      slug: 'cara-self-host-n8n-ai-agent-otomatisasi-bisnis-hostinger-vps',
      category: 'Cloud VPS',
      tags: ['Hostinger', 'Cloud VPS', 'n8n', 'AI Agent', 'Docker'],
      title: 'Cara Self-Host n8n & AI Agent Otomatisasi Bisnis di Hostinger VPS KVM: Eksekusi Tanpa Batas Kuota',
      titleEn: 'How to Self-Host n8n & Business Automation AI Agents on Hostinger KVM VPS: Unlimited Workflows',
      focus: 'Panduan deploy n8n queue mode dengan PostgreSQL dan Redis di Hostinger KVM 2 VPS (kupon 6X5PUTERARQL), mengotomatisasi webhook notifikasi WhatsApp dan sinkronisasi data tanpa tagihan bulanan mahal.'
    },
    {
      slug: 'implementasi-semantic-product-search-postgresql-pgvector-mcp',
      category: 'Cloud VPS',
      tags: ['Hostinger', 'Cloud VPS', 'PostgreSQL', 'pgvector', 'AI', 'MCP'],
      title: 'Implementasi Semantic Product Search Menggunakan PostgreSQL pgvector dan MCP Server di VPS Linux',
      titleEn: 'Implementing Semantic Product Search Using PostgreSQL pgvector and MCP Server on Linux VPS',
      focus: 'Pencarian semantik katalog produk e-commerce/grosir berbasis vektor embedding dengan pgvector di PostgreSQL 16, arsitektur Model Context Protocol (MCP), dan optimasi memori VPS.'
    }
  ]
};

// Deteksi slot waktu berdasarkan jam WIB (UTC + 7)
function getCurrentSlot() {
  const now = new Date();
  // Hitung jam WIB (UTC + 7)
  const utcHours = now.getUTCHours();
  const wibHours = (utcHours + 7) % 24;

  if (wibHours >= 4 && wibHours < 10) {
    return 'pagi'; // 05:30 slot target
  } else if (wibHours >= 10 && wibHours < 16) {
    return 'siang'; // 11:30 slot target
  } else {
    return 'malam'; // 19:00 slot target
  }
}

// Cek apakah artikel sudah ada di folder blog
function isArticleExists(slug) {
  const fileId = path.join(blogDirId, `${slug}.mdx`);
  const fileMd = path.join(blogDirId, `${slug}.md`);
  return fs.existsSync(fileId) || fs.existsSync(fileMd);
}

// Panggil Google Gemini API untuk generate konten bilingual
async function generateArticleWithGemini(topic, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const systemInstructions = `
Anda adalah Senior Technical Writer dan Business Architect untuk portal Bijak Technology (bijaktechnology.com).
Tulis artikel berkualitas tinggi, faktual, berbasis data konkret, dan ramah SEO manusia (SOP Anti-AI).

ATURAN WAJIB & NON-NEGOTIABLE:
1. GAYA BAHASA: Lugas, solutif, profesional, scannable (gunakan bullet point, bold, dan tabel perbandingan jika relevan).
   - DILARANG menggunakan kata klise AI: "Di era digital yang serba cepat...", "Menyelami lebih dalam...", "Tak dapat dipungkiri...", "Bagai pisau bermata dua...".
   - DILARANG menggunakan buzzword seperti "Marketing 5.0" atau "Marketing 4.0".
2. PILAR EKOSISTEM:
   - Jika topik Toko Sembako Kusuma (Local SEO): Wajib menyertakan alamat fisik lengkap: "Jl. Sandang Lawe No.22, Dusun 1, Karanggeneng, Kec. Boyolali, Kabupaten Boyolali, Jawa Tengah 57312" dan tautan Google Maps (https://maps.app.goo.gl/bGB7vToeteyAgr7MA), layanan pesanan cepat via WhatsApp, pasokan komoditas beras C4/Rojolele, minyak goreng, gula pasir, tepung terigu, telur, serta jangkauan radius 20 km. Dilarang menampilkan card Blonjo.
   - Jika topik ERPNext (B2B): Wajib mengedepankan lisensi open-source GNU GPL v3, kedaulatan data private cloud, eliminasi biaya lisensi per-user, dan rujukan mitra implementor terpercaya Samkarsa (https://samkarsa.com). DILARANG mendowngrade produk lain dan TIDAK menyebut nama kompetitor secara eksplisit.
   - Jika topik Cloud VPS / Tech / Web3: Rekomendasikan inline Hostinger KVM VPS dengan link referral (https://www.hostinger.com/id?REFERRALCODE=6X5PUTERARQL) dan kupon diskon 6X5PUTERARQL. Jika topik blockchain, standarnya selalu Avalanche Blockchain (C-Chain, Subnets/L1, Teleporter ICM).
3. STRUKTUR ARTIKEL (MDX):
   - Gunakan heading level 2 (##) dan level 3 (###).
   - Panjang artikel: 700 - 1000 kata per bahasa.
   - Sisipkan gambar Unsplash relevan di bagian atas artikel.
   - Hasilkan versi Bahasa Indonesia dan Bahasa Inggris yang sepadan dan akurat.
4. FORMAT OUTPUT: JSON murni (JSON Schema) persis:
{
  "id": {
    "title": "Judul Bahasa Indonesia yang memikat dan mengandung keyword utama",
    "description": "Meta description Bahasa Indonesia 150-160 karakter",
    "content": "Isi lengkap artikel Markdown/MDX dalam Bahasa Indonesia (tanpa frontmatter)"
  },
  "en": {
    "title": "Compelling English title with primary search intent",
    "description": "English meta description 150-160 characters",
    "content": "Complete Markdown/MDX article body in English (without frontmatter)"
  }
}
`;

  const prompt = `
Silakan buat artikel publikasi terjadwal berdasarkan data berikut:
- Slot: ${topic.slot}
- Slug: ${topic.slug}
- Kategori: ${topic.category}
- Tagar: ${JSON.stringify(topic.tags)}
- Judul ID Rujukan: ${topic.title}
- Judul EN Rujukan: ${topic.titleEn}
- Fokus & Detail Kontekstual: ${topic.focus}

Kirimkan respon HANYA dalam format JSON valid sesuai skema yang diminta.
`;

  const payload = {
    contents: [
      { parts: [{ text: systemInstructions + '\n\n' + prompt }] }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7
    }
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawJson) {
    throw new Error('Gemini API did not return text content.');
  }

  return JSON.parse(rawJson);
}

// Simpan file MDX
function saveArticleFiles(topic, generatedData) {
  const today = new Date().toISOString().split('T')[0];

  const frontmatterId = `---
title: ${JSON.stringify(generatedData.id.title)}
description: ${JSON.stringify(generatedData.id.description)}
pubDate: ${today}
author: "zetrosoft"
category: ${JSON.stringify(topic.category)}
tags: ${JSON.stringify(topic.tags)}
---

${generatedData.id.content.trim()}
`;

  const frontmatterEn = `---
title: ${JSON.stringify(generatedData.en.title)}
description: ${JSON.stringify(generatedData.en.description)}
pubDate: ${today}
author: "zetrosoft"
category: ${JSON.stringify(topic.category)}
tags: ${JSON.stringify(topic.tags)}
---

${generatedData.en.content.trim()}
`;

  const pathId = path.join(blogDirId, `${topic.slug}.mdx`);
  const pathEn = path.join(blogDirEn, `${topic.slug}.mdx`);

  fs.writeFileSync(pathId, frontmatterId, 'utf-8');
  fs.writeFileSync(pathEn, frontmatterEn, 'utf-8');

  console.log(`✅ File ID berhasil disimpan: ${pathId}`);
  console.log(`✅ File EN berhasil disimpan: ${pathEn}`);
}

async function main() {
  // Ambil argumen CLI jika ada
  const args = process.argv.slice(2);
  let requestedSlot = null;
  let force = false;

  for (const arg of args) {
    if (arg.startsWith('--slot=')) {
      requestedSlot = arg.split('=')[1];
    } else if (arg === '--force') {
      force = true;
    }
  }

  const slot = requestedSlot || getCurrentSlot();
  console.log(`🕒 Waktu eksekusi: ${new Date().toISOString()} (Slot terpilih: ${slot.toUpperCase()})`);

  const topicList = TOPICS[slot] || [];
  if (topicList.length === 0) {
    console.log(`⚠️ Tidak ada topik yang terdaftar untuk slot: ${slot}`);
    process.exit(0);
  }

  // Cari topik berikutnya yang belum ada filenya
  let targetTopic = null;
  for (const t of topicList) {
    if (!isArticleExists(t.slug) || force) {
      targetTopic = { ...t, slot };
      break;
    }
  }

  if (!targetTopic) {
    console.log(`🎉 Seluruh topik untuk slot "${slot}" sudah dipublikasikan. Tidak ada artikel baru yang perlu digenerate.`);
    process.exit(0);
  }

  console.log(`📝 Topik yang akan digenerate: "${targetTopic.title}" (slug: ${targetTopic.slug})`);

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: GEMINI_API_KEY atau GOOGLE_API_KEY tidak ditemukan di environment variable.');
    process.exit(1);
  }

  try {
    console.log('🤖 Menghubungi Google Gemini 2.5 Flash API...');
    const result = await generateArticleWithGemini(targetTopic, apiKey);

    console.log('💾 Menyimpan berkas artikel bilingual...');
    saveArticleFiles(targetTopic, result);

    console.log('✨ Sukses! Artikel baru siap untuk dikompilasi dan dideploy.');
  } catch (err) {
    console.error('❌ Gagal menghasilkan artikel:', err);
    process.exit(1);
  }
}

main();
