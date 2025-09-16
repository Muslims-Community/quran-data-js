export interface Ayah {
  id: number;
  text: string;
  sajdah: boolean;
  juz: number;
  hizb: number;
  bismillah?: string;
}

export interface SurahInfo {
  id: number;
  name: string;
  englishName: string;
  revelationType: "Meccan" | "Medinan";
}

export interface Surah extends SurahInfo {
  revelationOrder: number;
  numberOfAyahs: number;
  ayat: Ayah[];
  source: string;
}

export interface AyahWithSurah extends Ayah {
  surah: SurahInfo;
  source: string;
}

export interface QuranData {
  source: string;
  version: string;
  copyright: string;
  license: string;
  surahs: Omit<Surah, 'source'>[];
}

export interface SearchResult {
  results: AyahWithSurah[];
  searchTerm: string;
  totalResults: number;
  source: string;
}

export interface SajdahResult {
  sajdahAyat: AyahWithSurah[];
  totalSajdahAyat: number;
  source: string;
}

// Phase 1 Enhanced Types - v1.1.0

export interface AyahRange {
  surah: SurahInfo;
  range: {
    start: number;
    end: number;
    count: number;
  };
  ayat: AyahWithSurah[];
  source: string;
}

export interface JuzResult {
  juz: number;
  totalAyat: number;
  ayat: AyahWithSurah[];
  source: string;
}

export interface HizbResult {
  hizb: number;
  juz: number;
  totalAyat: number;
  ayat: AyahWithSurah[];
  source: string;
}

export interface SurahSearchResult {
  searchTerm: string;
  totalResults: number;
  results: Surah[];
  source: string;
}

export interface SurahStatistics {
  totalSurahs: number;
  totalAyat: number;
  meccanSurahs: number;
  medinanSurahs: number;
  averageAyatPerSurah: number;
  longestSurah: {
    id: number;
    name: string;
    englishName: string;
    numberOfAyahs: number;
  };
  shortestSurah: {
    id: number;
    name: string;
    englishName: string;
    numberOfAyahs: number;
  };
  ayatCounts: {
    min: number;
    max: number;
    distribution: Record<number, number>;
  };
  source: string;
}

/**
 * Get a specific ayah from the Quran
 * @param surahId - The surah number (1-114)
 * @param ayahId - The ayah number within the surah
 * @returns The ayah with surah information and source attribution
 * @throws Error if surah or ayah ID is invalid
 */
export function getAyah(surahId: number, ayahId: number): AyahWithSurah;

/**
 * Get a complete surah from the Quran
 * @param surahId - The surah number (1-114)
 * @returns The complete surah with all ayat and source attribution
 * @throws Error if surah ID is invalid
 */
export function getSurah(surahId: number): Surah;

/**
 * Get the complete Quran data
 * @returns The complete Quran data structure
 */
export function getQuranData(): QuranData & { source: string };

/**
 * Search for text within the Quran
 * @param searchTerm - The Arabic text to search for
 * @returns Search results with matching ayat
 * @throws Error if search term is empty
 */
export function searchText(searchTerm: string): SearchResult;

/**
 * Get a random ayah from the Quran
 * @returns A random ayah with surah information
 */
export function getRandomAyah(): AyahWithSurah;

/**
 * Get all sajdah (prostration) ayat from the Quran
 * @returns All ayat where sajdah is recommended
 */
export function getSajdahAyat(): SajdahResult;

// Phase 1 Enhanced Functions - v1.1.0

/**
 * Get a range of ayat from a specific surah
 * @param surahId - The surah number (1-114)
 * @param startAyah - The starting ayah number
 * @param endAyah - The ending ayah number
 * @returns Range of ayat with metadata
 * @throws Error if any parameter is invalid
 */
export function getAyahRange(surahId: number, startAyah: number, endAyah: number): AyahRange;

/**
 * Get all ayat from a specific Juz (Para)
 * @param juzNumber - The Juz number (1-30)
 * @returns All ayat in the specified Juz
 * @throws Error if Juz number is invalid
 */
export function getJuz(juzNumber: number): JuzResult;

/**
 * Get all ayat from a specific Hizb
 * @param hizbNumber - The Hizb number (1-60)
 * @returns All ayat in the specified Hizb
 * @throws Error if Hizb number is invalid
 */
export function getHizb(hizbNumber: number): HizbResult;

/**
 * Search for surahs by Arabic or English name
 * @param name - The surah name to search for (Arabic or English)
 * @returns Matching surahs
 * @throws Error if search term is empty
 */
export function searchBySurahName(name: string): SurahSearchResult;

/**
 * Get comprehensive statistics about the Quran
 * @returns Detailed statistics including counts, averages, and distributions
 */
export function getSurahStatistics(): SurahStatistics;