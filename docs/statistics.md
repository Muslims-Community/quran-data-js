# Statistics Guide

Complete guide to using `getSurahStatistics()` for analytics and educational insights.

## 📊 Understanding Quran Statistics

Statistical analysis helps with:

- **Educational insights** - Understand Quran structure and patterns
- **Reading planning** - Create balanced reading schedules
- **Comparative studies** - Analyze Meccan vs Medinan revelations
- **Data visualization** - Build dashboards and charts
- **Research applications** - Academic and Islamic studies

## 🚀 getSurahStatistics() Function

### **Basic Usage**

```javascript
import { getSurahStatistics } from '@muslims-community/quran';

// Get complete Quran statistics
const stats = getSurahStatistics();

console.log(`📖 Complete Quran Overview:`);
console.log(`• Total Surahs: ${stats.totalSurahs}`);
console.log(`• Total Ayat: ${stats.totalAyat}`);
console.log(`• Average per Surah: ${stats.averageAyatPerSurah} ayat`);
console.log(`• Meccan Surahs: ${stats.meccanSurahs}`);
console.log(`• Medinan Surahs: ${stats.medinanSurahs}`);
```

### **Complete Return Structure**

```javascript
{
  // Basic counts
  totalSurahs: 114,
  totalAyat: 6236,
  meccanSurahs: 86,
  medinanSurahs: 28,
  averageAyatPerSurah: 54.7,

  // Extremes
  longestSurah: {
    id: 2,
    name: "البقرة",
    englishName: "Al-Baqarah",
    numberOfAyahs: 286,
    revelationType: "Medinan",
    revelationOrder: 87
  },
  shortestSurah: {
    id: 103,
    name: "العصر",
    englishName: "Al-'Asr",
    numberOfAyahs: 3,
    revelationType: "Meccan",
    revelationOrder: 13
  },

  // Distribution analysis
  ayatCounts: {
    min: 3,
    max: 286,
    median: 29,
    mode: 6,
    distribution: {
      3: 1,    // 1 surah has 3 ayat
      4: 2,    // 2 surahs have 4 ayat
      5: 2,    // 2 surahs have 5 ayat
      6: 7,    // 7 surahs have 6 ayat
      // ... complete distribution
    }
  },

  // Revelation analysis
  revelationAnalysis: {
    meccanCharacteristics: {
      averageLength: 41.2,
      totalAyat: 3545,
      shortestLength: 3,
      longestLength: 200
    },
    medinanCharacteristics: {
      averageLength: 96.0,
      totalAyat: 2691,
      shortestLength: 11,
      longestLength: 286
    }
  },

  source: "Tanzil Project - https://tanzil.net"
}
```

## 📈 Analytics Applications

### **1. Educational Dashboard**

```javascript
import { getSurahStatistics, getJuz, getSurah } from '@muslims-community/quran';

class QuranAnalytics {
  constructor() {
    this.stats = getSurahStatistics();
  }

  // Generate comprehensive overview
  generateOverview() {
    return {
      structure: {
        totalSurahs: this.stats.totalSurahs,
        totalAyat: this.stats.totalAyat,
        averagePerSurah: this.stats.averageAyatPerSurah,
        juzCount: 30,
        hizbCount: 60
      },
      revelation: {
        meccanCount: this.stats.meccanSurahs,
        medinanCount: this.stats.medinanSurahs,
        meccanPercentage: Math.round((this.stats.meccanSurahs / this.stats.totalSurahs) * 100),
        medinanPercentage: Math.round((this.stats.medinanSurahs / this.stats.totalSurahs) * 100)
      },
      extremes: {
        longest: this.stats.longestSurah,
        shortest: this.stats.shortestSurah,
        sizeDifference: this.stats.longestSurah.numberOfAyahs / this.stats.shortestSurah.numberOfAyahs
      },
      readingTime: this.calculateReadingTimes()
    };
  }

  // Calculate estimated reading times
  calculateReadingTimes() {
    const ayatPerMinute = 2; // Average reading speed
    const totalMinutes = this.stats.totalAyat / ayatPerMinute;

    return {
      completQuran: {
        minutes: Math.round(totalMinutes),
        hours: Math.round(totalMinutes / 60),
        days: Math.round(totalMinutes / (60 * 24)),
        thirtyDayPlan: Math.round(totalMinutes / 30)
      },
      dailyJuz: {
        averageMinutes: Math.round((this.stats.totalAyat / 30) / ayatPerMinute),
        shortestJuz: this.getJuzReadingTimes().shortest,
        longestJuz: this.getJuzReadingTimes().longest
      }
    };
  }

  // Analyze Juz reading times
  getJuzReadingTimes() {
    const juzTimes = [];

    for (let i = 1; i <= 30; i++) {
      const juz = getJuz(i);
      const minutes = Math.round(juz.totalAyat / 2);
      juzTimes.push({ juz: i, ayat: juz.totalAyat, minutes });
    }

    juzTimes.sort((a, b) => a.minutes - b.minutes);

    return {
      shortest: juzTimes[0],
      longest: juzTimes[juzTimes.length - 1],
      average: Math.round(juzTimes.reduce((sum, j) => sum + j.minutes, 0) / 30),
      all: juzTimes
    };
  }

  // Analyze surah length patterns
  analyzeLengthPatterns() {
    const patterns = {
      veryShort: [], // 1-10 ayat
      short: [],     // 11-50 ayat
      medium: [],    // 51-100 ayat
      long: [],      // 101-200 ayat
      veryLong: []   // 200+ ayat
    };

    // Categorize surahs by length
    for (let i = 1; i <= 114; i++) {
      const surah = getSurah(i);
      const category = this.categorizeByLength(surah.numberOfAyahs);
      patterns[category].push({
        id: surah.id,
        name: surah.englishName,
        ayat: surah.numberOfAyahs,
        type: surah.revelationType
      });
    }

    // Add statistics for each category
    Object.keys(patterns).forEach(category => {
      const surahs = patterns[category];
      patterns[category] = {
        surahs,
        count: surahs.length,
        percentage: Math.round((surahs.length / 114) * 100),
        meccan: surahs.filter(s => s.type === 'Meccan').length,
        medinan: surahs.filter(s => s.type === 'Medinan').length,
        totalAyat: surahs.reduce((sum, s) => sum + s.ayat, 0)
      };
    });

    return patterns;
  }

  // Categorize surah by length
  categorizeByLength(ayatCount) {
    if (ayatCount <= 10) return 'veryShort';
    if (ayatCount <= 50) return 'short';
    if (ayatCount <= 100) return 'medium';
    if (ayatCount <= 200) return 'long';
    return 'veryLong';
  }

  // Generate visualization data
  getVisualizationData() {
    return {
      // Pie chart: Meccan vs Medinan
      revelationTypes: [
        { name: 'Meccan', value: this.stats.meccanSurahs, percentage: Math.round((this.stats.meccanSurahs / 114) * 100) },
        { name: 'Medinan', value: this.stats.medinanSurahs, percentage: Math.round((this.stats.medinanSurahs / 114) * 100) }
      ],

      // Bar chart: Length distribution
      lengthDistribution: Object.entries(this.stats.ayatCounts.distribution)
        .map(([ayatCount, surahCount]) => ({
          ayatCount: parseInt(ayatCount),
          surahCount,
          percentage: Math.round((surahCount / 114) * 100)
        }))
        .filter(item => item.surahCount > 0)
        .sort((a, b) => a.ayatCount - b.ayatCount),

      // Line chart: Surah lengths across the Quran
      surahProgression: Array.from({ length: 114 }, (_, i) => {
        const surah = getSurah(i + 1);
        return {
          surahNumber: i + 1,
          ayatCount: surah.numberOfAyahs,
          revelationType: surah.revelationType,
          name: surah.englishName
        };
      }),

      // Histogram: Juz sizes
      juzSizes: Array.from({ length: 30 }, (_, i) => {
        const juz = getJuz(i + 1);
        return {
          juzNumber: i + 1,
          ayatCount: juz.totalAyat,
          estimatedMinutes: Math.round(juz.totalAyat / 2)
        };
      })
    };
  }
}

// Usage
const analytics = new QuranAnalytics();

// Generate complete overview
const overview = analytics.generateOverview();
console.log('📊 Quran Overview:');
console.log(`Structure: ${overview.structure.totalSurahs} surahs, ${overview.structure.totalAyat} ayat`);
console.log(`Revelation: ${overview.revelation.meccanPercentage}% Meccan, ${overview.revelation.medinanPercentage}% Medinan`);
console.log(`Reading time: ~${overview.readingTime.completQuran.hours} hours total`);

// Analyze length patterns
const patterns = analytics.analyzeLengthPatterns();
console.log('\n📏 Length Categories:');
Object.entries(patterns).forEach(([category, data]) => {
  console.log(`${category}: ${data.count} surahs (${data.percentage}%)`);
});

// Get visualization data
const vizData = analytics.getVisualizationData();
console.log('\n📈 Ready for charts:', Object.keys(vizData));
```

### **2. Comparative Analysis Tool**

```javascript
import { getSurahStatistics, getSurah } from '@muslims-community/quran';

class ComparativeAnalysis {
  constructor() {
    this.stats = getSurahStatistics();
  }

  // Compare Meccan vs Medinan characteristics
  compareRevelationTypes() {
    const meccanSurahs = [];
    const medinanSurahs = [];

    // Collect all surahs by type
    for (let i = 1; i <= 114; i++) {
      const surah = getSurah(i);
      if (surah.revelationType === 'Meccan') {
        meccanSurahs.push(surah);
      } else {
        medinanSurahs.push(surah);
      }
    }

    return {
      meccan: this.analyzeSurahGroup(meccanSurahs, 'Meccan'),
      medinan: this.analyzeSurahGroup(medinanSurahs, 'Medinan'),
      comparison: this.generateComparison(meccanSurahs, medinanSurahs)
    };
  }

  // Analyze a group of surahs
  analyzeSurahGroup(surahs, type) {
    const lengths = surahs.map(s => s.numberOfAyahs);
    const totalAyat = lengths.reduce((sum, len) => sum + len, 0);

    return {
      type,
      count: surahs.length,
      totalAyat,
      averageLength: Math.round(totalAyat / surahs.length),
      medianLength: this.calculateMedian(lengths),
      shortestSurah: surahs.reduce((min, s) => s.numberOfAyahs < min.numberOfAyahs ? s : min),
      longestSurah: surahs.reduce((max, s) => s.numberOfAyahs > max.numberOfAyahs ? s : max),
      lengthVariance: this.calculateVariance(lengths),
      topSurahs: surahs
        .sort((a, b) => b.numberOfAyahs - a.numberOfAyahs)
        .slice(0, 5)
        .map(s => ({ name: s.englishName, ayat: s.numberOfAyahs }))
    };
  }

  // Generate detailed comparison
  generateComparison(meccanSurahs, medinanSurahs) {
    const meccanLengths = meccanSurahs.map(s => s.numberOfAyahs);
    const medinanLengths = medinanSurahs.map(s => s.numberOfAyahs);

    return {
      countRatio: meccanSurahs.length / medinanSurahs.length,
      averageLengthRatio: (meccanLengths.reduce((s, l) => s + l, 0) / meccanSurahs.length) /
                         (medinanLengths.reduce((s, l) => s + l, 0) / medinanSurahs.length),

      characteristics: {
        meccanTendency: 'Generally shorter, more spiritual/theological themes',
        medinanTendency: 'Generally longer, more legal/social guidance',
        lengthVariability: {
          meccan: this.calculateVariance(meccanLengths),
          medinan: this.calculateVariance(medinanLengths)
        }
      },

      insights: [
        `Meccan surahs are ${Math.round(((meccanSurahs.length / medinanSurahs.length) - 1) * 100)}% more numerous`,
        `Medinan surahs average ${Math.round((medinanLengths.reduce((s, l) => s + l, 0) / medinanSurahs.length) / (meccanLengths.reduce((s, l) => s + l, 0) / meccanSurahs.length) * 100)}% longer`,
        `Shortest overall: ${this.stats.shortestSurah.englishName} (${this.stats.shortestSurah.revelationType})`,
        `Longest overall: ${this.stats.longestSurah.englishName} (${this.stats.longestSurah.revelationType})`
      ]
    };
  }

  // Calculate median
  calculateMedian(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  // Calculate variance
  calculateVariance(numbers) {
    const mean = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
    const variance = numbers.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / numbers.length;
    return Math.round(variance);
  }

  // Analyze revelation chronology vs Mushaf order
  analyzeRevelationOrder() {
    const surahs = [];
    for (let i = 1; i <= 114; i++) {
      surahs.push(getSurah(i));
    }

    // Sort by revelation order
    const chronological = [...surahs].sort((a, b) => a.revelationOrder - b.revelationOrder);

    const analysis = {
      originalOrder: surahs.map(s => ({ mushafOrder: s.id, revelationOrder: s.revelationOrder, name: s.englishName })),
      chronologicalOrder: chronological.map(s => ({ revelationOrder: s.revelationOrder, mushafOrder: s.id, name: s.englishName })),

      insights: {
        firstRevealed: chronological[0],
        lastRevealed: chronological[chronological.length - 1],
        largestOrderDifference: this.findLargestOrderDifference(surahs),
        revelationPeriods: this.analyzeRevelationPeriods(chronological)
      }
    };

    return analysis;
  }

  // Find largest difference between revelation and Mushaf order
  findLargestOrderDifference(surahs) {
    let maxDiff = 0;
    let surahWithMaxDiff = null;

    surahs.forEach(surah => {
      const diff = Math.abs(surah.id - surah.revelationOrder);
      if (diff > maxDiff) {
        maxDiff = diff;
        surahWithMaxDiff = surah;
      }
    });

    return {
      surah: surahWithMaxDiff,
      difference: maxDiff,
      mushafPosition: surahWithMaxDiff.id,
      revelationPosition: surahWithMaxDiff.revelationOrder
    };
  }

  // Analyze revelation periods
  analyzeRevelationPeriods(chronologicalSurahs) {
    const early = chronologicalSurahs.slice(0, 30);
    const middle = chronologicalSurahs.slice(30, 80);
    const late = chronologicalSurahs.slice(80);

    return {
      early: {
        period: 'Early (1-30)',
        surahs: early.length,
        averageLength: Math.round(early.reduce((sum, s) => sum + s.numberOfAyahs, 0) / early.length),
        predominantType: this.getPredominantType(early)
      },
      middle: {
        period: 'Middle (31-80)',
        surahs: middle.length,
        averageLength: Math.round(middle.reduce((sum, s) => sum + s.numberOfAyahs, 0) / middle.length),
        predominantType: this.getPredominantType(middle)
      },
      late: {
        period: 'Late (81-114)',
        surahs: late.length,
        averageLength: Math.round(late.reduce((sum, s) => sum + s.numberOfAyahs, 0) / late.length),
        predominantType: this.getPredominantType(late)
      }
    };
  }

  // Get predominant revelation type
  getPredominantType(surahs) {
    const meccan = surahs.filter(s => s.revelationType === 'Meccan').length;
    const medinan = surahs.filter(s => s.revelationType === 'Medinan').length;
    return meccan > medinan ? 'Meccan' : 'Medinan';
  }
}

// Usage
const comparative = new ComparativeAnalysis();

// Compare revelation types
const typeComparison = comparative.compareRevelationTypes();
console.log('📊 Revelation Type Analysis:');
console.log(`Meccan: ${typeComparison.meccan.count} surahs, avg ${typeComparison.meccan.averageLength} ayat`);
console.log(`Medinan: ${typeComparison.medinan.count} surahs, avg ${typeComparison.medinan.averageLength} ayat`);
console.log('\nInsights:', typeComparison.comparison.insights);

// Analyze revelation chronology
const chronology = comparative.analyzeRevelationOrder();
console.log('\n📅 Revelation Chronology:');
console.log(`First revealed: ${chronology.insights.firstRevealed.englishName}`);
console.log(`Last revealed: ${chronology.insights.lastRevealed.englishName}`);
console.log(`Largest order difference: ${chronology.insights.largestOrderDifference.surah.englishName} (${chronology.insights.largestOrderDifference.difference} positions)`);
```

### **3. Educational Insights Generator**

```javascript
import { getSurahStatistics } from '@muslims-community/quran';

class EducationalInsights {
  constructor() {
    this.stats = getSurahStatistics();
  }

  // Generate interesting facts
  generateFacts() {
    return [
      `The Quran contains exactly ${this.stats.totalAyat.toLocaleString()} ayat across ${this.stats.totalSurahs} surahs`,

      `The longest surah (${this.stats.longestSurah.englishName}) is ${Math.round(this.stats.longestSurah.numberOfAyahs / this.stats.shortestSurah.numberOfAyahs)} times longer than the shortest surah (${this.stats.shortestSurah.englishName})`,

      `${Math.round((this.stats.meccanSurahs / this.stats.totalSurahs) * 100)}% of surahs were revealed in Mecca, while ${Math.round((this.stats.medinanSurahs / this.stats.totalSurahs) * 100)}% were revealed in Medina`,

      `On average, each surah contains ${this.stats.averageAyatPerSurah} ayat`,

      `Reading at 2 ayat per minute, the complete Quran takes approximately ${Math.round(this.stats.totalAyat / 2 / 60)} hours`,

      `The most common surah length is ${this.stats.ayatCounts.mode} ayat (${this.stats.ayatCounts.distribution[this.stats.ayatCounts.mode]} surahs)`,

      `Medinan surahs average ${Math.round(this.stats.revelationAnalysis.medinanCharacteristics.averageLength)} ayat, while Meccan surahs average ${Math.round(this.stats.revelationAnalysis.meccanCharacteristics.averageLength)} ayat`
    ];
  }

  // Generate study recommendations
  generateStudyRecommendations() {
    const recommendations = [];

    // Based on length patterns
    const shortSurahs = Object.entries(this.stats.ayatCounts.distribution)
      .filter(([length, count]) => parseInt(length) <= 10)
      .reduce((sum, [, count]) => sum + count, 0);

    recommendations.push({
      category: 'Beginner Study',
      suggestion: `Start with the ${shortSurahs} shortest surahs (10 ayat or less) for easier memorization`,
      difficulty: 'Easy',
      timeEstimate: '1-2 weeks'
    });

    // Based on revelation type
    recommendations.push({
      category: 'Thematic Study',
      suggestion: `Compare Meccan surahs (${this.stats.meccanSurahs} total) focusing on faith and spirituality with Medinan surahs (${this.stats.medinanSurahs} total) emphasizing community and law`,
      difficulty: 'Intermediate',
      timeEstimate: '2-3 months'
    });

    // Based on average length
    recommendations.push({
      category: 'Daily Reading',
      suggestion: `Read ${Math.round(this.stats.averageAyatPerSurah)} ayat daily (average surah length) to complete different themes regularly`,
      difficulty: 'Easy',
      timeEstimate: 'Ongoing'
    });

    // Based on extremes
    recommendations.push({
      category: 'Progressive Challenge',
      suggestion: `Begin with ${this.stats.shortestSurah.englishName} (${this.stats.shortestSurah.numberOfAyahs} ayat) and work up to ${this.stats.longestSurah.englishName} (${this.stats.longestSurah.numberOfAyahs} ayat) to build reading stamina`,
      difficulty: 'Progressive',
      timeEstimate: '6 months'
    });

    return recommendations;
  }

  // Generate quiz questions based on statistics
  generateQuizQuestions() {
    return [
      {
        question: "How many surahs are in the Quran?",
        answer: this.stats.totalSurahs,
        options: [110, 114, 118, 120],
        category: "Basic Structure"
      },
      {
        question: "What is the total number of ayat in the Quran?",
        answer: this.stats.totalAyat,
        options: [6000, 6236, 6400, 6500],
        category: "Basic Structure"
      },
      {
        question: "Which is the longest surah?",
        answer: this.stats.longestSurah.englishName,
        options: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah"],
        category: "Surah Knowledge"
      },
      {
        question: "How many Meccan surahs are there?",
        answer: this.stats.meccanSurahs,
        options: [82, 86, 90, 94],
        category: "Revelation History"
      },
      {
        question: "What is the average number of ayat per surah?",
        answer: Math.round(this.stats.averageAyatPerSurah),
        options: [45, 50, 55, 60],
        category: "Statistics"
      }
    ];
  }

  // Generate reading challenges
  generateReadingChallenges() {
    return [
      {
        challenge: "Short Surah Mastery",
        description: `Memorize all surahs with ${this.stats.shortestSurah.numberOfAyahs}-6 ayat`,
        difficulty: "Beginner",
        estimatedTime: "2 weeks",
        reward: "Foundation in Quranic memorization"
      },
      {
        challenge: "Daily Average",
        description: `Read ${Math.round(this.stats.averageAyatPerSurah)} ayat (average surah length) daily for 30 days`,
        difficulty: "Intermediate",
        estimatedTime: "1 month",
        reward: "Consistent reading habit"
      },
      {
        challenge: "Revelation Journey",
        description: `Study all ${this.stats.meccanSurahs} Meccan surahs in chronological order`,
        difficulty: "Advanced",
        estimatedTime: "3 months",
        reward: "Deep understanding of early Islam"
      },
      {
        challenge: "Complete Reading",
        description: `Read the entire Quran (${this.stats.totalAyat} ayat) in 30 days`,
        difficulty: "Expert",
        estimatedTime: "1 month",
        reward: "Complete Quranic experience"
      }
    ];
  }
}

// Usage
const insights = new EducationalInsights();

// Generate interesting facts
const facts = insights.generateFacts();
console.log('🎓 Interesting Facts:');
facts.forEach((fact, index) => {
  console.log(`${index + 1}. ${fact}`);
});

// Get study recommendations
const recommendations = insights.generateStudyRecommendations();
console.log('\n📚 Study Recommendations:');
recommendations.forEach(rec => {
  console.log(`${rec.category}: ${rec.suggestion} (${rec.difficulty}, ${rec.timeEstimate})`);
});

// Generate quiz questions
const quiz = insights.generateQuizQuestions();
console.log('\n❓ Quiz Questions:', quiz.length);

// Generate reading challenges
const challenges = insights.generateReadingChallenges();
console.log('\n🏆 Reading Challenges:');
challenges.forEach(challenge => {
  console.log(`${challenge.challenge} (${challenge.difficulty}): ${challenge.description}`);
});
```

## 🎯 Best Practices

### **1. Performance Optimization**

```javascript
// Cache statistics for repeated use
let cachedStats = null;

function getCachedStatistics() {
  if (!cachedStats) {
    cachedStats = getSurahStatistics();
  }
  return cachedStats;
}

// Use statistics for quick lookups
const stats = getCachedStatistics();
const isMeccanMajority = stats.meccanSurahs > stats.medinanSurahs;
const averageLength = stats.averageAyatPerSurah;
```

### **2. Data Visualization**

```javascript
// Prepare data for chart libraries
function prepareChartData(stats) {
  return {
    // For pie charts (Chart.js, D3, etc.)
    revelationTypes: {
      labels: ['Meccan', 'Medinan'],
      data: [stats.meccanSurahs, stats.medinanSurahs]
    },

    // For bar charts
    lengthDistribution: Object.entries(stats.ayatCounts.distribution)
      .map(([length, count]) => ({ x: parseInt(length), y: count }))
      .filter(item => item.y > 0)
  };
}
```

### **3. Educational Integration**

```javascript
// Create learning modules based on statistics
function createLearningPath(stats) {
  return [
    {
      level: 1,
      title: "Quran Basics",
      content: `Learn about the ${stats.totalSurahs} surahs and ${stats.totalAyat} ayat`,
      estimatedTime: "1 week"
    },
    {
      level: 2,
      title: "Revelation Types",
      content: `Understand the difference between ${stats.meccanSurahs} Meccan and ${stats.medinanSurahs} Medinan surahs`,
      estimatedTime: "2 weeks"
    },
    {
      level: 3,
      title: "Structure Analysis",
      content: `Explore why surahs range from ${stats.shortestSurah.numberOfAyahs} to ${stats.longestSurah.numberOfAyahs} ayat`,
      estimatedTime: "3 weeks"
    }
  ];
}
```

## 🔗 Related Functions

- **[getJuz() & getHizb()](juz-hizb.md)** - Reading divisions for balanced study
- **[getSurah()](basic-functions.md)** - Individual surah analysis
- **[searchText()](search-functions.md)** - Find patterns in the data
- **[getAyahRange()](range-reading.md)** - Study specific sections

---

**Next:** [TypeScript Integration](typescript.md) - Complete type safety guide