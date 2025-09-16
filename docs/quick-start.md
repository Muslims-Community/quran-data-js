# Quick Start Guide

Get up and running with `@muslims-community/quran` in minutes.

## 🚀 Installation

```bash
npm install @muslims-community/quran
```

## 📖 Basic Usage

### **1. Get Individual Ayah**

```javascript
import { getAyah } from '@muslims-community/quran';

// Get Al-Fatiha, first ayah (Bismillah)
const bismillah = getAyah(1, 1);
console.log(bismillah.text); // "بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ"
console.log(bismillah.surah.englishName); // "Al-Fatiha"

// Get Ayat al-Kursi
const ayatAlKursi = getAyah(2, 255);
console.log(ayatAlKursi.text); // Complete Ayat al-Kursi text
console.log(`Juz: ${ayatAlKursi.juz}, Hizb: ${ayatAlKursi.hizb}`);
```

### **2. Get Complete Surah**

```javascript
import { getSurah } from '@muslims-community/quran';

// Get Al-Ikhlas (complete surah)
const alIkhlas = getSurah(112);
console.log(`${alIkhlas.englishName} (${alIkhlas.name})`);
console.log(`${alIkhlas.numberOfAyahs} ayat, ${alIkhlas.revelationType}`);

// Display all ayat
alIkhlas.ayat.forEach((ayah, index) => {
  console.log(`${index + 1}. ${ayah.text}`);
});
```

### **3. Search for Text**

```javascript
import { searchText } from '@muslims-community/quran';

// Search for "Allah" (الله)
const results = searchText('الله');
console.log(`Found ${results.totalResults} ayat containing "الله"`);

// Display first 5 results
results.results.slice(0, 5).forEach(ayah => {
  console.log(`${ayah.surah.englishName} ${ayah.id}: ${ayah.text}`);
});
```

## 📚 Enhanced Functions (v1.1.0)

### **4. Range Reading**

```javascript
import { getAyahRange } from '@muslims-community/quran';

// Read first 5 ayat of Al-Baqarah
const opening = getAyahRange(2, 1, 5);
console.log(`Reading ${opening.range.count} ayat from ${opening.surah.englishName}:`);

opening.ayat.forEach(ayah => {
  console.log(`${ayah.id}. ${ayah.text}`);
});
```

### **5. Daily Juz Reading**

```javascript
import { getJuz } from '@muslims-community/quran';

// Get today's Juz (example: Juz 1)
const juz1 = getJuz(1);
console.log(`Today's reading: Juz ${juz1.juz}`);
console.log(`Total ayat: ${juz1.totalAyat}`);
console.log(`Estimated reading time: ${Math.round(juz1.totalAyat / 2)} minutes`);

// Show first few ayat
juz1.ayat.slice(0, 3).forEach(ayah => {
  console.log(`${ayah.surah.englishName} ${ayah.id}: ${ayah.text}`);
});
```

### **6. Find Surahs**

```javascript
import { searchBySurahName } from '@muslims-community/quran';

// Find surah by English name
const kahf = searchBySurahName('Kahf');
console.log(`Found: ${kahf.results[0].englishName} (${kahf.results[0].name})`);

// Find by Arabic name
const baqarah = searchBySurahName('البقرة');
console.log(`Found: ${baqarah.results[0].englishName} - ${baqarah.results[0].numberOfAyahs} ayat`);
```

### **7. Get Statistics**

```javascript
import { getSurahStatistics } from '@muslims-community/quran';

const stats = getSurahStatistics();
console.log('📊 Quran Overview:');
console.log(`• ${stats.totalSurahs} surahs, ${stats.totalAyat} ayat`);
console.log(`• ${stats.meccanSurahs} Meccan, ${stats.medinanSurahs} Medinan`);
console.log(`• Average: ${stats.averageAyatPerSurah} ayat per surah`);
console.log(`• Longest: ${stats.longestSurah.englishName} (${stats.longestSurah.numberOfAyahs} ayat)`);
console.log(`• Shortest: ${stats.shortestSurah.englishName} (${stats.shortestSurah.numberOfAyahs} ayat)`);
```

## 🎯 Common Use Cases

### **Daily Reading App**

```javascript
import { getJuz, getRandomAyah } from '@muslims-community/quran';

function createDailyReading() {
  // Get today's Juz (you could use current date logic)
  const dayOfMonth = new Date().getDate();
  const juzNumber = ((dayOfMonth - 1) % 30) + 1;

  const dailyJuz = getJuz(juzNumber);
  const inspirationalAyah = getRandomAyah();

  return {
    dailyReading: {
      title: `Day ${dayOfMonth} - Juz ${juzNumber}`,
      totalAyat: dailyJuz.totalAyat,
      estimatedMinutes: Math.round(dailyJuz.totalAyat / 2),
      ayat: dailyJuz.ayat
    },
    inspiration: {
      text: inspirationalAyah.text,
      reference: `${inspirationalAyah.surah.englishName} ${inspirationalAyah.id}`,
      isSpecial: inspirationalAyah.sajdah ? 'Sajdah verse' : null
    }
  };
}

const todayReading = createDailyReading();
console.log(todayReading.dailyReading.title);
console.log(`📖 ${todayReading.dailyReading.totalAyat} ayat (~${todayReading.dailyReading.estimatedMinutes} mins)`);
console.log(`💡 Today's inspiration: ${todayReading.inspiration.reference}`);
```

### **Simple Search Interface**

```javascript
import { searchText, searchBySurahName } from '@muslims-community/quran';

function quickSearch(query) {
  // Try surah name search first
  const surahResults = searchBySurahName(query);
  if (surahResults.totalResults > 0) {
    return {
      type: 'surah',
      results: surahResults.results.map(surah => ({
        title: `${surah.englishName} (${surah.name})`,
        subtitle: `${surah.numberOfAyahs} ayat, ${surah.revelationType}`,
        data: surah
      }))
    };
  }

  // Then try text search
  const textResults = searchText(query);
  if (textResults.totalResults > 0) {
    return {
      type: 'text',
      results: textResults.results.slice(0, 10).map(ayah => ({
        title: `${ayah.surah.englishName} ${ayah.id}`,
        subtitle: ayah.text.substring(0, 80) + (ayah.text.length > 80 ? '...' : ''),
        data: ayah
      }))
    };
  }

  return { type: 'none', results: [] };
}

// Usage
const searchResults = quickSearch('Fatiha');
console.log(`Search type: ${searchResults.type}`);
searchResults.results.forEach(result => {
  console.log(`• ${result.title}: ${result.subtitle}`);
});
```

### **Reading Progress Tracker**

```javascript
import { getJuz, getSurahStatistics } from '@muslims-community/quran';

class ReadingProgress {
  constructor() {
    this.stats = getSurahStatistics();
    this.progress = this.loadProgress();
  }

  loadProgress() {
    // In real app, load from localStorage or database
    return {
      completedJuz: [1, 2, 3], // Example: completed Juz 1-3
      currentJuz: 4,
      startDate: '2025-01-01'
    };
  }

  getOverallProgress() {
    const completedAyat = this.progress.completedJuz.reduce((total, juzNum) => {
      const juz = getJuz(juzNum);
      return total + juz.totalAyat;
    }, 0);

    const percentComplete = Math.round((completedAyat / this.stats.totalAyat) * 100);
    const daysStarted = Math.floor((Date.now() - new Date(this.progress.startDate)) / (1000 * 60 * 60 * 24));

    return {
      percentComplete,
      completedAyat,
      remainingAyat: this.stats.totalAyat - completedAyat,
      completedJuz: this.progress.completedJuz.length,
      remainingJuz: 30 - this.progress.completedJuz.length,
      daysActive: daysStarted,
      averageJuzPerDay: daysStarted > 0 ? (this.progress.completedJuz.length / daysStarted).toFixed(2) : 0
    };
  }

  getNextReading() {
    return getJuz(this.progress.currentJuz);
  }
}

// Usage
const progress = new ReadingProgress();
const overview = progress.getOverallProgress();
console.log(`📈 Progress: ${overview.percentComplete}% complete`);
console.log(`📖 Read: ${overview.completedAyat}/${overview.completedAyat + overview.remainingAyat} ayat`);
console.log(`📅 ${overview.daysActive} days active, averaging ${overview.averageJuzPerDay} Juz/day`);

const nextReading = progress.getNextReading();
console.log(`🔜 Next: Juz ${nextReading.juz} (${nextReading.totalAyat} ayat)`);
```

## 💡 Tips & Best Practices

### **1. Performance**
```javascript
// Cache frequently used data
const stats = getSurahStatistics(); // Call once, reuse
const juz1 = getJuz(1); // Cache for daily reading app

// Use range reading for better performance
const range = getAyahRange(2, 1, 10); // Better than 10 individual getAyah calls
```

### **2. Error Handling**
```javascript
function safeGetAyah(surahId, ayahId) {
  try {
    return getAyah(surahId, ayahId);
  } catch (error) {
    console.error(`Error getting ayah ${surahId}:${ayahId}:`, error.message);
    return null;
  }
}
```

### **3. User Experience**
```javascript
// Provide helpful feedback
function searchWithFeedback(query) {
  if (!query || query.trim().length === 0) {
    return { error: 'Please enter a search term' };
  }

  if (query.length < 2) {
    return { error: 'Search term too short (minimum 2 characters)' };
  }

  const results = searchText(query);
  if (results.totalResults === 0) {
    return {
      error: 'No results found',
      suggestion: 'Try searching for "الله" or "رب" or surah names like "Fatiha"'
    };
  }

  return results;
}
```

## 🔗 Next Steps

- **[API Overview](api-overview.md)** - Complete function reference
- **[Range Reading](range-reading.md)** - Build reading applications
- **[Juz & Hizb](juz-hizb.md)** - Islamic reading divisions
- **[Search Functions](search-functions.md)** - Advanced search implementation
- **[Statistics](statistics.md)** - Analytics and insights
- **[TypeScript](typescript.md)** - Type-safe development

## 📱 Framework Examples

### **React Hook**
```javascript
import { useState, useEffect } from 'react';
import { getRandomAyah } from '@muslims-community/quran';

function useDailyAyah() {
  const [ayah, setAyah] = useState(null);

  useEffect(() => {
    setAyah(getRandomAyah());
  }, []);

  return ayah;
}

// Usage in component
function DailyAyah() {
  const ayah = useDailyAyah();
  if (!ayah) return <div>Loading...</div>;

  return (
    <div>
      <p>{ayah.text}</p>
      <small>{ayah.surah.englishName} {ayah.id}</small>
    </div>
  );
}
```

### **Vue Composition API**
```javascript
import { ref, onMounted } from 'vue';
import { getSurah } from '@muslims-community/quran';

export function useSurah(surahId) {
  const surah = ref(null);
  const loading = ref(true);

  onMounted(() => {
    try {
      surah.value = getSurah(surahId);
    } catch (error) {
      console.error('Error loading surah:', error);
    } finally {
      loading.value = false;
    }
  });

  return { surah, loading };
}
```

### **Node.js API**
```javascript
const express = require('express');
const { searchText, getSurah } = require('@muslims-community/quran');

const app = express();

app.get('/api/search/:term', (req, res) => {
  try {
    const results = searchText(req.params.term);
    res.json({
      success: true,
      totalResults: results.totalResults,
      results: results.results.slice(0, 20) // Limit for API
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/surah/:id', (req, res) => {
  try {
    const surah = getSurah(parseInt(req.params.id));
    res.json({ success: true, surah });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('Quran API running on port 3000');
});
```

---

Ready to build amazing Quran applications! 🚀