import { japaneseKeyboardMap } from "./japanese-keyboard";
import { arabicKeyboardMap } from "./arabic-keyboard";

export interface LanguageConfig {
  code: string;
  name: string;
  keyboardMap?: { [key: string]: string };
  defaultLesson?: string;
  direction?: 'ltr' | 'rtl';
  vocabularySource?: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'uk',
    name: '乌克兰语',
    direction: 'ltr',
    vocabularySource: 'ukrainian-vocabulary',
    keyboardMap: {
      'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н',
      'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ї',
      'a': 'ф', 's': 'і', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р',
      'j': 'о', 'k': 'л', 'l': 'д', ';': 'ж', "'": 'є',
      'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т',
      'm': 'ь', ',': 'б', '.': 'ю'
    }
  },
  {
    code: 'ar',
    name: '阿拉伯语',
    direction: 'rtl',
    vocabularySource: 'arabic-vocabulary',
    keyboardMap: {
      '`': 'ذ', '1': '١', '2': '٢', '3': '٣', '4': '٤', 
      '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩', 
      '0': '٠', '-': '-', '=': '=',
      
      'q': 'ض', 'w': 'ص', 'e': 'ث', 'r': 'ق', 't': 'ف',
      'y': 'غ', 'u': 'ع', 'i': 'ه', 'o': 'خ', 'p': 'ح',
      '[': 'ج', ']': 'د',
      
      'a': 'ش', 's': 'س', 'd': 'ي', 'f': 'ب', 'g': 'ل',
      'h': 'ا', 'j': 'ت', 'k': 'ن', 'l': 'م', ';': 'ك',
      "'": 'ط',
      
      'z': 'ئ', 'x': 'ء', 'c': 'ؤ', 'v': 'ر', 'b': 'لا',
      'n': 'ى', 'm': 'ة', ',': 'و', '.': 'ز', '/': 'ظ'
    }
  },
  {
    code: 'fr',
    name: '法语',
    direction: 'ltr',
    vocabularySource: 'french-vocabulary',
    keyboardMap: {
      'a': 'à', 'z': 'â', 'e': 'é', 'r': 'è', 't': 'ê',
      'y': 'ë', 'u': 'ù', 'i': 'î', 'o': 'ô', 'p': 'û',
      's': 'ç', 'd': 'ï',
    }
  },
  {
    code: 'ja',
    name: '日语',
    direction: 'ltr',
    vocabularySource: 'japanese-vocabulary',
    keyboardMap: {
      ...japaneseKeyboardMap.keyMap,
      '@': '゛',
      '[': '゜',
    }
  }
]; 