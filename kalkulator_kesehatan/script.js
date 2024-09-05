// Fungsi untuk menghitung BMR berdasarkan Harris-Benedict Equation
function hitungBMR(tinggi, berat, usia, gender) {
    if (gender === "L") { // Laki-laki
        return 88.362 + (13.397 * berat) + (4.799 * tinggi) - (5.677 * usia);
    } else if (gender === "P") { // Perempuan
        return 447.593 + (9.247 * berat) + (3.098 * tinggi) - (4.330 * usia);
    }
    return 0;
}

// Fungsi untuk menghitung IMT
function hitungIMT(berat, tinggi) {
    let tinggiMeter = tinggi / 100;
    return berat / (tinggiMeter * tinggiMeter);
}

// Fungsi untuk menghitung berat badan minimal dan maksimal berdasarkan IMT normal (18.5 - 24.9)
function hitungBeratIdeal(tinggi) {
    let tinggiMeter = tinggi / 100;
    let beratMin = 18.5 * (tinggiMeter * tinggiMeter);
    let beratMax = 24.9 * (tinggiMeter * tinggiMeter);
    return { beratMin, beratMax };
}

// Fungsi untuk menghitung kebutuhan air per hari berdasarkan berat badan
function hitungKebutuhanAir(berat) {
    return berat * 0.035; // 35ml air per kg berat badan
}

// Fungsi untuk mengecek status obesitas dan resiko kesehatan
function cekStatusKesehatan(IMT) {
    if (IMT < 18.5) {
        return "Berat badan kurang.";
    } else if (IMT >= 18.5 && IMT < 25) {
        return "Berat badan normal.";
    } else if (IMT >= 25 && IMT < 30) {
        return "Berat badan berlebih (Overweight).";
    } else if (IMT >= 30 && IMT < 35) {
        return "Obesitas Kelas 1.";
    } else if (IMT >= 35 && IMT < 40) {
        return "Obesitas Kelas 2.";
    } else {
        return "Obesitas Kelas 3 (Ekstrem).";
    }
}

// Fungsi utama untuk menghitung kesehatan berdasarkan input pengguna
function hitungKesehatan() {
    let nama = document.getElementById("nama").value;
    let tinggi = parseInt(document.getElementById("tinggi").value);
    let berat = parseInt(document.getElementById("berat").value);
    let usia = parseInt(document.getElementById("usia").value);
    let gender = document.getElementById("gender").value;

    let BMR = hitungBMR(tinggi, berat, usia, gender);
    let IMT = hitungIMT(berat, tinggi);
    let beratIdeal = hitungBeratIdeal(tinggi);
    let kebutuhanAir = hitungKebutuhanAir(berat);
    let statusKesehatan = cekStatusKesehatan(IMT);

    // Menampilkan hasil
    let result = `
        <h2>Hasil Perhitungan</h2>
        <p>Nama: ${nama}</p>
        <p>BMR Anda: ${BMR.toFixed(2)} kalori/hari</p>
        <p>IMT Anda: ${IMT.toFixed(2)}</p>
        <p>Berat ideal Anda: ${beratIdeal.beratMin.toFixed(2)} kg - ${beratIdeal.beratMax.toFixed(2)} kg</p>
        <p>Kebutuhan air per hari: ${kebutuhanAir.toFixed(2)} liter</p>
        <p>Status Kesehatan: ${statusKesehatan}</p>
    `;

    if (berat < beratIdeal.beratMin) {
        result += "<p>Anda disarankan untuk menaikkan berat badan.</p>";
    } else if (berat > beratIdeal.beratMax) {
        result += "<p>Anda disarankan untuk menurunkan berat badan.</p>";
    } else {
        result += "<p>Berat badan Anda sudah ideal.</p>";
    }

    document.getElementById("result").innerHTML = result;
}
