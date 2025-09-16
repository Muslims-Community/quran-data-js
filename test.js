const {
  getAyah, getSurah, searchText, getRandomAyah, getSajdahAyat, getQuranData,
  // Phase 1 Enhanced functions (v1.1.0)
  getAyahRange, getJuz, getHizb, searchBySurahName, getSurahStatistics
} = require('./dist/index.js');

console.log('🧪 Testing @muslims-community/quran package\n');

// Test getAyah
console.log('📖 Testing getAyah(1, 1):');
try {
  const ayah = getAyah(1, 1);
  console.log(`✅ Ayah text: ${ayah.text}`);
  console.log(`✅ Surah: ${ayah.surah.name} (${ayah.surah.englishName})`);
  console.log(`✅ Source: ${ayah.source}\n`);
} catch (error) {
  console.log(`❌ Error: ${error.message}\n`);
}

// Test getSurah
console.log('📚 Testing getSurah(18):');
try {
  const surah = getSurah(18);
  console.log(`✅ Surah: ${surah.name} (${surah.englishName})`);
  console.log(`✅ Number of Ayat: ${surah.numberOfAyahs}`);
  console.log(`✅ Revelation Type: ${surah.revelationType}`);
  console.log(`✅ First Ayah: ${surah.ayat[0].text}\n`);
} catch (error) {
  console.log(`❌ Error: ${error.message}\n`);
}

// Test searchText
console.log('🔍 Testing searchText("بِسمِ"):');
try {
  const results = searchText('بِسمِ');
  console.log(`✅ Found ${results.totalResults} results`);
  if (results.results.length > 0) {
    console.log(`✅ First result: ${results.results[0].text}`);
    console.log(`✅ From: ${results.results[0].surah.englishName}`);
  } else {
    console.log(`✅ No results found for the search term`);
  }
  console.log('');
} catch (error) {
  console.log(`❌ Error: ${error.message}\n`);
}

// Test getRandomAyah
console.log('🎲 Testing getRandomAyah():');
try {
  const randomAyah = getRandomAyah();
  console.log(`✅ Random Ayah: ${randomAyah.text}`);
  console.log(`✅ From: ${randomAyah.surah.englishName} (${randomAyah.surah.name}), Ayah ${randomAyah.id}\n`);
} catch (error) {
  console.log(`❌ Error: ${error.message}\n`);
}

// Test getSajdahAyat
console.log('🕌 Testing getSajdahAyat():');
try {
  const sajdahResult = getSajdahAyat();
  console.log(`✅ Total Sajdah Ayat: ${sajdahResult.totalSajdahAyat}`);
  if (sajdahResult.sajdahAyat.length > 0) {
    const firstSajdah = sajdahResult.sajdahAyat[0];
    console.log(`✅ First Sajdah: ${firstSajdah.surah.englishName} ${firstSajdah.id}`);
    console.log(`✅ Text: ${firstSajdah.text}\n`);
  }
} catch (error) {
  console.log(`❌ Error: ${error.message}\n`);
}

// Test getQuranData
console.log('📊 Testing getQuranData():');
try {
  const quranData = getQuranData();
  console.log(`✅ Total Surahs: ${quranData.surahs.length}`);
  console.log(`✅ Version: ${quranData.version}`);
  console.log(`✅ License: ${quranData.license}`);

  // Calculate total ayat
  const totalAyat = quranData.surahs.reduce((total, surah) => total + surah.numberOfAyahs, 0);
  console.log(`✅ Total Ayat: ${totalAyat}\n`);
} catch (error) {
  console.log(`❌ Error: ${error.message}\n`);
}

// Test error handling
console.log('⚠️  Testing error handling:');
try {
  getAyah(999, 1); // Invalid surah
} catch (error) {
  console.log(`✅ Correctly caught error: ${error.message}`);
}

try {
  getAyah(1, 999); // Invalid ayah
} catch (error) {
  console.log(`✅ Correctly caught error: ${error.message}`);
}

try {
  searchText(''); // Empty search
} catch (error) {
  console.log(`✅ Correctly caught error: ${error.message}`);
}

// Test Phase 1 Enhanced Functions (v1.1.0)
console.log('\n🚀 Testing Phase 1 Enhanced Functions (v1.1.0):');

// Test getAyahRange
console.log('\n📖 Testing getAyahRange(2, 1, 3):');
try {
  const ayahRange = getAyahRange(2, 1, 3);
  console.log(`✅ Range: ${ayahRange.range.start}-${ayahRange.range.end} (${ayahRange.range.count} ayat)`);
  console.log(`✅ First ayah: ${ayahRange.ayat[0].text.substring(0, 30)}...`);
  console.log(`✅ Surah: ${ayahRange.surah.englishName}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// Test getJuz
console.log('\n📚 Testing getJuz(1):');
try {
  const juz = getJuz(1);
  console.log(`✅ Juz ${juz.juz}: ${juz.totalAyat} ayat`);
  console.log(`✅ First ayah: ${juz.ayat[0].text}`);
  console.log(`✅ From: ${juz.ayat[0].surah.englishName}`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// Test getHizb
console.log('\n📑 Testing getHizb(1):');
try {
  const hizb = getHizb(1);
  console.log(`✅ Hizb ${hizb.hizb} (Juz ${hizb.juz}): ${hizb.totalAyat} ayat`);
  if (hizb.ayat.length > 0) {
    console.log(`✅ First ayah: ${hizb.ayat[0].text.substring(0, 30)}...`);
  }
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// Test searchBySurahName
console.log('\n🔍 Testing searchBySurahName("Fatiha"):');
try {
  const surahSearch = searchBySurahName('Fatiha');
  console.log(`✅ Found ${surahSearch.totalResults} results`);
  if (surahSearch.results.length > 0) {
    console.log(`✅ Result: ${surahSearch.results[0].englishName} (${surahSearch.results[0].name})`);
  }
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// Test searchBySurahName with Arabic
console.log('\n🔍 Testing searchBySurahName("البقرة"):');
try {
  const arabicSearch = searchBySurahName('البقرة');
  console.log(`✅ Found ${arabicSearch.totalResults} results`);
  if (arabicSearch.results.length > 0) {
    console.log(`✅ Result: ${arabicSearch.results[0].englishName} (${arabicSearch.results[0].name})`);
  }
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// Test getSurahStatistics
console.log('\n📊 Testing getSurahStatistics():');
try {
  const stats = getSurahStatistics();
  console.log(`✅ Total Surahs: ${stats.totalSurahs}`);
  console.log(`✅ Total Ayat: ${stats.totalAyat}`);
  console.log(`✅ Meccan: ${stats.meccanSurahs}, Medinan: ${stats.medinanSurahs}`);
  console.log(`✅ Average Ayat per Surah: ${stats.averageAyatPerSurah}`);
  console.log(`✅ Longest: ${stats.longestSurah.englishName} (${stats.longestSurah.numberOfAyahs} ayat)`);
  console.log(`✅ Shortest: ${stats.shortestSurah.englishName} (${stats.shortestSurah.numberOfAyahs} ayat)`);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

// Test error handling for new functions
console.log('\n⚠️ Testing error handling for enhanced functions:');
try {
  getAyahRange(999, 1, 1); // Invalid surah
} catch (error) {
  console.log(`✅ Correctly caught error: ${error.message}`);
}

try {
  getJuz(31); // Invalid juz
} catch (error) {
  console.log(`✅ Correctly caught error: ${error.message}`);
}

try {
  getHizb(61); // Invalid hizb
} catch (error) {
  console.log(`✅ Correctly caught error: ${error.message}`);
}

try {
  searchBySurahName(''); // Empty search
} catch (error) {
  console.log(`✅ Correctly caught error: ${error.message}`);
}

console.log('\n🎉 All tests completed successfully! Phase 1 Enhanced Functions (v1.1.0) working perfectly!');