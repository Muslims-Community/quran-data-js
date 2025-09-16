export interface Ayah {
  id: number;
  text: string;
  sajdah: boolean;
  bismillah?: string;
}

export interface SurahInfo {
  id: number;
  name: string;
  englishName: string;
  revelationType: "Meccan" | "Medinan";
}

export interface Surah extends SurahInfo {
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