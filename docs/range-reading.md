# Range Reading Guide

Complete guide to using `getAyahRange()` for reading applications and verse study.

## 📖 Understanding Range Reading

Range reading allows you to retrieve consecutive ayat from a specific surah, which is essential for:

- **Reading applications** - Display multiple verses together
- **Study sessions** - Focus on specific passages
- **Memorization tools** - Practice verse sequences
- **Educational apps** - Teach Quranic concepts

## 🚀 getAyahRange() Function

### **Basic Usage**

```javascript
import { getAyahRange } from '@muslims-community/quran';

// Get first 5 ayat of Al-Baqarah
const opening = getAyahRange(2, 1, 5);
console.log(`Reading ${opening.range.count} ayat from ${opening.surah.englishName}`);

// Get Ayat al-Kursi context (Al-Baqarah 255-257)
const ayatAlKursi = getAyahRange(2, 255, 257);
console.log(`${ayatAlKursi.ayat.length} ayat including Ayat al-Kursi`);
```

### **Return Structure**

```javascript
{
  surah: {
    id: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    revelationType: "Medinan",
    numberOfAyahs: 286,
    revelationOrder: 87
  },
  range: {
    start: 1,       // Starting ayah number
    end: 5,         // Ending ayah number
    count: 5        // Total ayat in range
  },
  ayat: [           // Array of ayat in range
    {
      id: 1,
      text: "الم",
      sajdah: false,
      juz: 1,
      hizb: 1
    },
    // ... more ayat
  ],
  source: "Tanzil Project - https://tanzil.net"
}
```

### **Error Handling**

```javascript
try {
  const range = getAyahRange(2, 1, 5);
  console.log('Success:', range.range.count, 'ayat');
} catch (error) {
  console.error('Error:', error.message);
  // Possible errors:
  // - "Surah ID must be between 1 and 114"
  // - "Start ayah must be between 1 and 286"
  // - "End ayah must be between 1 and 286"
  // - "Start ayah cannot be greater than end ayah"
}
```

## 📱 Practical Applications

### **1. Reading App Interface**

```javascript
import { getAyahRange, getSurah } from '@muslims-community/quran';

class QuranReader {
  constructor() {
    this.currentSurah = 1;
    this.ayatPerPage = 10;
    this.currentPage = 1;
  }

  // Get current page of ayat
  getCurrentPage() {
    const surah = getSurah(this.currentSurah);
    const startAyah = (this.currentPage - 1) * this.ayatPerPage + 1;
    const endAyah = Math.min(startAyah + this.ayatPerPage - 1, surah.numberOfAyahs);

    if (startAyah > surah.numberOfAyahs) {
      throw new Error('Page exceeds surah length');
    }

    return getAyahRange(this.currentSurah, startAyah, endAyah);
  }

  // Navigate to next page
  nextPage() {
    const surah = getSurah(this.currentSurah);
    const maxPages = Math.ceil(surah.numberOfAyahs / this.ayatPerPage);

    if (this.currentPage < maxPages) {
      this.currentPage++;
    } else if (this.currentSurah < 114) {
      this.currentSurah++;
      this.currentPage = 1;
    }

    return this.getCurrentPage();
  }

  // Navigate to previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else if (this.currentSurah > 1) {
      this.currentSurah--;
      const prevSurah = getSurah(this.currentSurah);
      this.currentPage = Math.ceil(prevSurah.numberOfAyahs / this.ayatPerPage);
    }

    return this.getCurrentPage();
  }

  // Get reading progress
  getProgress() {
    const surah = getSurah(this.currentSurah);
    const currentAyah = (this.currentPage - 1) * this.ayatPerPage + 1;

    return {
      surah: this.currentSurah,
      ayah: currentAyah,
      surahProgress: Math.round((currentAyah / surah.numberOfAyahs) * 100),
      overallProgress: Math.round(((this.currentSurah - 1) / 114) * 100)
    };
  }
}

// Usage
const reader = new QuranReader();

// Display current page
const currentPage = reader.getCurrentPage();
console.log(`Reading ${currentPage.surah.englishName} - Page ${reader.currentPage}`);
currentPage.ayat.forEach((ayah, index) => {
  console.log(`${ayah.id}. ${ayah.text}`);
});

// Navigate
const nextPage = reader.nextPage();
console.log(`Next page: ${nextPage.range.count} ayat`);
```

### **2. Verse Study Tool**

```javascript
import { getAyahRange, searchText } from '@muslims-community/quran';

class VerseStudy {
  // Get context around a specific ayah
  getContext(surahId, ayahId, contextSize = 2) {
    const startAyah = Math.max(1, ayahId - contextSize);
    const endAyah = ayahId + contextSize;

    try {
      return getAyahRange(surahId, startAyah, endAyah);
    } catch (error) {
      // If range exceeds surah, adjust accordingly
      const surah = getSurah(surahId);
      const adjustedEnd = Math.min(endAyah, surah.numberOfAyahs);
      return getAyahRange(surahId, startAyah, adjustedEnd);
    }
  }

  // Get thematic verse groups
  getThematicGroup(surahId, theme) {
    const thematicRanges = {
      // Al-Baqarah themes
      2: {
        'creation': [30, 39],
        'stories': [40, 103],
        'laws': [168, 286]
      },
      // Al-Imran themes
      3: {
        'faith': [1, 32],
        'uhud': [121, 175]
      },
      // Add more thematic mappings
    };

    if (thematicRanges[surahId] && thematicRanges[surahId][theme]) {
      const [start, end] = thematicRanges[surahId][theme];
      return getAyahRange(surahId, start, end);
    }

    throw new Error(`Theme '${theme}' not found for surah ${surahId}`);
  }

  // Compare similar passages
  comparePassages(passages) {
    return passages.map(([surahId, start, end]) => {
      const range = getAyahRange(surahId, start, end);
      return {
        surah: range.surah.englishName,
        range: `${start}-${end}`,
        ayat: range.ayat,
        wordCount: range.ayat.reduce((total, ayah) =>
          total + ayah.text.split(' ').length, 0)
      };
    });
  }
}

// Usage
const study = new VerseStudy();

// Study Ayat al-Kursi with context
const ayatAlKursiContext = study.getContext(2, 255, 1);
console.log('Ayat al-Kursi with context:');
ayatAlKursiContext.ayat.forEach(ayah => {
  const marker = ayah.id === 255 ? '>>> ' : '    ';
  console.log(`${marker}${ayah.id}. ${ayah.text}`);
});

// Study creation theme in Al-Baqarah
const creationTheme = study.getThematicGroup(2, 'creation');
console.log(`Creation theme: ${creationTheme.range.count} ayat`);

// Compare similar stories
const josephStory = study.comparePassages([
  [12, 4, 6],   // Yusuf's dream
  [12, 36, 42], // Prison interpretation
  [12, 99, 101] // Family reunion
]);
```

### **3. Memorization Helper**

```javascript
import { getAyahRange } from '@muslims-community/quran';

class MemorizationHelper {
  constructor() {
    this.sessions = JSON.parse(localStorage.getItem('memorization') || '{}');
  }

  // Create memorization chunks
  createChunks(surahId, chunkSize = 5) {
    const surah = getSurah(surahId);
    const chunks = [];

    for (let start = 1; start <= surah.numberOfAyahs; start += chunkSize) {
      const end = Math.min(start + chunkSize - 1, surah.numberOfAyahs);
      const chunk = getAyahRange(surahId, start, end);

      chunks.push({
        id: `${surahId}-${start}-${end}`,
        surahId,
        range: chunk.range,
        ayat: chunk.ayat,
        memorized: false,
        attempts: 0,
        lastReviewed: null
      });
    }

    return chunks;
  }

  // Progressive memorization - start with smaller ranges
  getProgressiveRange(surahId, targetAyah, currentLevel = 1) {
    const ranges = {
      1: 1,  // Start with 1 ayah
      2: 2,  // Then 2 ayat
      3: 3,  // Then 3 ayat
      4: 5,  // Then 5 ayat
      5: 10  // Finally 10 ayat
    };

    const rangeSize = ranges[currentLevel] || 1;
    const startAyah = Math.max(1, targetAyah - Math.floor(rangeSize / 2));
    const endAyah = Math.min(targetAyah + Math.floor(rangeSize / 2),
                             getSurah(surahId).numberOfAyahs);

    return getAyahRange(surahId, startAyah, endAyah);
  }

  // Review scheduler
  getReviewRange(surahId, masteredAyat) {
    if (masteredAyat.length === 0) return null;

    const sortedAyat = masteredAyat.sort((a, b) => a - b);
    const firstAyah = sortedAyat[0];
    const lastAyah = sortedAyat[sortedAyat.length - 1];

    return getAyahRange(surahId, firstAyah, lastAyah);
  }

  // Save progress
  saveProgress(surahId, chunk, success) {
    if (!this.sessions[surahId]) {
      this.sessions[surahId] = {};
    }

    this.sessions[surahId][chunk.id] = {
      ...chunk,
      memorized: success,
      attempts: (chunk.attempts || 0) + 1,
      lastReviewed: new Date().toISOString()
    };

    localStorage.setItem('memorization', JSON.stringify(this.sessions));
  }
}

// Usage
const memorization = new MemorizationHelper();

// Create chunks for Al-Fatiha (easy start)
const fatihaChunks = memorization.createChunks(1, 2);
console.log(`Al-Fatiha divided into ${fatihaChunks.length} chunks`);

// Progressive learning for specific ayah
const targetAyah = 255; // Ayat al-Kursi
for (let level = 1; level <= 5; level++) {
  const range = memorization.getProgressiveRange(2, targetAyah, level);
  console.log(`Level ${level}: ${range.range.count} ayat around Ayat al-Kursi`);
}
```

### **4. Reading Plan Generator**

```javascript
import { getAyahRange, getSurah } from '@muslims-community/quran';

class ReadingPlanGenerator {
  // Generate daily reading plan
  generateDailyPlan(surahId, daysToComplete) {
    const surah = getSurah(surahId);
    const ayatPerDay = Math.ceil(surah.numberOfAyahs / daysToComplete);
    const plan = [];

    for (let day = 1; day <= daysToComplete; day++) {
      const startAyah = (day - 1) * ayatPerDay + 1;
      const endAyah = Math.min(day * ayatPerDay, surah.numberOfAyahs);

      if (startAyah <= surah.numberOfAyahs) {
        const range = getAyahRange(surahId, startAyah, endAyah);
        plan.push({
          day,
          range: range.range,
          ayat: range.ayat,
          estimatedMinutes: Math.round(range.range.count * 0.5) // 30 seconds per ayah
        });
      }
    }

    return {
      surah: surah,
      totalDays: plan.length,
      averageAyatPerDay: Math.round(surah.numberOfAyahs / plan.length),
      plan
    };
  }

  // Generate balanced weekly reading
  generateWeeklyBalance() {
    const weeklyPlan = [];
    const targetAyatPerWeek = Math.round(6236 / 52); // ~120 ayat per week

    let currentSurah = 1;
    let currentAyah = 1;

    for (let week = 1; week <= 52; week++) {
      const weekRanges = [];
      let weeklyAyatCount = 0;

      while (weeklyAyatCount < targetAyatPerWeek && currentSurah <= 114) {
        const surah = getSurah(currentSurah);
        const remainingInSurah = surah.numberOfAyahs - currentAyah + 1;
        const remainingToRead = targetAyatPerWeek - weeklyAyatCount;

        const ayatToRead = Math.min(remainingInSurah, remainingToRead);
        const endAyah = currentAyah + ayatToRead - 1;

        const range = getAyahRange(currentSurah, currentAyah, endAyah);
        weekRanges.push(range);
        weeklyAyatCount += ayatToRead;

        if (endAyah === surah.numberOfAyahs) {
          currentSurah++;
          currentAyah = 1;
        } else {
          currentAyah = endAyah + 1;
        }
      }

      weeklyPlan.push({
        week,
        ranges: weekRanges,
        totalAyat: weeklyAyatCount
      });
    }

    return weeklyPlan;
  }
}

// Usage
const planGenerator = new ReadingPlanGenerator();

// 7-day plan for Al-Kahf
const kahfPlan = planGenerator.generateDailyPlan(18, 7);
console.log(`Al-Kahf reading plan: ${kahfPlan.totalDays} days`);
kahfPlan.plan.forEach(day => {
  console.log(`Day ${day.day}: Ayat ${day.range.start}-${day.range.end} (~${day.estimatedMinutes} mins)`);
});

// Year-long balanced plan
const yearPlan = planGenerator.generateWeeklyBalance();
console.log(`Complete Quran in 52 weeks:`);
yearPlan.slice(0, 3).forEach(week => {
  console.log(`Week ${week.week}: ${week.totalAyat} ayat across ${week.ranges.length} ranges`);
});
```

## 🎯 Best Practices

### **1. Range Validation**

```javascript
function safeGetAyahRange(surahId, startAyah, endAyah) {
  try {
    // Validate surah exists
    const surah = getSurah(surahId);

    // Adjust range if needed
    const adjustedStart = Math.max(1, startAyah);
    const adjustedEnd = Math.min(endAyah, surah.numberOfAyahs);

    if (adjustedStart > adjustedEnd) {
      throw new Error('Invalid range: start ayah is after end ayah');
    }

    return getAyahRange(surahId, adjustedStart, adjustedEnd);
  } catch (error) {
    console.error('Range reading error:', error.message);
    return null;
  }
}
```

### **2. Performance Optimization**

```javascript
// Cache frequently accessed ranges
const rangeCache = new Map();

function getCachedRange(surahId, startAyah, endAyah) {
  const key = `${surahId}-${startAyah}-${endAyah}`;

  if (!rangeCache.has(key)) {
    rangeCache.set(key, getAyahRange(surahId, startAyah, endAyah));
  }

  return rangeCache.get(key);
}
```

### **3. User Interface Integration**

```javascript
// Generate range picker options
function generateRangeOptions(surahId) {
  const surah = getSurah(surahId);
  const options = [];

  // Add common ranges
  const commonRanges = [
    { label: 'First 10 ayat', start: 1, end: Math.min(10, surah.numberOfAyahs) },
    { label: 'First quarter', start: 1, end: Math.floor(surah.numberOfAyahs / 4) },
    { label: 'Middle section', start: Math.floor(surah.numberOfAyahs / 3), end: Math.floor(2 * surah.numberOfAyahs / 3) },
    { label: 'Last 10 ayat', start: Math.max(1, surah.numberOfAyahs - 9), end: surah.numberOfAyahs }
  ];

  return commonRanges.filter(range => range.start <= range.end);
}
```

## 🔗 Related Functions

- **[getAyah()](basic-functions.md)** - Get individual ayah
- **[getSurah()](basic-functions.md)** - Get complete surah
- **[getJuz() & getHizb()](juz-hizb.md)** - Islamic reading divisions
- **[searchText()](search-functions.md)** - Find specific content

---

**Next:** [Search Functions Guide](search-functions.md) - Implement search functionality