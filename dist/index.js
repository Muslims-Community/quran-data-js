const quranData = require('./quran.json');

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

// Phase 1 Enhanced Functions - v1.1.0

function getAyahRange(surahId, startAyah, endAyah) {
  if (typeof surahId !== 'number' || typeof startAyah !== 'number' || typeof endAyah !== 'number') {
    throw new Error('Surah ID, start ayah, and end ayah must be numbers');
  }

  if (surahId < 1 || surahId > 114) {
    throw new Error('Surah ID must be between 1 and 114');
  }

  const surah = quranData.surahs.find(s => s.id === surahId);
  if (!surah) {
    throw new Error(`Surah ${surahId} not found`);
  }

  if (startAyah < 1 || startAyah > surah.numberOfAyahs) {
    throw new Error(`Start ayah must be between 1 and ${surah.numberOfAyahs} for Surah ${surahId}`);
  }

  if (endAyah < 1 || endAyah > surah.numberOfAyahs) {
    throw new Error(`End ayah must be between 1 and ${surah.numberOfAyahs} for Surah ${surahId}`);
  }

  if (startAyah > endAyah) {
    throw new Error('Start ayah must be less than or equal to end ayah');
  }

  const ayatRange = surah.ayat.filter(ayah => ayah.id >= startAyah && ayah.id <= endAyah);

  return {
    surah: {
      id: surah.id,
      name: surah.name,
      englishName: surah.englishName,
      revelationType: surah.revelationType
    },
    range: {
      start: startAyah,
      end: endAyah,
      count: ayatRange.length
    },
    ayat: ayatRange.map(ayah => ({
      ...ayah,
      surah: {
        id: surah.id,
        name: surah.name,
        englishName: surah.englishName,
        revelationType: surah.revelationType
      }
    })),
    source: quranData.source
  };
}

function getJuz(juzNumber) {
  if (typeof juzNumber !== 'number') {
    throw new Error('Juz number must be a number');
  }

  if (juzNumber < 1 || juzNumber > 30) {
    throw new Error('Juz number must be between 1 and 30');
  }

  const juzAyat = [];
  let totalAyat = 0;

  quranData.surahs.forEach(surah => {
    surah.ayat.forEach(ayah => {
      if (ayah.juz === juzNumber) {
        juzAyat.push({
          ...ayah,
          surah: {
            id: surah.id,
            name: surah.name,
            englishName: surah.englishName,
            revelationType: surah.revelationType
          }
        });
        totalAyat++;
      }
    });
  });

  return {
    juz: juzNumber,
    totalAyat,
    ayat: juzAyat,
    source: quranData.source
  };
}

function getHizb(hizbNumber) {
  if (typeof hizbNumber !== 'number') {
    throw new Error('Hizb number must be a number');
  }

  if (hizbNumber < 1 || hizbNumber > 60) {
    throw new Error('Hizb number must be between 1 and 60');
  }

  const hizbAyat = [];
  let totalAyat = 0;

  quranData.surahs.forEach(surah => {
    surah.ayat.forEach(ayah => {
      if (ayah.hizb === hizbNumber) {
        hizbAyat.push({
          ...ayah,
          surah: {
            id: surah.id,
            name: surah.name,
            englishName: surah.englishName,
            revelationType: surah.revelationType
          }
        });
        totalAyat++;
      }
    });
  });

  return {
    hizb: hizbNumber,
    juz: Math.ceil(hizbNumber / 2),
    totalAyat,
    ayat: hizbAyat,
    source: quranData.source
  };
}

function searchBySurahName(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Surah name must be a non-empty string');
  }

  const searchTerm = name.trim().toLowerCase();
  const results = [];

  quranData.surahs.forEach(surah => {
    const arabicMatch = surah.name.includes(name.trim());
    const englishMatch = surah.englishName.toLowerCase().includes(searchTerm);

    if (arabicMatch || englishMatch) {
      results.push({
        ...surah,
        source: quranData.source
      });
    }
  });

  return {
    searchTerm: name.trim(),
    totalResults: results.length,
    results,
    source: quranData.source
  };
}

function getSurahStatistics() {
  const stats = {
    totalSurahs: quranData.surahs.length,
    totalAyat: 0,
    meccanSurahs: 0,
    medinanSurahs: 0,
    averageAyatPerSurah: 0,
    longestSurah: null,
    shortestSurah: null,
    ayatCounts: {
      min: Infinity,
      max: 0,
      distribution: {}
    }
  };

  let longestAyatCount = 0;
  let shortestAyatCount = Infinity;

  quranData.surahs.forEach(surah => {
    stats.totalAyat += surah.numberOfAyahs;

    if (surah.revelationType === 'Meccan') {
      stats.meccanSurahs++;
    } else {
      stats.medinanSurahs++;
    }

    // Track longest and shortest surahs
    if (surah.numberOfAyahs > longestAyatCount) {
      longestAyatCount = surah.numberOfAyahs;
      stats.longestSurah = {
        id: surah.id,
        name: surah.name,
        englishName: surah.englishName,
        numberOfAyahs: surah.numberOfAyahs
      };
    }

    if (surah.numberOfAyahs < shortestAyatCount) {
      shortestAyatCount = surah.numberOfAyahs;
      stats.shortestSurah = {
        id: surah.id,
        name: surah.name,
        englishName: surah.englishName,
        numberOfAyahs: surah.numberOfAyahs
      };
    }

    // Distribution tracking
    const count = surah.numberOfAyahs;
    stats.ayatCounts.distribution[count] = (stats.ayatCounts.distribution[count] || 0) + 1;
  });

  stats.averageAyatPerSurah = Math.round(stats.totalAyat / stats.totalSurahs * 100) / 100;
  stats.ayatCounts.min = shortestAyatCount;
  stats.ayatCounts.max = longestAyatCount;

  return {
    ...stats,
    source: quranData.source
  };
}

module.exports = {
  // Original functions
  getAyah,
  getSurah,
  getQuranData,
  searchText,
  getRandomAyah,
  getSajdahAyat,

  // Phase 1 Enhanced functions (v1.1.0)
  getAyahRange,
  getJuz,
  getHizb,
  searchBySurahName,
  getSurahStatistics
};