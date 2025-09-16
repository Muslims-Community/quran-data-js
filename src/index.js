const quranData = require('../dist/quran.json');

function getAyah(surahId, ayahId) {
  if (typeof surahId !== 'number' || typeof ayahId !== 'number') {
    throw new Error('Surah ID and Ayah ID must be numbers');
  }

  if (surahId < 1 || surahId > 114) {
    throw new Error('Surah ID must be between 1 and 114');
  }

  const surah = quranData.surahs.find(s => s.id === surahId);
  if (!surah) {
    throw new Error(`Surah ${surahId} not found`);
  }

  if (ayahId < 1 || ayahId > surah.numberOfAyahs) {
    throw new Error(`Ayah ID must be between 1 and ${surah.numberOfAyahs} for Surah ${surahId}`);
  }

  const ayah = surah.ayat.find(a => a.id === ayahId);
  if (!ayah) {
    throw new Error(`Ayah ${ayahId} not found in Surah ${surahId}`);
  }

  return {
    ...ayah,
    surah: {
      id: surah.id,
      name: surah.name,
      englishName: surah.englishName,
      revelationType: surah.revelationType
    },
    source: quranData.source
  };
}

function getSurah(surahId) {
  if (typeof surahId !== 'number') {
    throw new Error('Surah ID must be a number');
  }

  if (surahId < 1 || surahId > 114) {
    throw new Error('Surah ID must be between 1 and 114');
  }

  const surah = quranData.surahs.find(s => s.id === surahId);
  if (!surah) {
    throw new Error(`Surah ${surahId} not found`);
  }

  return {
    ...surah,
    source: quranData.source
  };
}

function getQuranData() {
  return {
    ...quranData,
    source: quranData.source
  };
}

function searchText(searchTerm) {
  if (typeof searchTerm !== 'string' || searchTerm.trim() === '') {
    throw new Error('Search term must be a non-empty string');
  }

  const results = [];
  const normalizedSearchTerm = searchTerm.trim();

  quranData.surahs.forEach(surah => {
    surah.ayat.forEach(ayah => {
      if (ayah.text.includes(normalizedSearchTerm)) {
        results.push({
          ...ayah,
          surah: {
            id: surah.id,
            name: surah.name,
            englishName: surah.englishName,
            revelationType: surah.revelationType
          }
        });
      }
    });
  });

  return {
    results,
    searchTerm: normalizedSearchTerm,
    totalResults: results.length,
    source: quranData.source
  };
}

function getRandomAyah() {
  const randomSurahIndex = Math.floor(Math.random() * quranData.surahs.length);
  const randomSurah = quranData.surahs[randomSurahIndex];
  const randomAyahIndex = Math.floor(Math.random() * randomSurah.ayat.length);
  const randomAyah = randomSurah.ayat[randomAyahIndex];

  return {
    ...randomAyah,
    surah: {
      id: randomSurah.id,
      name: randomSurah.name,
      englishName: randomSurah.englishName,
      revelationType: randomSurah.revelationType
    },
    source: quranData.source
  };
}

function getSajdahAyat() {
  const sajdahAyat = [];

  quranData.surahs.forEach(surah => {
    surah.ayat.forEach(ayah => {
      if (ayah.sajdah) {
        sajdahAyat.push({
          ...ayah,
          surah: {
            id: surah.id,
            name: surah.name,
            englishName: surah.englishName,
            revelationType: surah.revelationType
          }
        });
      }
    });
  });

  return {
    sajdahAyat,
    totalSajdahAyat: sajdahAyat.length,
    source: quranData.source
  };
}

module.exports = {
  getAyah,
  getSurah,
  getQuranData,
  searchText,
  getRandomAyah,
  getSajdahAyat
};