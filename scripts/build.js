const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Surah names and metadata
const surahData = {
  1: { englishName: "Al-Fatiha", revelationType: "Meccan" },
  2: { englishName: "Al-Baqarah", revelationType: "Medinan" },
  3: { englishName: "Ali 'Imran", revelationType: "Medinan" },
  4: { englishName: "An-Nisa", revelationType: "Medinan" },
  5: { englishName: "Al-Ma'idah", revelationType: "Medinan" },
  6: { englishName: "Al-An'am", revelationType: "Meccan" },
  7: { englishName: "Al-A'raf", revelationType: "Meccan" },
  8: { englishName: "Al-Anfal", revelationType: "Medinan" },
  9: { englishName: "At-Tawbah", revelationType: "Medinan" },
  10: { englishName: "Yunus", revelationType: "Meccan" },
  11: { englishName: "Hud", revelationType: "Meccan" },
  12: { englishName: "Yusuf", revelationType: "Meccan" },
  13: { englishName: "Ar-Ra'd", revelationType: "Medinan" },
  14: { englishName: "Ibrahim", revelationType: "Meccan" },
  15: { englishName: "Al-Hijr", revelationType: "Meccan" },
  16: { englishName: "An-Nahl", revelationType: "Meccan" },
  17: { englishName: "Al-Isra", revelationType: "Meccan" },
  18: { englishName: "Al-Kahf", revelationType: "Meccan" },
  19: { englishName: "Maryam", revelationType: "Meccan" },
  20: { englishName: "Taha", revelationType: "Meccan" },
  21: { englishName: "Al-Anbya", revelationType: "Meccan" },
  22: { englishName: "Al-Hajj", revelationType: "Medinan" },
  23: { englishName: "Al-Mu'minun", revelationType: "Meccan" },
  24: { englishName: "An-Nur", revelationType: "Medinan" },
  25: { englishName: "Al-Furqan", revelationType: "Meccan" },
  26: { englishName: "Ash-Shu'ara", revelationType: "Meccan" },
  27: { englishName: "An-Naml", revelationType: "Meccan" },
  28: { englishName: "Al-Qasas", revelationType: "Meccan" },
  29: { englishName: "Al-'Ankabut", revelationType: "Meccan" },
  30: { englishName: "Ar-Rum", revelationType: "Meccan" },
  31: { englishName: "Luqman", revelationType: "Meccan" },
  32: { englishName: "As-Sajdah", revelationType: "Meccan" },
  33: { englishName: "Al-Ahzab", revelationType: "Medinan" },
  34: { englishName: "Saba", revelationType: "Meccan" },
  35: { englishName: "Fatir", revelationType: "Meccan" },
  36: { englishName: "Ya-Sin", revelationType: "Meccan" },
  37: { englishName: "As-Saffat", revelationType: "Meccan" },
  38: { englishName: "Sad", revelationType: "Meccan" },
  39: { englishName: "Az-Zumar", revelationType: "Meccan" },
  40: { englishName: "Ghafir", revelationType: "Meccan" },
  41: { englishName: "Fussilat", revelationType: "Meccan" },
  42: { englishName: "Ash-Shuraa", revelationType: "Meccan" },
  43: { englishName: "Az-Zukhruf", revelationType: "Meccan" },
  44: { englishName: "Ad-Dukhan", revelationType: "Meccan" },
  45: { englishName: "Al-Jathiyah", revelationType: "Meccan" },
  46: { englishName: "Al-Ahqaf", revelationType: "Meccan" },
  47: { englishName: "Muhammad", revelationType: "Medinan" },
  48: { englishName: "Al-Fath", revelationType: "Medinan" },
  49: { englishName: "Al-Hujurat", revelationType: "Medinan" },
  50: { englishName: "Qaf", revelationType: "Meccan" },
  51: { englishName: "Adh-Dhariyat", revelationType: "Meccan" },
  52: { englishName: "At-Tur", revelationType: "Meccan" },
  53: { englishName: "An-Najm", revelationType: "Meccan" },
  54: { englishName: "Al-Qamar", revelationType: "Meccan" },
  55: { englishName: "Ar-Rahman", revelationType: "Medinan" },
  56: { englishName: "Al-Waqi'ah", revelationType: "Meccan" },
  57: { englishName: "Al-Hadid", revelationType: "Medinan" },
  58: { englishName: "Al-Mujadila", revelationType: "Medinan" },
  59: { englishName: "Al-Hashr", revelationType: "Medinan" },
  60: { englishName: "Al-Mumtahanah", revelationType: "Medinan" },
  61: { englishName: "As-Saff", revelationType: "Medinan" },
  62: { englishName: "Al-Jumu'ah", revelationType: "Medinan" },
  63: { englishName: "Al-Munafiqun", revelationType: "Medinan" },
  64: { englishName: "At-Taghabun", revelationType: "Medinan" },
  65: { englishName: "At-Talaq", revelationType: "Medinan" },
  66: { englishName: "At-Tahrim", revelationType: "Medinan" },
  67: { englishName: "Al-Mulk", revelationType: "Meccan" },
  68: { englishName: "Al-Qalam", revelationType: "Meccan" },
  69: { englishName: "Al-Haqqah", revelationType: "Meccan" },
  70: { englishName: "Al-Ma'arij", revelationType: "Meccan" },
  71: { englishName: "Nuh", revelationType: "Meccan" },
  72: { englishName: "Al-Jinn", revelationType: "Meccan" },
  73: { englishName: "Al-Muzzammil", revelationType: "Meccan" },
  74: { englishName: "Al-Muddaththir", revelationType: "Meccan" },
  75: { englishName: "Al-Qiyamah", revelationType: "Meccan" },
  76: { englishName: "Al-Insan", revelationType: "Medinan" },
  77: { englishName: "Al-Mursalat", revelationType: "Meccan" },
  78: { englishName: "An-Naba", revelationType: "Meccan" },
  79: { englishName: "An-Nazi'at", revelationType: "Meccan" },
  80: { englishName: "Abasa", revelationType: "Meccan" },
  81: { englishName: "At-Takwir", revelationType: "Meccan" },
  82: { englishName: "Al-Infitar", revelationType: "Meccan" },
  83: { englishName: "Al-Mutaffifin", revelationType: "Meccan" },
  84: { englishName: "Al-Inshiqaq", revelationType: "Meccan" },
  85: { englishName: "Al-Buruj", revelationType: "Meccan" },
  86: { englishName: "At-Tariq", revelationType: "Meccan" },
  87: { englishName: "Al-A'la", revelationType: "Meccan" },
  88: { englishName: "Al-Ghashiyah", revelationType: "Meccan" },
  89: { englishName: "Al-Fajr", revelationType: "Meccan" },
  90: { englishName: "Al-Balad", revelationType: "Meccan" },
  91: { englishName: "Ash-Shams", revelationType: "Meccan" },
  92: { englishName: "Al-Layl", revelationType: "Meccan" },
  93: { englishName: "Ad-Duhaa", revelationType: "Meccan" },
  94: { englishName: "Ash-Sharh", revelationType: "Meccan" },
  95: { englishName: "At-Tin", revelationType: "Meccan" },
  96: { englishName: "Al-'Alaq", revelationType: "Meccan" },
  97: { englishName: "Al-Qadr", revelationType: "Meccan" },
  98: { englishName: "Al-Bayyinah", revelationType: "Medinan" },
  99: { englishName: "Az-Zalzalah", revelationType: "Medinan" },
  100: { englishName: "Al-'Adiyat", revelationType: "Meccan" },
  101: { englishName: "Al-Qari'ah", revelationType: "Meccan" },
  102: { englishName: "At-Takathur", revelationType: "Meccan" },
  103: { englishName: "Al-'Asr", revelationType: "Meccan" },
  104: { englishName: "Al-Humazah", revelationType: "Meccan" },
  105: { englishName: "Al-Fil", revelationType: "Meccan" },
  106: { englishName: "Quraysh", revelationType: "Meccan" },
  107: { englishName: "Al-Ma'un", revelationType: "Meccan" },
  108: { englishName: "Al-Kawthar", revelationType: "Meccan" },
  109: { englishName: "Al-Kafirun", revelationType: "Meccan" },
  110: { englishName: "An-Nasr", revelationType: "Medinan" },
  111: { englishName: "Al-Masad", revelationType: "Meccan" },
  112: { englishName: "Al-Ikhlas", revelationType: "Meccan" },
  113: { englishName: "Al-Falaq", revelationType: "Meccan" },
  114: { englishName: "An-Nas", revelationType: "Meccan" }
};

// Sajdah ayat (prostration verses)
const sajdahAyat = [
  { surah: 7, ayah: 206 },
  { surah: 13, ayah: 15 },
  { surah: 16, ayah: 50 },
  { surah: 17, ayah: 109 },
  { surah: 19, ayah: 58 },
  { surah: 22, ayah: 18 },
  { surah: 22, ayah: 77 },
  { surah: 25, ayah: 60 },
  { surah: 27, ayah: 26 },
  { surah: 32, ayah: 15 },
  { surah: 38, ayah: 24 },
  { surah: 41, ayah: 38 },
  { surah: 53, ayah: 62 },
  { surah: 84, ayah: 21 },
  { surah: 96, ayah: 19 }
];

function isSajdahAyah(surahId, ayahId) {
  return sajdahAyat.some(sajdah => sajdah.surah === surahId && sajdah.ayah === ayahId);
}

async function convertXmlToJson() {
  try {
    console.log('Reading XML file...');
    const xmlPath = path.join(__dirname, '..', 'data', 'quran-uthmani-min.xml');
    const xmlContent = fs.readFileSync(xmlPath, 'utf8');

    console.log('Parsing XML...');
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlContent);

    console.log('Converting to JSON structure...');
    const quranData = [];

    if (result.quran && result.quran.sura) {
      result.quran.sura.forEach(sura => {
        const surahId = parseInt(sura.$.index);
        const surahName = sura.$.name;

        const surahObj = {
          id: surahId,
          name: surahName,
          englishName: surahData[surahId]?.englishName || "",
          revelationType: surahData[surahId]?.revelationType || "Meccan",
          numberOfAyahs: sura.aya ? sura.aya.length : 0,
          ayat: []
        };

        if (sura.aya) {
          sura.aya.forEach(aya => {
            const ayahId = parseInt(aya.$.index);
            const ayahText = aya.$.text;

            const ayahObj = {
              id: ayahId,
              text: ayahText,
              sajdah: isSajdahAyah(surahId, ayahId)
            };

            // Add bismillah if present
            if (aya.$.bismillah) {
              ayahObj.bismillah = aya.$.bismillah;
            }

            surahObj.ayat.push(ayahObj);
          });
        }

        quranData.push(surahObj);
      });
    }

    // Add source attribution
    const finalData = {
      source: "Tanzil Project - https://tanzil.net",
      version: "1.1",
      copyright: "Copyright (C) 2007-2025 Tanzil Project",
      license: "Creative Commons Attribution 3.0",
      surahs: quranData
    };

    console.log('Writing JSON file...');
    const outputPath = path.join(__dirname, '..', 'dist', 'quran.json');

    // Ensure dist directory exists
    const distDir = path.dirname(outputPath);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2), 'utf8');

    console.log(`✅ Successfully converted XML to JSON`);
    console.log(`📊 Total Surahs: ${quranData.length}`);
    console.log(`📄 Output file: ${outputPath}`);

    // Calculate total ayat
    const totalAyat = quranData.reduce((total, surah) => total + surah.numberOfAyahs, 0);
    console.log(`📖 Total Ayat: ${totalAyat}`);

  } catch (error) {
    console.error('❌ Error converting XML to JSON:', error);
    process.exit(1);
  }
}

convertXmlToJson();