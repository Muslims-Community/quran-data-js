# @muslims-community/quran

[![npm version](https://badge.fury.io/js/@muslims-community%2Fquran.svg)](https://badge.fury.io/js/@muslims-community%2Fquran)
[![downloads](https://img.shields.io/npm/dm/@muslims-community/quran.svg)](https://www.npmjs.com/package/@muslims-community/quran)
[![license](https://img.shields.io/npm/l/@muslims-community/quran.svg)](https://github.com/Muslims-Community/quran-data-js/blob/master/LICENSE)

**The most comprehensive, lightweight, and offline-first Quran data package for JavaScript applications.**

🚀 **Zero dependencies** • 📱 **Universal compatibility** • 🌐 **Offline-first** • 📖 **Complete Quran** • 🔍 **Full-text search** • 📚 **Tanzil authentic** • 🧩 **TypeScript ready** • 🎯 **Tree-shakable**

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🚀 **Zero Dependencies** | No external dependencies, self-contained package |
| 📱 **Universal Platform** | Works seamlessly in Node.js, browsers, React, Vue, React Native, and more |
| 🌐 **Offline-First** | Complete Quran text included, no network requests required |
| 📖 **Complete Dataset** | All 114 surahs with 6,236 ayat, 30 Juz, 60 Hizb divisions |
| 🔍 **Powerful Search** | Built-in Arabic text search and intelligent surah discovery |
| 📚 **Authentic Source** | Based on official [Tanzil Project](https://tanzil.net) Uthmani minimal text |
| 🧩 **TypeScript Ready** | Complete TypeScript definitions with detailed JSDoc documentation |
| 🎯 **Tree-Shakable** | ES modules support for optimal bundle sizes in modern applications |
| 📊 **Rich Analytics** | Comprehensive statistics and insights for educational applications |
| ⚡ **Performance** | Optimized data structure with efficient lookup algorithms |

## 🚀 Quick Installation

```bash
npm install @muslims-community/quran
```

## 📖 Quick Start

### Basic Usage

```javascript
import { getAyah, getSurah, searchText } from '@muslims-community/quran';

// Get Ayat al-Kursi
const ayatAlKursi = getAyah(2, 255);
console.log(ayatAlKursi.text);

// Get complete Al-Fatiha
const alFatiha = getSurah(1);
console.log(`${alFatiha.englishName}: ${alFatiha.numberOfAyahs} ayat`);

// Search for "Allah"
const results = searchText('الله');
console.log(`Found ${results.totalResults} ayat containing "الله"`);
```

### Enhanced Functions (v1.1.0) 🆕

```javascript
import { getJuz, getAyahRange, getSurahStatistics, searchBySurahName } from '@muslims-community/quran';

// Daily Juz reading
const juz1 = getJuz(1);
console.log(`Juz 1: ${juz1.totalAyat} ayat`);

// Range reading for study
const range = getAyahRange(18, 1, 10); // Al-Kahf 1-10
console.log(`Reading ${range.range.count} ayat from ${range.surah.englishName}`);

// Find surahs easily
const kahf = searchBySurahName('Cave'); // Finds Al-Kahf
console.log(`Found: ${kahf.results[0].englishName}`);

// Get comprehensive statistics
const stats = getSurahStatistics();
console.log(`📊 ${stats.totalSurahs} surahs, ${stats.totalAyat} ayat`);
```

## 📚 Complete Documentation

### 🎯 **Getting Started**
- 📋 **[API Overview](docs/api-overview.md)** - Complete function reference with examples
- 🚀 **[Quick Start Guide](docs/quick-start.md)** - Get up and running in minutes
- 🔗 **[TypeScript Guide](docs/typescript.md)** - Full type safety and IntelliSense

### 🔧 **Core Functions**
- 📖 **[Basic Functions](docs/basic-functions.md)** - `getAyah()`, `getSurah()`, `getQuranData()`
- 🔍 **[Search Functions](docs/search-functions.md)** - `searchText()`, `searchBySurahName()`
- 🎲 **[Random & Special](docs/random-special.md)** - `getRandomAyah()`, `getSajdahAyat()`

### 🚀 **Enhanced Functions (v1.1.0)**
- 📑 **[Range Reading](docs/range-reading.md)** - `getAyahRange()` for reading applications
- 📚 **[Juz & Hizb Guide](docs/juz-hizb.md)** - `getJuz()`, `getHizb()` for daily reading plans
- 📊 **[Statistics Guide](docs/statistics.md)** - `getSurahStatistics()` for analytics and insights

### 🛠️ **Advanced Usage**
- ⚛️ **[React Integration](docs/react-guide.md)** - Building React apps with hooks and components
- 🟢 **[Node.js Guide](docs/nodejs-guide.md)** - Server-side usage patterns and APIs
- 🎨 **[UI Components](docs/ui-components.md)** - Ready-to-use interface components
- 🔧 **[Performance Tips](docs/performance.md)** - Optimization strategies for large apps

### 📖 **Understanding the Data**
- 🏗️ **[Data Structure](docs/data-structure.md)** - Understanding Quran data format and organization
- 🕌 **[Islamic Concepts](docs/islamic-concepts.md)** - Juz, Hizb, Sajdah, and revelation context
- 🌍 **[Internationalization](docs/i18n.md)** - Multi-language support and text direction

## 🎯 **Complete API Reference**

### Core Functions

| Function | Purpose | Returns | Version |
|----------|---------|---------|---------|
| `getAyah(surahId, ayahId)` | Get specific ayah with metadata | `AyahWithSurah` | 1.0.0 |
| `getSurah(surahId)` | Get complete surah with all ayat | `Surah` | 1.0.0 |
| `getQuranData()` | Get complete Quran dataset | `QuranData` | 1.0.0 |
| `searchText(searchTerm)` | Search Arabic text across Quran | `SearchResult` | 1.0.0 |
| `getRandomAyah()` | Get random ayah for inspiration | `AyahWithSurah` | 1.0.0 |
| `getSajdahAyat()` | Get all prostration verses | `SajdahResult` | 1.0.0 |

### Enhanced Functions (v1.1.0) 🆕

| Function | Purpose | Returns | Use Case |
|----------|---------|---------|----------|
| `getAyahRange(surahId, start, end)` | Get consecutive ayat range | `AyahRange` | Reading apps, study sessions |
| `getJuz(juzNumber)` | Get complete Juz (1-30) | `JuzResult` | Daily reading, progress tracking |
| `getHizb(hizbNumber)` | Get complete Hizb (1-60) | `HizbResult` | Flexible reading portions |
| `searchBySurahName(name)` | Find surahs by name | `SurahSearchResult` | Surah discovery, navigation |
| `getSurahStatistics()` | Get comprehensive stats | `SurahStatistics` | Analytics, educational insights |

## 🎨 **Practical Examples**

### Daily Reading App with Progress Tracking

```javascript
import { getJuz, getSurahStatistics } from '@muslims-community/quran';

class QuranReadingPlan {
  constructor() {
    this.stats = getSurahStatistics();
  }

  // Get today's reading based on date
  getTodayReading() {
    const day = new Date().getDate();
    const juzNumber = ((day - 1) % 30) + 1;
    const juz = getJuz(juzNumber);

    return {
      day: day,
      juz: juzNumber,
      totalAyat: juz.totalAyat,
      estimatedMinutes: Math.round(juz.totalAyat / 2),
      progress: Math.round((juzNumber / 30) * 100),
      ayat: juz.ayat
    };
  }

  // Generate 30-day reading schedule
  getCompleteSchedule() {
    return Array.from({ length: 30 }, (_, i) => {
      const juz = getJuz(i + 1);
      return {
        day: i + 1,
        juz: i + 1,
        ayatCount: juz.totalAyat,
        estimatedTime: `${Math.round(juz.totalAyat / 2)} mins`
      };
    });
  }
}

const readingPlan = new QuranReadingPlan();
const todayReading = readingPlan.getTodayReading();
console.log(`📅 Day ${todayReading.day}: Read Juz ${todayReading.juz} (${todayReading.estimatedMinutes} mins)`);
```

### Advanced Search Interface

```javascript
import { searchText, searchBySurahName, getAyahRange } from '@muslims-community/quran';

class QuranSearch {
  // Intelligent search with context
  async smartSearch(query) {
    // Try surah name first
    const surahResults = searchBySurahName(query);
    if (surahResults.totalResults > 0) {
      return {
        type: 'surah',
        query,
        results: surahResults.results,
        suggestion: `Found ${surahResults.totalResults} surah(s) matching "${query}"`
      };
    }

    // Then try text search
    const textResults = searchText(query);
    if (textResults.totalResults > 0) {
      // Add context to results
      const enhancedResults = textResults.results.slice(0, 20).map(ayah => ({
        ...ayah,
        context: this.getContext(ayah.surah.id, ayah.id)
      }));

      return {
        type: 'text',
        query,
        results: enhancedResults,
        totalResults: textResults.totalResults,
        suggestion: `Found ${textResults.totalResults} ayat containing "${query}"`
      };
    }

    return {
      type: 'none',
      query,
      results: [],
      suggestion: `No results found for "${query}". Try "الله", "رب", or surah names like "Fatiha"`
    };
  }

  // Get context around found ayah
  getContext(surahId, ayahId, contextSize = 1) {
    try {
      const start = Math.max(1, ayahId - contextSize);
      const end = ayahId + contextSize;
      return getAyahRange(surahId, start, end);
    } catch (error) {
      return null;
    }
  }
}

const search = new QuranSearch();
const results = await search.smartSearch('Cave');
console.log(results.suggestion);
```

### Educational Statistics Dashboard

```javascript
import { getSurahStatistics, getJuz } from '@muslims-community/quran';

class QuranAnalytics {
  constructor() {
    this.stats = getSurahStatistics();
  }

  generateInsights() {
    // Reading time calculations
    const avgReadingSpeed = 2; // ayat per minute
    const totalMinutes = Math.round(this.stats.totalAyat / avgReadingSpeed);

    // Juz analysis
    const juzSizes = Array.from({ length: 30 }, (_, i) => {
      const juz = getJuz(i + 1);
      return juz.totalAyat;
    });

    const avgJuzSize = Math.round(juzSizes.reduce((a, b) => a + b, 0) / 30);

    return {
      overview: {
        totalSurahs: this.stats.totalSurahs,
        totalAyat: this.stats.totalAyat.toLocaleString(),
        readingTime: `${Math.round(totalMinutes / 60)} hours`,
        dailyReadingPlan: `${Math.round(totalMinutes / 30)} minutes/day for 30 days`
      },

      revelation: {
        meccan: `${this.stats.meccanSurahs} surahs (${Math.round(this.stats.meccanSurahs/114*100)}%)`,
        medinan: `${this.stats.medinanSurahs} surahs (${Math.round(this.stats.medinanSurahs/114*100)}%)`,
        meccanAvgLength: Math.round(this.stats.revelationAnalysis.meccanCharacteristics.averageLength),
        medinanAvgLength: Math.round(this.stats.revelationAnalysis.medinanCharacteristics.averageLength)
      },

      structure: {
        longest: `${this.stats.longestSurah.englishName} (${this.stats.longestSurah.numberOfAyahs} ayat)`,
        shortest: `${this.stats.shortestSurah.englishName} (${this.stats.shortestSurah.numberOfAyahs} ayat)`,
        averageLength: `${this.stats.averageAyatPerSurah} ayat per surah`,
        juzSystem: `30 Juz averaging ${avgJuzSize} ayat each`
      },

      interestingFacts: [
        `The longest surah is ${Math.round(this.stats.longestSurah.numberOfAyahs / this.stats.shortestSurah.numberOfAyahs)}x longer than the shortest`,
        `Meccan surahs average ${Math.round(this.stats.revelationAnalysis.meccanCharacteristics.averageLength)} ayat vs ${Math.round(this.stats.revelationAnalysis.medinanCharacteristics.averageLength)} for Medinan`,
        `Reading 1 Juz daily completes the Quran in exactly 30 days`,
        `The most common surah length is ${this.stats.ayatCounts.mode} ayat`
      ]
    };
  }
}

const analytics = new QuranAnalytics();
const insights = analytics.generateInsights();
console.log('📊 Quran Insights:', insights);
```

## 🎨 **Framework Integration Examples**

### React Hook for Daily Reading

```jsx
import { useState, useEffect } from 'react';
import { getJuz, getRandomAyah } from '@muslims-community/quran';

function useDailyQuran() {
  const [dailyReading, setDailyReading] = useState(null);
  const [inspirationalAyah, setInspirationalAyah] = useState(null);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const juzNumber = ((dayOfYear - 1) % 30) + 1;

    setDailyReading(getJuz(juzNumber));
    setInspirationalAyah(getRandomAyah());
  }, []);

  return { dailyReading, inspirationalAyah };
}

// Usage in component
function DailyQuranComponent() {
  const { dailyReading, inspirationalAyah } = useDailyQuran();

  if (!dailyReading || !inspirationalAyah) {
    return <div className="loading">Loading today's reading...</div>;
  }

  return (
    <div className="daily-quran">
      <section className="daily-reading">
        <h2>📖 Today's Reading - Juz {dailyReading.juz}</h2>
        <p>{dailyReading.totalAyat} ayat • ~{Math.round(dailyReading.totalAyat / 2)} minutes</p>

        <div className="ayat-preview">
          {dailyReading.ayat.slice(0, 3).map(ayah => (
            <div key={`${ayah.surah.id}-${ayah.id}`} className="ayah">
              <p className="arabic">{ayah.text}</p>
              <small>{ayah.surah.englishName} {ayah.id}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="inspiration">
        <h3>💡 Inspiration</h3>
        <blockquote className="arabic">{inspirationalAyah.text}</blockquote>
        <cite>{inspirationalAyah.surah.englishName} {inspirationalAyah.id}</cite>
      </section>
    </div>
  );
}
```

### Vue.js Composition API

```vue
<template>
  <div class="quran-search">
    <input
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Search Quran..."
      class="search-input"
    />

    <div v-if="loading" class="loading">Searching...</div>

    <div v-else-if="results.length" class="results">
      <div
        v-for="result in results"
        :key="`${result.surah.id}-${result.id}`"
        class="result-item"
      >
        <p class="arabic">{{ result.text }}</p>
        <small>{{ result.surah.englishName }} {{ result.id }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { searchText, searchBySurahName } from '@muslims-community/quran';

const searchQuery = ref('');
const results = ref([]);
const loading = ref(false);

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    results.value = [];
    return;
  }

  loading.value = true;

  try {
    // Try surah search first
    const surahResults = searchBySurahName(searchQuery.value);
    if (surahResults.totalResults > 0) {
      results.value = surahResults.results[0].ayat.slice(0, 10);
    } else {
      // Fall back to text search
      const textResults = searchText(searchQuery.value);
      results.value = textResults.results.slice(0, 20);
    }
  } catch (error) {
    console.error('Search error:', error);
    results.value = [];
  } finally {
    loading.value = false;
  }
};
</script>
```

### Express.js API Server

```javascript
const express = require('express');
const cors = require('cors');
const {
  getAyah,
  getSurah,
  searchText,
  getJuz,
  getSurahStatistics,
  searchBySurahName
} = require('@muslims-community/quran');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ayah endpoints
app.get('/api/ayah/:surahId/:ayahId', (req, res) => {
  try {
    const { surahId, ayahId } = req.params;
    const ayah = getAyah(parseInt(surahId), parseInt(ayahId));
    res.json({ success: true, data: ayah });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Surah endpoints
app.get('/api/surah/:id', (req, res) => {
  try {
    const surah = getSurah(parseInt(req.params.id));
    res.json({ success: true, data: surah });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Search endpoints
app.get('/api/search/text/:term', (req, res) => {
  try {
    const results = searchText(decodeURIComponent(req.params.term));
    res.json({
      success: true,
      data: {
        ...results,
        results: results.results.slice(0, 50) // Limit for API response
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/search/surah/:name', (req, res) => {
  try {
    const results = searchBySurahName(decodeURIComponent(req.params.name));
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Juz endpoints
app.get('/api/juz/:number', (req, res) => {
  try {
    const juz = getJuz(parseInt(req.params.number));
    res.json({ success: true, data: juz });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Statistics endpoint
app.get('/api/statistics', (req, res) => {
  try {
    const stats = getSurahStatistics();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Quran API is running',
    version: '1.1.0',
    endpoints: [
      'GET /api/ayah/:surahId/:ayahId',
      'GET /api/surah/:id',
      'GET /api/search/text/:term',
      'GET /api/search/surah/:name',
      'GET /api/juz/:number',
      'GET /api/statistics'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Quran API server running on port ${PORT}`);
  console.log(`📖 Documentation: http://localhost:${PORT}/api/health`);
});

module.exports = app;
```

## 🌍 **Platform Compatibility**

| Platform | Support | Installation | Import Method |
|----------|---------|--------------|---------------|
| **Node.js** | ✅ Full | `npm install` | `require()` or `import` |
| **Browsers** | ✅ Full | CDN or bundler | `import` from ES modules |
| **React** | ✅ Full | `npm install` | `import` with hooks/components |
| **React Native** | ✅ Full | `npm install` | `import` (Metro bundler) |
| **Vue.js** | ✅ Full | `npm install` | `import` with Composition API |
| **Angular** | ✅ Full | `npm install` | `import` in services |
| **Next.js** | ✅ Full | `npm install` | SSR/SSG compatible |
| **Nuxt.js** | ✅ Full | `npm install` | Universal mode support |
| **Electron** | ✅ Full | `npm install` | Both main/renderer processes |
| **Svelte** | ✅ Full | `npm install` | `import` in components |

## 📊 **Package Stats & Performance**

| Metric | Value | Description |
|--------|-------|-------------|
| **Bundle Size** | ~310 KB | Optimized with tree-shaking |
| **Unpacked Size** | ~2.0 MB | Complete Quran data included |
| **Dependencies** | 0 | Zero external dependencies |
| **TypeScript** | 100% | Complete type definitions |
| **Functions** | 11 total | 6 core + 5 enhanced (v1.1.0) |
| **Test Coverage** | 95%+ | Comprehensive test suite |
| **Performance** | ⚡ Fast | Optimized lookup algorithms |
| **Memory Usage** | Low | Efficient data structures |

## 🔄 **Changelog & Versions**

### 🆕 **v1.1.0** (Latest) - Enhanced Functions Phase 1
- ✅ **5 New Functions**: `getAyahRange()`, `getJuz()`, `getHizb()`, `searchBySurahName()`, `getSurahStatistics()`
- ✅ **Enhanced Data**: Juz/Hizb mapping, revelation chronology
- ✅ **TypeScript**: Complete definitions for all functions
- ✅ **Documentation**: Comprehensive wiki guides
- ✅ **Testing**: 86% increased test coverage
- ✅ **Backward Compatible**: All v1.0.x code continues to work

### **v1.0.1** - Repository & Links Update
- 🔧 Fixed repository URLs and documentation links

### **v1.0.0** - Initial Release
- ✅ **6 Core Functions**: Complete Quran access and search
- ✅ **Complete Dataset**: All 114 surahs, 6,236 ayat
- ✅ **Universal Compatibility**: Node.js, browsers, frameworks
- ✅ **TypeScript Support**: Full type definitions
- ✅ **Authentic Source**: Tanzil Project Uthmani text

**📋 [View Complete Changelog](CHANGELOG.md)**

## 🤝 **Contributing & Community**

We welcome contributions from the Muslim developer community and beyond!

### **Ways to Contribute**
- 🐛 **[Report Bugs](https://github.com/Muslims-Community/quran-data-js/issues)** - Help us improve quality
- 💡 **[Request Features](https://github.com/Muslims-Community/quran-data-js/discussions)** - Suggest new functionality
- 📖 **[Improve Documentation](https://github.com/Muslims-Community/quran-data-js/tree/master/docs)** - Help others learn
- 🧪 **[Add Tests](https://github.com/Muslims-Community/quran-data-js/tree/master/tests)** - Increase reliability
- 🌍 **[Translate Docs](https://github.com/Muslims-Community/quran-data-js/issues)** - Make it accessible globally

### **Development Setup**
```bash
git clone https://github.com/Muslims-Community/quran-data-js.git
cd quran-data-js
npm install
npm test
```

### **Community Resources**
- 🏠 **[Homepage](https://github.com/Muslims-Community/quran-data-js)**
- 📚 **[Documentation](docs/README.md)**
- 🐛 **[Issues](https://github.com/Muslims-Community/quran-data-js/issues)**
- 💬 **[Discussions](https://github.com/Muslims-Community/quran-data-js/discussions)**
- 📧 **[Contact](mailto:contact@muslims-community.org)** (coming soon)

## 📜 **License & Attribution**

### **Package License**
- **MIT License** - Free for commercial and non-commercial use
- **No restrictions** on distribution, modification, or private use

### **Quran Text License**
- **Source**: [Tanzil Project](https://tanzil.net) - Uthmani Minimal v1.1
- **License**: Creative Commons Attribution 3.0
- **Requirements**: Attribution to Tanzil Project must be maintained
- **Restrictions**: Quran text cannot be modified

## 🚀 **What's Next?**

### **Roadmap v1.2.0** (Coming Soon)
- 🧭 **Navigation Functions**: `getNextAyah()`, `getPreviousAyah()`, `getNextSurah()`
- 🔍 **Advanced Search**: Fuzzy search, filters, relevance scoring
- 📖 **Reading Plans**: Automated plan generators for different schedules
- 📱 **Mobile Optimizations**: React Native specific enhancements

### **Roadmap v1.3.0** (Planned)
- 🏷️ **Thematic Organization**: Group ayat by themes and topics
- 📊 **Word Analytics**: Frequency analysis and word-level insights
- 📤 **Export Functions**: JSON, CSV, and other format exports
- 🔗 **Cross-References**: Link related ayat and concepts

### **Future Vision v2.0.0**
- 🌍 **Translation Integration**: Multiple language support
- 🎵 **Audio Data**: Recitation integration capabilities
- 🤖 **AI Features**: Smart recommendations and insights
- ☁️ **Cloud Sync**: Optional online features and synchronization

---

## 💝 **Made with Love by Muslims Community**

This package is created and maintained by developers who love both code and the Quran. Our mission is to make Quranic knowledge easily accessible through modern technology while maintaining the highest standards of authenticity and respect.

### **Islamic Values in Development**
- ✅ **Authenticity**: Using verified Tanzil Project text
- ✅ **Accessibility**: Making Quran available to all developers
- ✅ **Quality**: Following best practices in software development
- ✅ **Community**: Encouraging collaboration and knowledge sharing
- ✅ **Respect**: Maintaining the sanctity and accuracy of Quranic text

---

*"And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?"* - **Al-Qamar 54:17**

[![GitHub stars](https://img.shields.io/github/stars/Muslims-Community/quran-data-js?style=social)](https://github.com/Muslims-Community/quran-data-js/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Muslims-Community/quran-data-js?style=social)](https://github.com/Muslims-Community/quran-data-js/network/members)
