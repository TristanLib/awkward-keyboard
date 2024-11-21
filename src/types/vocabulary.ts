export interface BaseWord {
  meaning: string;
  original: string;
  category: string;
  example?: string;
}

export interface UkrainianWord extends BaseWord {
  uk: string;
}

export interface FrenchWord extends BaseWord {
  fr: string;
}

export interface JapaneseWord extends BaseWord {
  ja: string;
  romaji?: string;
  kana?: string;
  kanji?: string;
}

export type Word = UkrainianWord | FrenchWord | JapaneseWord;

export interface VocabularyData {
  [key: string]: Word[];
}

export interface KeyboardKey {
  uk: string;
  en: string;
}

export interface KeyboardProps {
  highlightKey: string | null;
}

export interface KeyboardKeyProps {
  ukChar: string;
  enChar: string;
  isPressed: boolean;
} 