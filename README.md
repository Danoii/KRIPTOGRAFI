# KRIPTOGRAFI

Web Enkripsi Kriptografi
Program ini adalah aplikasi berbasis web untuk mengenkripsi dan mendekripsi teks menggunakan berbagai algoritma kriptografi, termasuk:

1. Vigenère Cipher
2. Auto-Key Vigenère Cipher
3. Playfair Cipher
4. Hill Cipher
5. Super Encryption (gabungan Vigenère dan transposisi kolom)
   
  Fitur Utama
1. Input pesan berupa teks dari pengguna.
2. Enkripsi dan dekripsi dengan kunci bebas.
3. Teks terenkripsi dan terdekripsi ditampilkan dalam format Base64.
4. Menyimpan cipherteks dalam bentuk file biner.
5. Mendukung input dari file untuk enkripsi.

  Persyaratan
1. Anda membutuhkan web browser modern seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge.
2. Program ini ditulis dengan menggunakan JavaScript, HTML, dan CSS. Tidak diperlukan server backend untuk menjalankan program.

  Struktur Folder
index.html     # File halaman depan
style.css      # File CSS 
app.js         # Logika js
ciphers.js     # Algoritma enkripsi dan dekripsi

  Cara Menjalankan Program
1. Unduh kode sumber
2. Anda bisa mengunduh semua file dari repository atau salin seluruh struktur proyek di atas ke komputer lokal Anda.
3. Setelah unduhan selesai, navigasi ke folder tempat Anda menyimpan file.
4. Klik dua kali file index.html untuk membukanya di browser. Tidak perlu menjalankan server web karena ini adalah aplikasi berbasis client-side.
5. Buka file index.html di browser

  Cara Menggunakan Aplikasi

1. Masukkan teks yang ingin Anda enkripsi ke dalam area input "Input Teks".
2. Masukkan kunci untuk enkripsi di kolom "Key".
3. Pilih jenis cipher yang ingin digunakan dari menu dropdown "Cipher Type".
4. Klik tombol "Encrypt" untuk mengenkripsi teks, atau "Decrypt" untuk mendekripsi teks.
5. Hasil enkripsi/dekripsi akan ditampilkan di area "Output Text (Base64)".
6. Anda juga bisa mengunduh ciphertext ke dalam file biner dengan mengklik tombol "Save Ciphertext to File".

  Menggunakan Inputan dari sebuah File

1. Anda bisa memilih file untuk dienkripsi menggunakan tombol "Choose File".
2. Program ini akan membaca isi file dan mengenkripsinya menggunakan algoritma yang Anda pilih.
   
  Catatan
Hanya huruf alfabet yang akan dienkripsi. Angka, spasi, dan tanda baca akan diabaikan selama proses enkripsi dan dekripsi. Untuk Hill Cipher, kunci yang dimasukkan harus berbentuk matriks persegi yang valid (panjang kunci harus sesuai dengan aturan cipher).
