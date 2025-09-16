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
import { getAyah, getSurah, searchText } from '@muslims-community/quran';

// Get random ayah
import { getRandomAyah } from '@muslims-community/quran';
const randomAyah = getRandomAyah();
console.log(randomAyah.text);

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