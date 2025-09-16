# @muslims-community/quran

A simple, lightweight, and offline Quran data package for JavaScript applications.

## Features

- 🚀 **Zero dependencies** - No external dependencies required
- 📱 **Universal** - Works in Node.js, browsers, React, Vue, React Native, and more
- 🌐 **Offline-first** - Complete Quran text included in the package
- 📖 **Complete** - All 114 surahs with 6,236 ayat
- 🔍 **Searchable** - Built-in text search functionality
- 📚 **Authentic** - Based on official Tanzil Project Uthmani minimal text
- 🧩 **TypeScript** - Full TypeScript support with detailed type definitions
- 🎯 **Tree-shakable** - ES modules support for optimal bundle sizes

## Installation

```bash
npm install @muslims-community/quran
```

## Quick Start

### CommonJS (Node.js)

```javascript
const { getAyah, getSurah } = require('@muslims-community/quran');

// Get a specific ayah
const ayah = getAyah(1, 1); // Al-Fatiha, first ayah
console.log(ayah.text); // "بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ"

// Get a complete surah
const surah = getSurah(18); // Al-Kahf
console.log(surah.name); // "الكهف"
console.log(surah.englishName); // "Al-Kahf"
console.log(surah.numberOfAyahs); // 110
```

### ES Modules (Modern JavaScript)

```javascript
import { getAyah, getSurah, searchText, getJuz, getAyahRange } from '@muslims-community/quran';

// Get random ayah
import { getRandomAyah } from '@muslims-community/quran';
const randomAyah = getRandomAyah();
console.log(randomAyah.text);

// Get a range of ayat
const range = getAyahRange(2, 1, 5); // Al-Baqarah 1-5
console.log(`Reading ${range.range.count} ayat from ${range.surah.englishName}`);

// Get complete Juz for daily reading
const juz1 = getJuz(1);
console.log(`Juz 1 contains ${juz1.totalAyat} ayat`);

// Search for text
const results = searchText('الله');
console.log(`Found ${results.totalResults} ayat containing "الله"`);
```

### TypeScript

```typescript
import { getAyah, Surah, AyahWithSurah } from '@muslims-community/quran';

const ayah: AyahWithSurah = getAyah(2, 255); // Ayat al-Kursi
const surah: Surah = getSurah(112); // Al-Ikhlas
```

## API Reference

### `getAyah(surahId: number, ayahId: number): AyahWithSurah`

Retrieves a specific ayah from the Quran.

**Parameters:**
- `surahId` (1-114): The surah number
- `ayahId` (1-n): The ayah number within the surah

**Returns:**
```javascript
{
  id: 1,
  text: "بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ",
  sajdah: false,
  surah: {
    id: 1,
    name: "الفاتحة",
    englishName: "Al-Fatiha",
    revelationType: "Meccan"
  },
  source: "Tanzil Project - https://tanzil.net"
}
```

### `getSurah(surahId: number): Surah`

Retrieves a complete surah with all its ayat.

**Parameters:**
- `surahId` (1-114): The surah number

**Returns:**
```javascript
{
  id: 1,
  name: "الفاتحة",
  englishName: "Al-Fatiha",
  revelationType: "Meccan",
  numberOfAyahs: 7,
  ayat: [
    { id: 1, text: "بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ", sajdah: false },
    // ... more ayat
  ],
  source: "Tanzil Project - https://tanzil.net"
}
```

### `searchText(searchTerm: string): SearchResult`

Searches for Arabic text within the Quran.

**Parameters:**
- `searchTerm`: Arabic text to search for

**Returns:**
```javascript
{
  results: [
    {
      id: 1,
      text: "بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ",
      sajdah: false,
      surah: { id: 1, name: "الفاتحة", englishName: "Al-Fatiha", revelationType: "Meccan" }
    }
    // ... more results
  ],
  searchTerm: "الله",
  totalResults: 2699,
  source: "Tanzil Project - https://tanzil.net"
}
```

### `getRandomAyah(): AyahWithSurah`

Returns a random ayah from the Quran.

### `getSajdahAyat(): SajdahResult`

Returns all ayat where sajdah (prostration) is recommended.

### `getQuranData(): QuranData`

Returns the complete Quran dataset.

## 🚀 Enhanced Functions (v1.1.0)

### `getAyahRange(surahId: number, startAyah: number, endAyah: number): AyahRange`

Get a range of ayat from a specific surah - perfect for reading applications.

**Parameters:**
- `surahId` (1-114): The surah number
- `startAyah`: Starting ayah number
- `endAyah`: Ending ayah number

**Returns:**
```javascript
{
  surah: { id: 2, name: "البقرة", englishName: "Al-Baqarah", revelationType: "Medinan" },
  range: { start: 1, end: 5, count: 5 },
  ayat: [
    { id: 1, text: "الم", juz: 1, hizb: 1, sajdah: false },
    // ... more ayat
  ],
  source: "Tanzil Project - https://tanzil.net"
}
```

### `getJuz(juzNumber: number): JuzResult`

Get all ayat from a specific Juz (Para) - essential for daily reading schedules.

**Parameters:**
- `juzNumber` (1-30): The Juz number

**Returns:**
```javascript
{
  juz: 1,
  totalAyat: 148,
  ayat: [ /* all ayat in Juz 1 */ ],
  source: "Tanzil Project - https://tanzil.net"
}
```

### `getHizb(hizbNumber: number): HizbResult`

Get all ayat from a specific Hizb - for precise reading portions.

**Parameters:**
- `hizbNumber` (1-60): The Hizb number

**Returns:**
```javascript
{
  hizb: 1,
  juz: 1,
  totalAyat: 74,
  ayat: [ /* all ayat in Hizb 1 */ ],
  source: "Tanzil Project - https://tanzil.net"
}
```

### `searchBySurahName(name: string): SurahSearchResult`

Search for surahs by Arabic or English name.

**Parameters:**
- `name`: Surah name to search for (supports partial matching)

**Returns:**
```javascript
{
  searchTerm: "Fatiha",
  totalResults: 1,
  results: [
    {
      id: 1,
      name: "الفاتحة",
      englishName: "Al-Fatiha",
      revelationType: "Meccan",
      numberOfAyahs: 7,
      // ... complete surah data
    }
  ],
  source: "Tanzil Project - https://tanzil.net"
}
```

### `getSurahStatistics(): SurahStatistics`

Get comprehensive statistics about the Quran - perfect for educational apps.

**Returns:**
```javascript
{
  totalSurahs: 114,
  totalAyat: 6236,
  meccanSurahs: 86,
  medinanSurahs: 28,
  averageAyatPerSurah: 54.7,
  longestSurah: { id: 2, name: "البقرة", englishName: "Al-Baqarah", numberOfAyahs: 286 },
  shortestSurah: { id: 103, name: "العصر", englishName: "Al-'Asr", numberOfAyahs: 3 },
  ayatCounts: {
    min: 3,
    max: 286,
    distribution: { 3: 1, 4: 2, 5: 2, /* ... */ }
  },
  source: "Tanzil Project - https://tanzil.net"
}
```

## Usage Examples

### React Component

```jsx
import React, { useState, useEffect } from 'react';
import { getRandomAyah } from '@muslims-community/quran';

function DailyAyah() {
  const [ayah, setAyah] = useState(null);

  useEffect(() => {
    setAyah(getRandomAyah());
  }, []);

  if (!ayah) return <div>Loading...</div>;

  return (
    <div className="daily-ayah">
      <p className="arabic-text">{ayah.text}</p>
      <p className="surah-info">
        {ayah.surah.englishName} ({ayah.surah.name}) - Ayah {ayah.id}
      </p>
      <small>{ayah.source}</small>
    </div>
  );
}
```

### Search Implementation

```javascript
import { searchText } from '@muslims-community/quran';

function searchQuran(query) {
  try {
    const results = searchText(query);
    console.log(`Found ${results.totalResults} results for "${query}"`);

    results.results.forEach(ayah => {
      console.log(`${ayah.surah.englishName} ${ayah.id}: ${ayah.text}`);
    });
  } catch (error) {
    console.error('Search error:', error.message);
  }
}

searchQuran('الرحمن'); // Search for "Ar-Rahman"
```

### Sajdah Ayat

```javascript
import { getSajdahAyat } from '@muslims-community/quran';

const sajdahVerses = getSajdahAyat();
console.log(`Total sajdah ayat: ${sajdahVerses.totalSajdahAyat}`);

sajdahVerses.sajdahAyat.forEach(ayah => {
  console.log(`${ayah.surah.englishName} ${ayah.id}: ${ayah.text}`);
});
```

### Daily Juz Reading App

```javascript
import { getJuz, getSurahStatistics } from '@muslims-community/quran';

function createReadingPlan() {
  const stats = getSurahStatistics();
  console.log(`📖 Complete Quran: ${stats.totalAyat} ayat in ${stats.totalSurahs} surahs`);

  // 30-day reading plan
  for (let day = 1; day <= 30; day++) {
    const juz = getJuz(day);
    console.log(`Day ${day}: Juz ${juz.juz} - ${juz.totalAyat} ayat`);
  }
}
```

### Range Reading for Study

```javascript
import { getAyahRange, searchBySurahName } from '@muslims-community/quran';

// Find and read specific sections
const kahfSurah = searchBySurahName('Kahf').results[0];
const opening = getAyahRange(kahfSurah.id, 1, 10);

console.log(`Reading opening of ${opening.surah.englishName}:`);
opening.ayat.forEach((ayah, index) => {
  console.log(`${index + 1}. ${ayah.text}`);
});
```

### Quran Statistics Dashboard

```javascript
import { getSurahStatistics, getJuz, getHizb } from '@muslims-community/quran';

function generateDashboard() {
  const stats = getSurahStatistics();

  return {
    overview: {
      totalSurahs: stats.totalSurahs,
      totalAyat: stats.totalAyat,
      averageLength: stats.averageAyatPerSurah
    },
    breakdown: {
      meccan: stats.meccanSurahs,
      medinan: stats.medinanSurahs,
      longest: stats.longestSurah.englishName,
      shortest: stats.shortestSurah.englishName
    },
    reading: {
      juzCount: 30,
      hizbCount: 60,
      dailyAverage: Math.round(stats.totalAyat / 30)
    }
  };
}
```

## Data Structure

The package includes complete Quranic text with the following metadata for each ayah:

- **Arabic text** (Uthmani script with minimal diacritics)
- **Surah information** (Arabic name, English name, revelation type)
- **Sajdah markers** (prostration verses)
- **Bismillah markers** (where applicable)

## Text Source & License

### Quran Text
- **Source**: [Tanzil Project](https://tanzil.net) - Uthmani Minimal, Version 1.1
- **License**: Creative Commons Attribution 3.0
- **Terms**: The Quran text cannot be modified. Source attribution to Tanzil Project is required.

### Package License
- **License**: MIT License
- **Usage**: Free for commercial and non-commercial use

## Contributing

We welcome contributions! Please see our [GitHub repository](https://github.com/Muslims-Community/quran-data-js) for:

- 🐛 Bug reports
- 💡 Feature requests
- 📖 Documentation improvements
- 🧪 Test additions

## Support

- 📚 [Documentation](https://github.com/Muslims-Community/quran-data-js#readme)
- 🐛 [Issues](https://github.com/Muslims-Community/quran-data-js/issues)
- 💬 [Discussions](https://github.com/Muslims-Community/quran-data-js/discussions)

## Related Projects

This package serves as the foundational data layer for the Muslims Community ecosystem:

- 🌐 **Quran API** - RESTful API built on this package
- 📱 **Mobile Apps** - React Native applications
- 🖥️ **Web Apps** - Next.js and React applications

---

**Made with ❤️ by [Muslims Community](https://github.com/Muslims-Community)**

*"And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?"* - Al-Qamar 54:17