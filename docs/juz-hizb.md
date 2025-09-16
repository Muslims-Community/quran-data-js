# Juz & Hizb Functions

Complete guide to using `getJuz()` and `getHizb()` for Islamic reading divisions.

## 📖 Understanding Juz & Hizb

### **Juz (Para)**
- The Quran is divided into **30 Juz** (also called Para or Sipara)
- Each Juz is designed for **daily reading** (complete Quran in 30 days)
- Juz divisions are **traditional** and widely used in Islamic education

### **Hizb**
- Each Juz is further divided into **2 Hizb**
- Total of **60 Hizb** in the complete Quran
- Hizb allows for **more precise** reading portions

### **Relationship**
```
1 Quran = 30 Juz = 60 Hizb
1 Juz = 2 Hizb
```

## 🚀 getJuz() Function

### **Basic Usage**

```javascript
import { getJuz } from '@muslims-community/quran';

// Get first Juz
const juz1 = getJuz(1);
console.log(`Juz ${juz1.juz}: ${juz1.totalAyat} ayat`);

// Get last Juz
const juz30 = getJuz(30);
console.log(`Juz ${juz30.juz}: ${juz30.totalAyat} ayat`);
```

### **Return Structure**

```javascript
{
  juz: 1,                    // Juz number (1-30)
  totalAyat: 148,           // Total ayat in this Juz
  ayat: [                   // Array of all ayat
    {
      id: 1,
      text: "بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ",
      sajdah: false,
      juz: 1,
      hizb: 1,
      surah: {
        id: 1,
        name: "الفاتحة",
        englishName: "Al-Fatiha",
        revelationType: "Meccan"
      }
    },
    // ... more ayat
  ],
  source: "Tanzil Project - https://tanzil.net"
}
```

### **Complete Juz Information**

```javascript
// Get information about all 30 Juz
function getAllJuzInfo() {
  const juzInfo = [];

  for (let i = 1; i <= 30; i++) {
    const juz = getJuz(i);
    juzInfo.push({
      juzNumber: i,
      totalAyat: juz.totalAyat,
      startSurah: juz.ayat[0].surah.englishName,
      endSurah: juz.ayat[juz.ayat.length - 1].surah.englishName
    });
  }

  return juzInfo;
}

const allJuz = getAllJuzInfo();
console.log('Complete Juz breakdown:', allJuz);
```

## 📑 getHizb() Function

### **Basic Usage**

```javascript
import { getHizb } from '@muslims-community/quran';

// Get first Hizb (first half of Juz 1)
const hizb1 = getHizb(1);
console.log(`Hizb ${hizb1.hizb} (Juz ${hizb1.juz}): ${hizb1.totalAyat} ayat`);

// Get second Hizb (second half of Juz 1)
const hizb2 = getHizb(2);
console.log(`Hizb ${hizb2.hizb} (Juz ${hizb2.juz}): ${hizb2.totalAyat} ayat`);
```

### **Return Structure**

```javascript
{
  hizb: 1,                  // Hizb number (1-60)
  juz: 1,                   // Parent Juz number (1-30)
  totalAyat: 74,           // Total ayat in this Hizb
  ayat: [                   // Array of all ayat
    {
      id: 1,
      text: "بِسمِ اللَّهِ الرَّحمٰنِ الرَّحيمِ",
      sajdah: false,
      juz: 1,
      hizb: 1,
      surah: { /* surah info */ }
    },
    // ... more ayat
  ],
  source: "Tanzil Project - https://tanzil.net"
}
```

### **Hizb to Juz Mapping**

```javascript
function getJuzFromHizb(hizbNumber) {
  return Math.ceil(hizbNumber / 2);
}

// Examples:
console.log(getJuzFromHizb(1));  // 1 (Hizb 1 → Juz 1)
console.log(getJuzFromHizb(2));  // 1 (Hizb 2 → Juz 1)
console.log(getJuzFromHizb(3));  // 2 (Hizb 3 → Juz 2)
console.log(getJuzFromHizb(60)); // 30 (Hizb 60 → Juz 30)
```

## 📱 Practical Applications

### **1. Daily Reading App**

```javascript
import { getJuz, getSurahStatistics } from '@muslims-community/quran';

class QuranReadingPlan {
  constructor() {
    this.stats = getSurahStatistics();
  }

  // 30-day reading plan
  getDailyJuz(day) {
    if (day < 1 || day > 30) {
      throw new Error('Day must be between 1 and 30');
    }

    const juz = getJuz(day);
    return {
      day,
      juz: juz.juz,
      totalAyat: juz.totalAyat,
      estimatedMinutes: Math.round(juz.totalAyat * 0.5), // ~30 seconds per ayah
      progress: Math.round((day / 30) * 100)
    };
  }

  // Get reading schedule
  getFullSchedule() {
    const schedule = [];
    for (let day = 1; day <= 30; day++) {
      schedule.push(this.getDailyJuz(day));
    }
    return schedule;
  }

  // Get progress summary
  getProgressSummary(completedDays) {
    const totalAyat = this.stats.totalAyat;
    let completedAyat = 0;

    for (let day = 1; day <= completedDays; day++) {
      const juz = getJuz(day);
      completedAyat += juz.totalAyat;
    }

    return {
      completedDays,
      remainingDays: 30 - completedDays,
      completedAyat,
      remainingAyat: totalAyat - completedAyat,
      percentComplete: Math.round((completedAyat / totalAyat) * 100)
    };
  }
}

// Usage
const readingPlan = new QuranReadingPlan();

// Get today's reading
const todayReading = readingPlan.getDailyJuz(15);
console.log(`Day 15: Read Juz ${todayReading.juz} (${todayReading.totalAyat} ayat, ~${todayReading.estimatedMinutes} mins)`);

// Get progress after 10 days
const progress = readingPlan.getProgressSummary(10);
console.log(`Progress: ${progress.percentComplete}% complete`);
```

### **2. Flexible Reading Portions**

```javascript
import { getHizb } from '@muslims-community/quran';

class FlexibleReading {
  // Read half portions for busy days
  getHalfJuz(juzNumber, half = 1) {
    const hizbNumber = (juzNumber - 1) * 2 + half;
    return getHizb(hizbNumber);
  }

  // Create custom reading sessions
  createReadingSession(minutes) {
    const ayatPerMinute = 2; // Average reading speed
    const targetAyat = minutes * ayatPerMinute;

    // Find best Hizb match
    let bestMatch = null;
    let closestDiff = Infinity;

    for (let hizbNum = 1; hizbNum <= 60; hizbNum++) {
      const hizb = getHizb(hizbNum);
      const diff = Math.abs(hizb.totalAyat - targetAyat);

      if (diff < closestDiff) {
        closestDiff = diff;
        bestMatch = {
          hizb: hizbNum,
          juz: hizb.juz,
          totalAyat: hizb.totalAyat,
          estimatedMinutes: Math.round(hizb.totalAyat / ayatPerMinute)
        };
      }
    }

    return bestMatch;
  }

  // Weekly reading plan (divide month into weeks)
  getWeeklyPlan() {
    const weeks = [];

    for (let week = 1; week <= 4; week++) {
      const startJuz = (week - 1) * 7 + 1;
      const endJuz = Math.min(week * 7, 30);
      const juzList = [];

      for (let juz = startJuz; juz <= endJuz; juz++) {
        juzList.push(juz);
      }

      weeks.push({
        week,
        juzList,
        totalJuz: juzList.length
      });
    }

    return weeks;
  }
}

// Usage
const flexReading = new FlexibleReading();

// Get first half of Juz 5
const halfJuz = flexReading.getHalfJuz(5, 1);
console.log(`First half of Juz 5: ${halfJuz.totalAyat} ayat`);

// Find best reading for 15 minutes
const session = flexReading.createReadingSession(15);
console.log(`15-minute session: Hizb ${session.hizb} (~${session.estimatedMinutes} mins)`);
```

### **3. Progress Tracking**

```javascript
import { getJuz, getHizb } from '@muslims-community/quran';

class ReadingProgress {
  constructor() {
    this.progress = this.loadProgress();
  }

  // Load progress from localStorage
  loadProgress() {
    const saved = localStorage.getItem('quran-progress');
    return saved ? JSON.parse(saved) : {
      completedJuz: [],
      completedHizb: [],
      currentJuz: 1,
      currentHizb: 1,
      startDate: new Date().toISOString()
    };
  }

  // Save progress to localStorage
  saveProgress() {
    localStorage.setItem('quran-progress', JSON.stringify(this.progress));
  }

  // Mark Juz as completed
  completeJuz(juzNumber) {
    if (!this.progress.completedJuz.includes(juzNumber)) {
      this.progress.completedJuz.push(juzNumber);

      // Also mark both Hizb as completed
      const hizb1 = (juzNumber - 1) * 2 + 1;
      const hizb2 = (juzNumber - 1) * 2 + 2;
      this.completeHizb(hizb1);
      this.completeHizb(hizb2);

      this.progress.currentJuz = Math.min(juzNumber + 1, 30);
      this.saveProgress();
    }
  }

  // Mark Hizb as completed
  completeHizb(hizbNumber) {
    if (!this.progress.completedHizb.includes(hizbNumber)) {
      this.progress.completedHizb.push(hizbNumber);
      this.progress.currentHizb = Math.min(hizbNumber + 1, 60);
      this.saveProgress();
    }
  }

  // Get progress statistics
  getStats() {
    const juzPercent = (this.progress.completedJuz.length / 30) * 100;
    const hizbPercent = (this.progress.completedHizb.length / 60) * 100;

    const startDate = new Date(this.progress.startDate);
    const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
      juzCompleted: this.progress.completedJuz.length,
      hizbCompleted: this.progress.completedHizb.length,
      juzPercent: Math.round(juzPercent),
      hizbPercent: Math.round(hizbPercent),
      daysSinceStart,
      averageJuzPerDay: daysSinceStart > 0 ? (this.progress.completedJuz.length / daysSinceStart).toFixed(2) : 0
    };
  }

  // Get next reading recommendation
  getNextReading() {
    const stats = this.getStats();

    if (stats.juzCompleted < 30) {
      const nextJuz = getJuz(this.progress.currentJuz);
      return {
        type: 'juz',
        number: this.progress.currentJuz,
        totalAyat: nextJuz.totalAyat,
        isNext: true
      };
    }

    return {
      type: 'complete',
      message: 'Congratulations! You have completed the entire Quran!'
    };
  }
}

// Usage
const progress = new ReadingProgress();

// Complete current Juz
const currentJuz = progress.progress.currentJuz;
progress.completeJuz(currentJuz);

// Get updated stats
const stats = progress.getStats();
console.log(`Progress: ${stats.juzPercent}% Juz, ${stats.hizbPercent}% Hizb`);

// Get next recommendation
const next = progress.getNextReading();
if (next.isNext) {
  console.log(`Next: ${next.type} ${next.number} (${next.totalAyat} ayat)`);
}
```

## 📊 Juz & Hizb Distribution

### **Juz Sizes**

```javascript
import { getJuz } from '@muslims-community/quran';

function analyzeJuzSizes() {
  const juzSizes = [];

  for (let i = 1; i <= 30; i++) {
    const juz = getJuz(i);
    juzSizes.push({
      juz: i,
      ayatCount: juz.totalAyat,
      startSurah: juz.ayat[0].surah.englishName,
      endSurah: juz.ayat[juz.ayat.length - 1].surah.englishName
    });
  }

  // Sort by size
  juzSizes.sort((a, b) => b.ayatCount - a.ayatCount);

  console.log('Largest Juz:', juzSizes[0]);
  console.log('Smallest Juz:', juzSizes[juzSizes.length - 1]);

  const avgSize = juzSizes.reduce((sum, juz) => sum + juz.ayatCount, 0) / 30;
  console.log('Average Juz size:', Math.round(avgSize), 'ayat');

  return juzSizes;
}

analyzeJuzSizes();
```

## 🎯 Best Practices

### **1. Performance Optimization**

```javascript
// Cache frequently used Juz
const juzCache = new Map();

function getCachedJuz(juzNumber) {
  if (!juzCache.has(juzNumber)) {
    juzCache.set(juzNumber, getJuz(juzNumber));
  }
  return juzCache.get(juzNumber);
}
```

### **2. Error Handling**

```javascript
function safeGetJuz(juzNumber) {
  try {
    return getJuz(juzNumber);
  } catch (error) {
    console.error(`Invalid Juz number: ${juzNumber}`, error);
    return null;
  }
}

function safeGetHizb(hizbNumber) {
  try {
    return getHizb(hizbNumber);
  } catch (error) {
    console.error(`Invalid Hizb number: ${hizbNumber}`, error);
    return null;
  }
}
```

### **3. User Interface Integration**

```javascript
// Generate reading plan dropdown
function generateReadingOptions() {
  const options = [];

  // Add Juz options
  for (let i = 1; i <= 30; i++) {
    options.push({
      value: `juz-${i}`,
      label: `Juz ${i}`,
      type: 'juz'
    });
  }

  // Add Hizb options
  for (let i = 1; i <= 60; i++) {
    const juzNumber = Math.ceil(i / 2);
    const hizbInJuz = ((i - 1) % 2) + 1;
    options.push({
      value: `hizb-${i}`,
      label: `Hizb ${i} (Juz ${juzNumber}, Part ${hizbInJuz})`,
      type: 'hizb'
    });
  }

  return options;
}
```

## 🔗 Related Functions

- **[getAyahRange()](range-reading.md)** - Read specific ayah ranges
- **[getSurahStatistics()](statistics.md)** - Get reading statistics
- **[searchBySurahName()](search-functions.md)** - Find specific surahs

---

**Next:** [Statistics Guide](statistics.md) - Learn about Quran analytics