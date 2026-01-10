Mohon check video di bawah untuk check hasil websitenya

https://github.com/user-attachments/assets/29ecc2f0-59ab-4e97-bb4a-2c140088b99c


Cara Menjalankan Project Lokal

1️⃣ Backend / API (Next.js API)
cd api
npm install        # kalau belum install dependencies
npm run dev        # jalankan server API


Default berjalan di http://localhost:3000

Semua request Next.js API akan di-handle di sini

2️⃣ Frontend / Website (Next.js App)
cd website
npm install        # kalau belum install dependencies
npm run dev        # jalankan website


Default berjalan di http://localhost:3001 (atau port lain jika diubah)

Akan mengambil data dari API server di langkah 1

3️⃣ Model / Machine Learning (Python Flask)
cd model
python3 -m venv venv       # buat virtual environment (jika belum)
source venv/bin/activate    # aktifkan venv
pip install -r requirements.txt   # install semua package
python3 server.py           # jalankan server ML


Flask server default di http://localhost:5000 Digunakan untuk predict harga rumah

4️⃣ Akses Website

Buka browser → http://localhost:3001/

Home → input house size → klik predict → hasil muncul

Dashboard → ringkasan data

History → lihat data lengkap

💡 Tips penting:

Pastikan API (localhost:3000) dan ML model (localhost:5000) jalan sebelum akses website.

Kalau port bentrok, bisa ganti port di package.json / server.py.
