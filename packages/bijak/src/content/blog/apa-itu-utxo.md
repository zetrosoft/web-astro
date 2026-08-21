---
title: "Apa itu UTXO? Konsep Dasar Transaksi Blockchain"
description: "Panduan memahami model Unspent Transaction Output (UTXO) yang digunakan oleh Bitcoin dan Avalanche, serta perbandingannya dengan model Akun."
pubDate: 2026-04-18
author: "zetrosoft"
category: "Blockchain"
tags: ["UTXO", "Bitcoin", "Avalanche", "Kriptografi"]
---

Bagi Anda yang baru memasuki dunia blockchain dan cryptocurrency, istilah **UTXO** mungkin terdengar asing. UTXO adalah singkatan dari **Unspent Transaction Output** (Output Transaksi yang Belum Dibelanjakan). Konsep ini merupakan salah satu pilar utama keamanan dan akuntansi dalam jaringan seperti Bitcoin, Litecoin, dan struktur X-Chain milik Avalanche.

### Analogi Sederhana: Kumpulan Kupon Fisik

Model UTXO dapat diibaratkan seperti mengelola dan memanfaatkan kumpulan kupon unik yang belum terpakai untuk melakukan transaksi. 

Bayangkan Anda memiliki dompet fisik yang berisi beberapa lembar uang kertas:
- Satu lembar Rp50.000
- Satu lembar Rp20.000
- Satu lembar Rp10.000

Total saldo Anda adalah Rp80.000. Jika Anda ingin membeli buku seharga Rp60.000, Anda tidak bisa "memotong" uang kertas Rp50.000 menjadi Rp30.000 dan Rp20.000. 

Sebaliknya, Anda memberikan lembaran Rp50.000 dan Rp20.000 (total Rp70.000) kepada kasir. Kasir kemudian akan memberikan Anda uang kembalian sebesar Rp10.000. Di akhir transaksi, dompet Anda kini berisi:
- Satu lembar Rp10.000 (dari awal yang tidak terpakai)
- Satu lembar Rp10.000 (uang kembalian dari kasir)

Konsep inilah yang disebut UTXO. Setiap lembar uang kertas adalah satu UTXO.

### Cara Kerja UTXO di Blockchain

Dalam database blockchain, tidak ada tabel kolom "Saldo Akun" yang menyatakan bahwa Dompet A memiliki saldo 1 BTC. Yang ada adalah daftar seluruh UTXO yang dikaitkan dengan alamat dompet Anda.

Ketika Anda mengirim kripto:
1. Dompet Anda memilih beberapa UTXO yang jumlahnya cukup untuk transaksi tersebut (**Inputs**).
2. Transaksi tersebut menghancurkan UTXO input tersebut dan menciptakan UTXO baru (**Outputs**): satu untuk penerima, dan satu lagi kembali ke alamat Anda sebagai uang kembalian (*change*).
