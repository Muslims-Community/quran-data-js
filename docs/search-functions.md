# Search Functions Guide

Complete guide to implementing search functionality with `searchText()` and `searchBySurahName()`.

## 🔍 Understanding Quran Search

Search functionality is essential for:

- **Text discovery** - Find specific Arabic words or phrases
- **Reference lookup** - Locate verses containing certain terms
- **Thematic study** - Explore concepts across the Quran
- **Educational tools** - Build interactive learning applications

## 🚀 searchText() Function

### **Basic Usage**

```javascript
import { searchText } from '@muslims-community/quran';

// Search for Allah (الله)
const results = searchText('الله');
console.log(`Found ${results.totalResults} ayat containing "الله"`);

// Search for a specific phrase
const bismillahResults = searchText('بِسمِ اللَّهِ');
console.log(`"Bismillah" appears in ${bismillahResults.totalResults} places`);

// Search for Rahman (الرحمن)
const rahmanResults = searchText('الرحمن');
rahmanResults.results.slice(0, 5).forEach(ayah => {
  console.log(`${ayah.surah.englishName} ${ayah.id}: ${ayah.text.substring(0, 50)}...`);
});
```

### **Return Structure**

```javascript
{
  searchTerm: "الله",
  totalResults: 2699,
  results: [
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
        revelationType: "Meccan",
        numberOfAyahs: 7,
        revelationOrder: 5
      }
    },
    // ... more results
  ],
  source: "Tanzil Project - https://tanzil.net"
}
```

### **Search Strategies**

```javascript
// 1. Exact word search
const allahSearch = searchText('الله');

// 2. Root word variations
const salamSearch = searchText('سلام'); // Peace-related terms

// 3. Short phrases
const rabbiSearch = searchText('رب العالمين'); // Lord of the worlds

// 4. Single letters (less useful)
const alif = searchText('ا'); // Very common, many results
```

## 🏷️ searchBySurahName() Function

### **Basic Usage**

```javascript
import { searchBySurahName } from '@muslims-community/quran';

// Search by English name
const fatihaByEnglish = searchBySurahName('Fatiha');
console.log(fatihaByEnglish.results[0].englishName); // "Al-Fatiha"

// Search by Arabic name
const baqarahByArabic = searchBySurahName('البقرة');
console.log(baqarahByArabic.results[0].name); // "البقرة"

// Partial matching
const kahfPartial = searchBySurahName('Kah');
console.log(kahfPartial.results[0].englishName); // "Al-Kahf"

// Case-insensitive search
const ikhlas = searchBySurahName('IKHLAS');
console.log(ikhlas.results[0].englishName); // "Al-Ikhlas"
```

### **Return Structure**

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
      revelationOrder: 5,
      ayat: [ /* complete ayat array */ ]
    }
  ],
  source: "Tanzil Project - https://tanzil.net"
}
```

## 📱 Practical Applications

### **1. Advanced Search Interface**

```javascript
import { searchText, searchBySurahName, getSurah } from '@muslims-community/quran';

class QuranSearch {
  constructor() {
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  }

  // Comprehensive search with filters
  advancedSearch(query, options = {}) {
    const {
      surahFilter = null,
      revelationTypeFilter = null,
      juzFilter = null,
      maxResults = 100,
      includeContext = false
    } = options;

    let results = searchText(query);

    // Apply filters
    if (surahFilter) {
      results.results = results.results.filter(ayah =>
        ayah.surah.id === surahFilter);
    }

    if (revelationTypeFilter) {
      results.results = results.results.filter(ayah =>
        ayah.surah.revelationType === revelationTypeFilter);
    }

    if (juzFilter) {
      results.results = results.results.filter(ayah =>
        ayah.juz === juzFilter);
    }

    // Limit results
    results.results = results.results.slice(0, maxResults);
    results.totalResults = results.results.length;

    // Add context if requested
    if (includeContext) {
      results.results = results.results.map(ayah => ({
        ...ayah,
        context: this.getAyahContext(ayah.surah.id, ayah.id)
      }));
    }

    // Save to history
    this.addToHistory(query, results.totalResults);

    return results;
  }

  // Get context around found ayah
  getAyahContext(surahId, ayahId, contextSize = 1) {
    try {
      const startAyah = Math.max(1, ayahId - contextSize);
      const endAyah = ayahId + contextSize;
      return getAyahRange(surahId, startAyah, endAyah);
    } catch (error) {
      return null;
    }
  }

  // Search with suggestions
  searchWithSuggestions(query) {
    const results = searchText(query);

    // Generate related search suggestions
    const suggestions = this.generateSuggestions(query, results);

    return {
      ...results,
      suggestions
    };
  }

  // Generate search suggestions
  generateSuggestions(query, results) {
    const suggestions = [];

    // Common Islamic terms that might be related
    const relatedTerms = {
      'الله': ['الرحمن', 'الرحيم', 'رب', 'إله'],
      'صلاة': ['زكاة', 'صوم', 'حج', 'ذكر'],
      'جنة': ['نار', 'آخرة', 'قيامة', 'حساب'],
      'نبي': ['رسول', 'كتاب', 'وحي', 'هدى']
    };

    if (relatedTerms[query]) {
      suggestions.push(...relatedTerms[query]);
    }

    // Suggest broader searches if too few results
    if (results.totalResults < 5 && query.length > 3) {
      suggestions.push(query.substring(0, query.length - 1));
    }

    // Suggest more specific searches if too many results
    if (results.totalResults > 100) {
      const commonCombinations = [
        `${query} في`,
        `${query} من`,
        `${query} إلى`,
        `و${query}`
      ];
      suggestions.push(...commonCombinations);
    }

    return [...new Set(suggestions)]; // Remove duplicates
  }

  // Smart surah finder
  findSurah(query) {
    // Try exact search first
    let results = searchBySurahName(query);

    if (results.totalResults === 0) {
      // Try common alternatives
      const alternatives = {
        'cow': 'Baqarah',
        'cave': 'Kahf',
        'light': 'Nur',
        'throne': 'Kursi',
        'opening': 'Fatiha'
      };

      if (alternatives[query.toLowerCase()]) {
        results = searchBySurahName(alternatives[query.toLowerCase()]);
      }
    }

    return results;
  }

  // Add to search history
  addToHistory(query, resultCount) {
    const historyItem = {
      query,
      resultCount,
      timestamp: new Date().toISOString()
    };

    this.searchHistory.unshift(historyItem);
    this.searchHistory = this.searchHistory.slice(0, 20); // Keep last 20 searches

    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }

  // Get popular searches
  getPopularSearches() {
    const searches = this.searchHistory.reduce((acc, item) => {
      acc[item.query] = (acc[item.query] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(searches)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));
  }
}

// Usage
const search = new QuranSearch();

// Advanced search for "الله" in Meccan surahs only
const meccanAllah = search.advancedSearch('الله', {
  revelationTypeFilter: 'Meccan',
  maxResults: 50,
  includeContext: true
});

console.log(`Found ${meccanAllah.totalResults} mentions of Allah in Meccan surahs`);

// Search with suggestions
const guided = search.searchWithSuggestions('هدى');
console.log('Related terms:', guided.suggestions);

// Smart surah finding
const cave = search.findSurah('cave');
console.log('Found surah:', cave.results[0]?.englishName);
```

### **2. Thematic Search Tool**

```javascript
import { searchText } from '@muslims-community/quran';

class ThematicSearch {
  constructor() {
    this.themes = {
      faith: ['إيمان', 'آمن', 'يؤمن', 'مؤمن', 'إيمان'],
      prayer: ['صلاة', 'يصلي', 'صلى', 'مصلي'],
      charity: ['زكاة', 'صدقة', 'ينفق', 'إنفاق', 'أنفق'],
      paradise: ['جنة', 'جنات', 'فردوس', 'نعيم'],
      guidance: ['هدى', 'يهدي', 'هداية', 'مهتد'],
      knowledge: ['علم', 'يعلم', 'عالم', 'تعلم'],
      patience: ['صبر', 'صابر', 'اصبر', 'صبروا'],
      gratitude: ['شكر', 'شاكر', 'اشكر', 'شكور']
    };
  }

  // Search by theme
  searchByTheme(theme) {
    if (!this.themes[theme]) {
      throw new Error(`Theme '${theme}' not found`);
    }

    const allResults = [];
    const searchTerms = this.themes[theme];

    for (const term of searchTerms) {
      const results = searchText(term);
      allResults.push(...results.results);
    }

    // Remove duplicates and sort by surah order
    const uniqueResults = allResults.filter((ayah, index, array) =>
      array.findIndex(a => a.surah.id === ayah.surah.id && a.id === ayah.id) === index
    ).sort((a, b) => {
      if (a.surah.id !== b.surah.id) return a.surah.id - b.surah.id;
      return a.id - b.id;
    });

    return {
      theme,
      searchTerms,
      totalResults: uniqueResults.length,
      results: uniqueResults,
      distribution: this.getThemeDistribution(uniqueResults)
    };
  }

  // Analyze theme distribution
  getThemeDistribution(results) {
    const distribution = {
      bySurah: {},
      byRevelationType: { Meccan: 0, Medinan: 0 },
      byJuz: {}
    };

    results.forEach(ayah => {
      // By surah
      const surahName = ayah.surah.englishName;
      distribution.bySurah[surahName] = (distribution.bySurah[surahName] || 0) + 1;

      // By revelation type
      distribution.byRevelationType[ayah.surah.revelationType]++;

      // By Juz
      distribution.byJuz[ayah.juz] = (distribution.byJuz[ayah.juz] || 0) + 1;
    });

    return distribution;
  }

  // Compare themes
  compareThemes(themes) {
    const comparison = {};

    themes.forEach(theme => {
      comparison[theme] = this.searchByTheme(theme);
    });

    return {
      themes: comparison,
      summary: {
        mostMentioned: this.getMostMentioned(comparison),
        revelationTypePreference: this.getRevelationPreference(comparison)
      }
    };
  }

  // Get most mentioned theme
  getMostMentioned(comparison) {
    return Object.entries(comparison)
      .sort(([,a], [,b]) => b.totalResults - a.totalResults)
      .map(([theme, data]) => ({
        theme,
        mentions: data.totalResults
      }));
  }

  // Analyze revelation type preference
  getRevelationPreference(comparison) {
    const preferences = {};

    Object.entries(comparison).forEach(([theme, data]) => {
      const meccan = data.distribution.byRevelationType.Meccan;
      const medinan = data.distribution.byRevelationType.Medinan;
      const total = meccan + medinan;

      preferences[theme] = {
        meccanPercentage: Math.round((meccan / total) * 100),
        medinanPercentage: Math.round((medinan / total) * 100),
        preference: meccan > medinan ? 'Meccan' : 'Medinan'
      };
    });

    return preferences;
  }
}

// Usage
const thematic = new ThematicSearch();

// Search faith-related verses
const faithResults = thematic.searchByTheme('faith');
console.log(`Faith theme: ${faithResults.totalResults} verses`);
console.log('Most mentioned in:', Object.keys(faithResults.distribution.bySurah)
  .sort((a, b) => faithResults.distribution.bySurah[b] - faithResults.distribution.bySurah[a])
  .slice(0, 5));

// Compare spiritual themes
const spiritualComparison = thematic.compareThemes(['faith', 'prayer', 'charity', 'patience']);
console.log('Theme ranking:', spiritualComparison.summary.mostMentioned);
```

### **3. Educational Search System**

```javascript
import { searchText, searchBySurahName, getAyah } from '@muslims-community/quran';

class EducationalSearch {
  constructor() {
    this.difficulty = {
      beginner: ['الله', 'رب', 'يا', 'في', 'من'],
      intermediate: ['الرحمن', 'الرحيم', 'آمن', 'صلاة', 'جنة'],
      advanced: ['استغفر', 'توكل', 'تقوى', 'خشية', 'صبر']
    };
  }

  // Generate learning exercises
  generateExercises(level, count = 10) {
    const terms = this.difficulty[level];
    if (!terms) throw new Error('Invalid difficulty level');

    const exercises = [];

    for (let i = 0; i < count; i++) {
      const randomTerm = terms[Math.floor(Math.random() * terms.length)];
      const results = searchText(randomTerm);

      if (results.totalResults > 0) {
        const randomAyah = results.results[Math.floor(Math.random() * Math.min(results.results.length, 20))];

        exercises.push({
          id: i + 1,
          searchTerm: randomTerm,
          ayah: randomAyah,
          question: `Find the word "${randomTerm}" in this ayah`,
          difficulty: level,
          surahInfo: `${randomAyah.surah.englishName} (${randomAyah.surah.name})`
        });
      }
    }

    return exercises;
  }

  // Create vocabulary builder
  buildVocabulary(searchTerms) {
    const vocabulary = [];

    searchTerms.forEach(term => {
      const results = searchText(term);

      if (results.totalResults > 0) {
        // Get examples from different contexts
        const examples = results.results
          .slice(0, 5)
          .map(ayah => ({
            text: ayah.text,
            surah: ayah.surah.englishName,
            ayahNumber: ayah.id,
            context: this.getWordContext(ayah.text, term)
          }));

        vocabulary.push({
          term,
          frequency: results.totalResults,
          examples,
          difficulty: this.assessDifficulty(results.totalResults)
        });
      }
    });

    return vocabulary.sort((a, b) => b.frequency - a.frequency);
  }

  // Get word context
  getWordContext(text, word) {
    const words = text.split(' ');
    const wordIndex = words.findIndex(w => w.includes(word));

    if (wordIndex !== -1) {
      const start = Math.max(0, wordIndex - 2);
      const end = Math.min(words.length, wordIndex + 3);
      return words.slice(start, end).join(' ');
    }

    return text.substring(0, 50) + '...';
  }

  // Assess word difficulty
  assessDifficulty(frequency) {
    if (frequency > 500) return 'easy';
    if (frequency > 100) return 'medium';
    if (frequency > 20) return 'hard';
    return 'expert';
  }

  // Create quiz questions
  createQuiz(theme, questionCount = 10) {
    const results = searchText(theme);
    const quiz = [];

    for (let i = 0; i < questionCount && i < results.results.length; i++) {
      const ayah = results.results[i];

      // Create multiple choice question
      const question = {
        id: i + 1,
        type: 'multiple-choice',
        question: `Which surah contains this ayah: "${ayah.text.substring(0, 50)}..."?`,
        correctAnswer: ayah.surah.englishName,
        options: this.generateWrongOptions(ayah.surah.englishName),
        ayahReference: `${ayah.surah.englishName} ${ayah.id}`,
        difficulty: this.assessDifficulty(results.totalResults)
      };

      quiz.push(question);
    }

    return {
      theme,
      totalQuestions: quiz.length,
      questions: quiz
    };
  }

  // Generate wrong answer options
  generateWrongOptions(correctAnswer) {
    const allSurahs = ['Al-Fatiha', 'Al-Baqarah', 'Al-Imran', 'An-Nisa', 'Al-Ma\'idah',
                      'Al-An\'am', 'Al-A\'raf', 'Al-Anfal', 'At-Tawbah', 'Yunus',
                      'Hud', 'Yusuf', 'Ar-Ra\'d', 'Ibrahim', 'Al-Hijr', 'An-Nahl',
                      'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha'];

    const wrongOptions = allSurahs
      .filter(surah => surah !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5);

    return options;
  }
}

// Usage
const educational = new EducationalSearch();

// Generate beginner exercises
const beginnerExercises = educational.generateExercises('beginner', 5);
console.log('Beginner exercises:', beginnerExercises.length);

// Build vocabulary for common terms
const commonVocab = educational.buildVocabulary(['الله', 'رب', 'آمن', 'صلاة', 'جنة']);
console.log('Vocabulary sorted by frequency:', commonVocab.map(v => `${v.term}: ${v.frequency}`));

// Create a quiz about Allah
const allahQuiz = educational.createQuiz('الله', 5);
console.log(`Created quiz with ${allahQuiz.totalQuestions} questions about Allah`);
```

## 🎯 Best Practices

### **1. Search Optimization**

```javascript
// Cache search results for better performance
const searchCache = new Map();

function cachedSearch(term) {
  if (!searchCache.has(term)) {
    searchCache.set(term, searchText(term));
  }
  return searchCache.get(term);
}

// Debounce search input
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedSearch = debounce((term) => {
  const results = searchText(term);
  displayResults(results);
}, 300);
```

### **2. Search Result Enhancement**

```javascript
// Highlight search terms in results
function highlightSearchTerm(text, searchTerm) {
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Add relevance scoring
function scoreRelevance(ayah, searchTerm) {
  const text = ayah.text;
  let score = 0;

  // Exact matches get higher score
  const exactMatches = (text.match(new RegExp(searchTerm, 'g')) || []).length;
  score += exactMatches * 10;

  // Position matters (earlier = higher score)
  const firstIndex = text.indexOf(searchTerm);
  if (firstIndex !== -1) {
    score += Math.max(0, 100 - firstIndex);
  }

  return score;
}
```

### **3. Error Handling**

```javascript
function safeSearch(searchTerm) {
  try {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return { results: [], totalResults: 0, error: 'Empty search term' };
    }

    if (searchTerm.length < 2) {
      return { results: [], totalResults: 0, error: 'Search term too short' };
    }

    return searchText(searchTerm);
  } catch (error) {
    console.error('Search error:', error);
    return { results: [], totalResults: 0, error: error.message };
  }
}
```

## 🔗 Related Functions

- **[getAyah()](basic-functions.md)** - Get specific ayah details
- **[getAyahRange()](range-reading.md)** - Get context around search results
- **[getSurahStatistics()](statistics.md)** - Analyze search patterns
- **[getRandomAyah()](random-special.md)** - Discover new content

---

**Next:** [Statistics Guide](statistics.md) - Analyze Quran data and patterns