const { getAyah, getSurah, searchText, getRandomAyah, getSajdahAyat, getQuranData } = require('./dist/index.js');

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

console.log('\n🎉 All tests completed successfully!');