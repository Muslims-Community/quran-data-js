# API Overview

Complete reference for all functions in `@muslims-community/quran` package.

## 📋 Function Summary

| Function | Version | Purpose | Returns |
|----------|---------|---------|---------|
| `getAyah()` | 1.0.0 | Get specific ayah | `AyahWithSurah` |
| `getSurah()` | 1.0.0 | Get complete surah | `Surah` |
| `getQuranData()` | 1.0.0 | Get complete dataset | `QuranData` |
| `searchText()` | 1.0.0 | Search Arabic text | `SearchResult` |
| `getRandomAyah()` | 1.0.0 | Get random ayah | `AyahWithSurah` |
| `getSajdahAyat()` | 1.0.0 | Get prostration verses | `SajdahResult` |
| `getAyahRange()` | 1.1.0 | Get range of ayat | `AyahRange` |
| `getJuz()` | 1.1.0 | Get Juz (Para) ayat | `JuzResult` |
| `getHizb()` | 1.1.0 | Get Hizb ayat | `HizbResult` |
| `searchBySurahName()` | 1.1.0 | Search surah names | `SurahSearchResult` |
| `getSurahStatistics()` | 1.1.0 | Get Quran statistics | `SurahStatistics` |

## 🏗️ Core Functions (v1.0.0)

### `getAyah(surahId: number, ayahId: number): AyahWithSurah`

Get a specific ayah with complete metadata and surah context.

**Parameters:**
- `surahId` (1-114): Surah number in Mushaf order
- `ayahId` (1-n): Ayah number within the surah

**Example:**
```javascript
const ayahAlKursi = getAyah(2, 255);
console.log(ayahAlKursi.text); // Ayat al-Kursi text
console.log(ayahAlKursi.juz);  // 3
console.log(ayahAlKursi.surah.englishName); // "Al-Baqarah"
```

**Throws:**
- `Error` if surahId is not 1-114
- `Error` if ayahId is invalid for the surah

---

### `getSurah(surahId: number): Surah`

Get a complete surah with all ayat and metadata.

**Parameters:**
- `surahId` (1-114): Surah number in Mushaf order

**Example:**
```javascript
const alFatiha = getSurah(1);
console.log(alFatiha.name); // "الفاتحة"
console.log(alFatiha.numberOfAyahs); // 7
console.log(alFatiha.revelationType); // "Meccan"
console.log(alFatiha.ayat.length); // 7
```

**Throws:**
- `Error` if surahId is not 1-114

---

### `getQuranData(): QuranData`

Get the complete Quran dataset with all surahs and metadata.

**Example:**
```javascript
const quran = getQuranData();
console.log(quran.metadata.totalAyat); // 6236
console.log(quran.surahs.length); // 114
console.log(quran.version); // "1.1"
```

**No parameters** - Always returns complete dataset.

---

### `searchText(searchTerm: string): SearchResult`

Search for Arabic text within all ayat of the Quran.

**Parameters:**
- `searchTerm`: Arabic text to search for (case-sensitive)

**Example:**
```javascript
const results = searchText('بِسمِ');
console.log(results.totalResults); // 3
results.results.forEach(ayah => {
  console.log(`${ayah.surah.englishName} ${ayah.id}: ${ayah.text}`);
});
```

**Throws:**
- `Error` if searchTerm is empty or not a string

---

### `getRandomAyah(): AyahWithSurah`

Get a random ayah from anywhere in the Quran.

**Example:**
```javascript
const dailyAyah = getRandomAyah();
console.log(`Today's ayah from ${dailyAyah.surah.englishName}:`);
console.log(dailyAyah.text);
```

**No parameters** - Uses Math.random() for selection.

---

### `getSajdahAyat(): SajdahResult`

Get all ayat where sajdah (prostration) is recommended.

**Example:**
```javascript
const sajdahVerses = getSajdahAyat();
console.log(`Total sajdah ayat: ${sajdahVerses.totalSajdahAyat}`); // 15

sajdahVerses.sajdahAyat.forEach(ayah => {
  console.log(`${ayah.surah.englishName} ${ayah.id}`);
});
```

**No parameters** - Returns all 15 sajdah ayat.

## 🚀 Enhanced Functions (v1.1.0)

### `getAyahRange(surahId: number, startAyah: number, endAyah: number): AyahRange`

Get a consecutive range of ayat from a specific surah.

**Parameters:**
- `surahId` (1-114): Surah number
- `startAyah`: Starting ayah number (inclusive)
- `endAyah`: Ending ayah number (inclusive)

**Example:**
```javascript
// Read first 5 ayat of Al-Baqarah
const opening = getAyahRange(2, 1, 5);
console.log(`Reading ${opening.range.count} ayat`);
opening.ayat.forEach((ayah, index) => {
  console.log(`${index + 1}. ${ayah.text}`);
});
```

**Throws:**
- `Error` if any parameter is invalid
- `Error` if startAyah > endAyah

---

### `getJuz(juzNumber: number): JuzResult`

Get all ayat from a specific Juz (Para).

**Parameters:**
- `juzNumber` (1-30): Juz number

**Example:**
```javascript
// Get first Juz for daily reading
const juz1 = getJuz(1);
console.log(`Juz 1 contains ${juz1.totalAyat} ayat`); // 148
console.log(`Starts with: ${juz1.ayat[0].text}`); // Bismillah
```

**Use Cases:**
- Daily reading schedules (30-day plan)
- Progress tracking
- Reading apps

---

### `getHizb(hizbNumber: number): HizbResult`

Get all ayat from a specific Hizb.

**Parameters:**
- `hizbNumber` (1-60): Hizb number

**Example:**
```javascript
// Get first Hizb (half of first Juz)
const hizb1 = getHizb(1);
console.log(`Hizb 1 is in Juz ${hizb1.juz}`); // 1
console.log(`Contains ${hizb1.totalAyat} ayat`);
```

**Note:** Each Juz contains 2 Hizb, so Hizb 1-2 = Juz 1, Hizb 3-4 = Juz 2, etc.

---

### `searchBySurahName(name: string): SurahSearchResult`

Search for surahs by Arabic or English name (supports partial matching).

**Parameters:**
- `name`: Surah name to search for (Arabic or English)

**Example:**
```javascript
// Search by English name
const results = searchBySurahName('Fatiha');
console.log(results.results[0].englishName); // "Al-Fatiha"

// Search by Arabic name
const arabicResults = searchBySurahName('البقرة');
console.log(arabicResults.results[0].name); // "البقرة"

// Partial matching
const partialResults = searchBySurahName('Baq');
console.log(partialResults.results[0].englishName); // "Al-Baqarah"
```

**Use Cases:**
- Surah finder/browser
- Quick navigation
- User-friendly interfaces

---

### `getSurahStatistics(): SurahStatistics`

Get comprehensive statistics about the Quran.

**Example:**
```javascript
const stats = getSurahStatistics();

// Basic counts
console.log(`Total: ${stats.totalSurahs} surahs, ${stats.totalAyat} ayat`);
console.log(`Meccan: ${stats.meccanSurahs}, Medinan: ${stats.medinanSurahs}`);

// Extremes
console.log(`Longest: ${stats.longestSurah.englishName} (${stats.longestSurah.numberOfAyahs} ayat)`);
console.log(`Shortest: ${stats.shortestSurah.englishName} (${stats.shortestSurah.numberOfAyahs} ayat)`);

// Analysis
console.log(`Average: ${stats.averageAyatPerSurah} ayat per surah`);

// Distribution
Object.entries(stats.ayatCounts.distribution).forEach(([count, surahs]) => {
  console.log(`${surahs} surah(s) have ${count} ayat`);
});
```

**Use Cases:**
- Educational dashboards
- Analytics applications
- Research tools
- Progress visualization

## 🔗 Function Relationships

### **Reading Flow**
```
getQuranData() → getSurah() → getAyah()
                          ↓
                   getAyahRange()
```

### **Islamic Divisions**
```
getQuranData() → getJuz() → getHizb()
```

### **Search & Discovery**
```
searchBySurahName() → getSurah() → getAyahRange()
searchText() → getAyah()
```

### **Statistics & Analysis**
```
getSurahStatistics() ← getQuranData()
getSajdahAyat() ← getQuranData()
```

## ⚡ Performance Notes

### **Fast Operations**
- `getAyah()` - Direct array access: O(1)
- `getSurah()` - Direct array access: O(1)
- `getRandomAyah()` - Direct random access: O(1)

### **Medium Operations**
- `searchBySurahName()` - Linear surah search: O(114)
- `getSajdahAyat()` - Pre-filtered data: O(15)

### **Intensive Operations**
- `searchText()` - Full text search: O(6236)
- `getJuz()` - Filter all ayat: O(6236)
- `getHizb()` - Filter all ayat: O(6236)
- `getSurahStatistics()` - Calculate stats: O(114)

### **Optimization Tips**
1. **Cache results** for repeated calls
2. **Memoize** expensive operations
3. **Use range reading** instead of individual ayah calls
4. **Preload** commonly used data

## 🛡️ Error Handling

All functions include comprehensive error handling:

```javascript
try {
  const ayah = getAyah(999, 1); // Invalid surah
} catch (error) {
  console.error(error.message); // "Surah ID must be between 1 and 114"
}

try {
  const juz = getJuz(31); // Invalid juz
} catch (error) {
  console.error(error.message); // "Juz number must be between 1 and 30"
}
```

See [Error Handling Guide](error-handling.md) for complete error reference.

## 📊 Return Type Reference

See [TypeScript Guide](typescript.md) for complete type definitions and interfaces.

---

**Next Steps:**
- [Quick Start Guide](quick-start.md) - Start using the package
- [Examples](examples/) - See practical implementations
- [TypeScript Guide](typescript.md) - Full type safety